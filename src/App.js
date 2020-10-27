import React , {Component} from 'react';
import './App.css';
import VerticalTabs from './Component/TabMenuEditProfile';
import {axios} from 'axios' ;

async function getUser(){
  try{
    const response  = await axios.get('https://parham-backend.herokuapp.com/');
    console.log(response);
  } catch(error) {
    console.error(error);
  }
}



function App() {  

  // axios.get('https://parham-backend.herokuapp.com/')

  return (
    <div className="App">      
      <header className="App-header">      
        <getUser />                
        <VerticalTabs />
      </header>      
    </div>
  );
}

export default App;
