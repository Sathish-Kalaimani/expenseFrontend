import React from 'react';
import './App.css';
import Home from './Components/Home.js';
import HomeExpenses from './Components/HomeExpenses.js';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";


function App() {
  return (
    <div className="homePage">
      
      <Router>
        <div >
        <Link className="links" to="/">Petrol Expenses</Link>
        <Link className="links" to="/homeExp">Home Expenses</Link>

        <Route exact path="/" component={Home}/>
        <Route exact path="/homeExp" component={HomeExpenses}/>
        </div>
      </Router>
    </div>
  );
}

export default App;
