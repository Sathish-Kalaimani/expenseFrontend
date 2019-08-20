import React, { Component } from 'react';
import '../App.css'
import {Dropdown} from 'semantic-ui-react';


let categories=[
    {key:1, text: 'Grocery', value: 1},
    {key:2, text: 'Essentials', value:2},
]

class HomeExpenses extends Component {
    constructor() {
        super();
        this.state = {
           category: ''
        }
    }

    render() {

        return (
            <div>
                <h1>This is Home Expense Sheet</h1>
                <div className="top1">
                    <div className="drpdwn">
                        <label>Expense Category</label>
                        <Dropdown placeholder="Category" search selection options={categories} onChange={e=>this.getSelection(e)}/>
                        <datalist options={categories}>
                            <option value="Grocery"/>
                        </datalist>
                    </div>

                    <div className="input2">
                        <label>Date of Expense</label>
                        <input type="date" />
                    </div>
                    <div className="input2">
                        <label>Amount Spent</label>
                        <input type="number" />
                    </div>
                    <div className="input2">
                        <label>Comments</label>
                        <input type="text" />
                    </div>

                </div>
                
            </div>
        )
    }

    getSelection(e, data){
        console.log(data)
    }
}

export default HomeExpenses