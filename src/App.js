import React, {Component} from 'react';
import classes from './App.css';
import SignIn from "./Component/Signin";
import SignUp from "./Component/Signup";

import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import VerticalTabs from './Component/TabMenuEditProfile';
import DashboardEditProfile from './AppBar/AppBar';

import Questions from './Component/Question/Questions';

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
                <Route path="/profile/edit" component = {DashboardEditProfile} />
            </div>

        );
    }
}

export default App;
