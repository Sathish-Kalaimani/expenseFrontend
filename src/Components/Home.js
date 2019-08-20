import React, { Component } from 'react';
import '../App.css';
import Axios from 'axios';

class Home extends Component {

    constructor(){
        super();
        this.state={
            retailer:'IOC XP',refuelDate:'',quantity:'',totalKilometers:'',amountSpent:'',petrolPrice:'', prediction:[],apiResponse:[]
        }
    }

componentDidMount(){
    this.getPetrolDetails();
    this.getNextPrediction();
}

    render() {
        return (
            <div  className="entry">
                <h1>Petrol Expenses</h1>

                <div className="top">
                    <div className="inputs">
                        <label>Fuel Retailer</label>
                        <input type="text" name="retailer" value={this.state.retailer} onChange={e=>this.changeHandler(e)} />
                    </div>
                    <div className="inputs">
                        <label>Refuel Date</label>
                        <input type="date" name="refuelDate" onChange={e=>this.changeHandler(e)} required/>
                    </div>
                    <div className="inputs">
                        <label>Fuel Quantity</label>
                        <input type="number" name="quantity" onChange={e=>this.changeHandler(e)} required/>
                    </div>
                    <div className="inputs">
                        <label>Total Kilometers</label>
                        <input type="number" name="totalKilometers" onChange={e=>this.changeHandler(e)} required />
                    </div>
                    <div className="inputs">
                        <label>Amount</label>
                        <input type="number" name="amountSpent" onChange={e=>this.changeHandler(e)} />
                    </div>
                    <div className="inputs">
                        <label>Petrol Price</label>
                        <input type="number" name="petrolPrice" onChange={e=>this.changeHandler(e)} />
                    </div>
                    <div className="submitBtn"><button onClick={e=>this.submit(e)}>Submit</button></div>
                </div>
                
                <section className="futureData" id ="body">
                    <table>
                    <thead><tr><th className="theader"colSpan="3">Next Refuel Prediction</th></tr></thead>     
                    <tbody>
                        <tr>
                            <th>Date</th>
                            <th>Kms</th>
                            <th>Total Kms</th>
                        </tr>
                        <tr>
                            <th> {this.getDate(this.state.prediction.nextRefuelDate)}</th>
                            <th> {this.state.prediction.predictedKmToRun}</th>
                            <th> {this.state.prediction.predictedTotalKilometers}</th>
                        </tr>
                        </tbody>
                    </table>
                </section>

                <section className="details" onMouseOver={e=>this.moveUp()} onMouseOut={e=>this.moveDown()}>
                   
                   <table>
                        <thead><tr><th className="theader"colSpan="11">Details of Every Refuel Date</th></tr></thead>     
                       <tbody>
                       <tr>
                           {/*<th>Id</th>*/}
                           <th>Retailer</th>
                           <th>Refuel Date</th>
                           <th>Quantity</th>
                           <th>Average</th>
                           <th>Kms Ran</th>
                           <th>Total Kms</th>
                           <th>Days Btw Refuel</th>
                           <th>Predicted Next Refuel Dt</th>
                           <th>Predicted Kms</th>
                           <th>Predicted Total Kms</th>
                       </tr>
                       {
                        
                        this.state.apiResponse.map(petrol=>
                            
                            <tr key = {petrol.id}>
                                {/*<td>{petrol.id}</td>*/}
                                <td>{petrol.retailer}</td>
                                <td>{this.getDate(petrol.refuelDate)}</td>
                                <td>{petrol.quantity}</td>
                                <td>{petrol.average}</td>
                                <td>{petrol.kilometersRan}</td>
                                <td>{petrol.totalKilometers}</td>
                                <td>{petrol.daysBetweenRefuel}</td>
                                <td>{this.getDate(petrol.nextRefuelDate)}</td>
                                <td>{petrol.predictedKmToRun}</td>
                                <td>{petrol.predictedTotalKilometers}</td>
                            </tr>    
                        )
                    }
                       </tbody>
                   </table>
                </section>
                </div>
        );
    }

    changeHandler(e){
        this.setState({[e.target.name]:e.target.value});
    }

    getDate(curDate){
        if(typeof curDate==='undefined'){
            return null;
        }
        
        if(curDate===null||curDate===''){
            return "N/A";
        }else{
            var date = new Date(curDate);
            var day = date.getDate();
            if(day<10){ day= '0'+day;}
            var month = date.getMonth()+1;
            if(month<10){month= '0'+month;}
            var year = date.getFullYear();
            return year+"-"+month+"-"+day;
        }
       
    }

    moveUp(){
        document.getElementById("body").style.transition ="margin 0.5s";
        document.getElementById("body").style.marginTop= "0px";
    }

    moveDown(){
        document.getElementById("body").style.transition ="margin 0.5s";
        document.getElementById("body").style.marginTop= "100px";
    }

    submit(event){
        event.preventDefault();
        let request = {};
            request.retailer = this.state.retailer;
            request.refuelDate = this.state.refuelDate;
            request.quantity= this.state.quantity;
            request.totalKilometers = this.state.totalKilometers;
            request.amountSpent = this.state.amountSpent;
            request.petrolPrice = this.state.petrolPrice;
            console.log(request);
        Axios.post('http://localhost:8084/petrolApi/createEntry',request)
        .then(response=>{
            if(response.status===200){
                alert("Data Updated Successfully");
                this.getPetrolDetails();
                this.getNextPrediction();
            }
        })
        .catch(error=>{
            console.log(error);
        })
    }

    getPetrolDetails(){
        Axios.get('http://localhost:8084/petrolApi/getAllDetails')
        .then(response=>{
            if(response.status===200){
                this.setState({apiResponse:response.data});
            }
        })
        .catch(error=>{
            console.log(error)
        })
    }

    getNextPrediction(){
        Axios.get('http://localhost:8084/petrolApi/getPrediction')
        .then(resp=>{
            if(resp.status===200){
                this.setState({prediction:resp.data});
            }
        })
        .catch(error=>{
            console.log(error)
        })
    }

}

export default Home
