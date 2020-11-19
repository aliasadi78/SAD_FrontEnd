import React, {Component} from 'react';
import classes from './App.css';
import SignIn from "./Component/User/Signin";
import SignUp from "./Component/User/Signup";
import ClassesPage from  './Component/Class/ClassesPage';
import NewClassPage from './Component/Class/NewClassPage';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Dashboard from './Component/Dashboard/Dashboard';
import InsideClass from './Component/Class/insideClass' ;

class App extends Component {

    render() {
        return (                
            <div className={classes.App}>                
                <Link to="/"> </Link>
                <Link to="/signIn"> </Link>
                <Link to="/signUp"> </Link>
                <Link to="/profile/edit" ></Link>
                <Route path="/" exact component={SignIn}/>
                <Route path="/signIn" exact component={SignIn}/>
                <Route path="/signUp" component={SignUp}/>
                <Route path="/profile/edit" component = {Dashboard} />
                <Route path="/ClassesPage" component = {ClassesPage} />
                <Route path="/NewClassPage" component = {NewClassPage} />
                <Route path="/class" component = {InsideClass} />
            </div>

        );
    }
}

export default App;
