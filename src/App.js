import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import classes from './App.css';
import SignIn from "./Component/Signin";
import SignUp from "./Component/Signup";
// import Route from 'react-router-dom';
// import {Router} from "@material-ui/icons";
// import Route from "react-router-dom/es/Route";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
class App extends Component {
    render() {
        return (
            <div className={classes.App}>
                <Link to="/"> </Link>
                <Link to="/signIn"> </Link>
                <Link to="/signUp"> </Link>
                <Route path="/" exact component={SignIn}/>
                <Route path="/signIn" exact component={SignIn}/>
                <Route path="/signUp" component={SignUp}/>
            </div>

        );
    }
}

export default App;
