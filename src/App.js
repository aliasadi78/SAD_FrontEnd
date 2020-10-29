import React , {Component} from 'react';
import './App.css';
import VerticalTabs from './Component/TabMenuEditProfile';
import axios from 'axios' ;

function TestBack (){

  axios.get('https://parham-backend.herokuapp.com/test')
    .then(res => {
      const test = res.data ;
      console.log(test);
  })  

  return (
    <p> testing </p>
  );
}

function App() {  
  return (
    <div className="App">      
      <header className="App-header">         
        <VerticalTabs />        
      </header>      
    </div>
  );
}

export default App;
