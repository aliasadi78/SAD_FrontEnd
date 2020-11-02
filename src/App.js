import React, {Component} from 'react';
import classes from './App.css';
import SignIn from "./Component/Signin";
import SignUp from "./Component/Signup";

import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import VerticalTabs from './Component/TabMenuEditProfile';

class App extends Component {
    render() {
        return (            
            <div className={classes.App}>s                
                {/* <VerticalTabs />                 */}
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
