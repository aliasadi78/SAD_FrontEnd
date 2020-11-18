import React, {Component} from 'react';
import classes from './App.css';
import SignIn from "./Component/User/Signin";
import SignUp from "./Component/User/Signup";
import ClassesPage from  './Component/Class/ClassesPage';
import NewClassPage from './Component/Class/NewClassPage';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Dashboard from './Component/Dashboard/Dashboard';
import InsideClass from './Component/Class/insideClass' ;
import JoinClass from './Component/Class/JoinClass';
import VerticalTabs from './Component/User/TabMenuEditProfile' ;
import Questions from './Component/Question/Questions' ;
import questionBank from './Component/Question/QuestionBank' ;

class App extends Component {

    render() {
        return (                
            <div className={classes.App}>                                
                <Route path="/" exact component={SignIn}/>
                <Route path="/signIn" exact component={SignIn}/>
                <Route path="/signUp" component={SignUp}/>
                <Route path="/profile/edit" children={<Dashboard />} component = {VerticalTabs} />
                <Route path="/user/classes" children={<Dashboard />} component = {ClassesPage} />
                <Route path="/class/Create" component = {NewClassPage} />
                <Route path="/class" component = {InsideClass} />
                <Route path="/class/join" component = {JoinClass} />
                <Route path="/user/questions" children={<Dashboard />} component = {Questions} />
                <Route path="/questionBank" children={<Dashboard />} component = {questionBank  } />
                <Route path="/Dashboard" component = {Dashboard} />
            </div>

        );
    }
}

export default App;
