import React from 'react'
import './App.css';

import Header from './Components/Header';
import CountryList from './Components/CountryList';
import DetailedPage from './Components/DetailedPage';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';



function App() {
    return (   
      <React.Fragment>
        <Header></Header>
        <div className="app">
          <Router>           
            <CountryList/>        
            <Switch>
                <Route path="/:country" component={DetailedPage}/>
            </Switch>    
          </Router>
        </div> 
      </React.Fragment>
    )
}

export default App;