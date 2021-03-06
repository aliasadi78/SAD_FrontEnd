import React, {Component} from 'react';
import classes from './App.css';
import SignIn from "./Component/User/Signin";
import SignUp from "./Component/User/Signup";
import ClassesPage from  './Component/Class/ClassesPage/ClassesPage';
import NewClassPage from './Component/Class/NewClassPage';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Dashboard from './Component/Dashboard/Dashboard';
import InsideClass from './Component/Class/InsideClass/insideClass' ;
import MembersList from './Component/Class/InsideClass/lists/membersList';
import JoinClass from './Component/Class/JoinClass';
import Questions from './Component/Question/Questions' ;
import questionBank from './Component/Question/QuestionBank' ;
import PersonalForms from './Component/User/EditProfile' ;
import CreateExam from './Component/Exam/CreateExam/CreateExam';
import ExamPage from './Component/Exam/ExamPage/ExamPage';
import {connect} from 'react-redux' ;
import serverURL from './utils/serverURL' ;
import tokenConfig from  './utils/tokenConfig' ;
import { savePublicApis} from './Component/Question/QuestionsSlice' ;
import axios from 'axios' ;
import UserPage from './Component/User/UserPage' ;
import Landing from './Component/landingpage/landingpage';
import ExamCorrection from './Component/Exam/ExamCorrection/ExamCorrection' ;
// import Report from './Component/Class/report' ;
import Report from './Component/Class/report/report' ;

class App extends Component {    

    constructor(props){
        super(props);      
        
        // in this section we consider classes page as home page - taking public api s
        axios.get(serverURL() + "public/question/category" , tokenConfig())
        .then(res=>{            
        props.savePublicApis(res.data);
        console.log('publics found');         
        })
        .catch();
    }

    render() {
        
        return (                
            <div className={classes.App}>                                                
                {/* <DP /> */}
                <Route path="/" exact component={Landing}/>
                <Route path="/signIn" component={SignIn}/>
                <Route path="/signUp" component={SignUp}/>
                <Route path="/profile/edit" children={<Dashboard />} component = {PersonalForms} />
                <Route path="/user/classes" children={<Dashboard />} component = {ClassesPage} />
                <Route path="/class/Create" component = {NewClassPage} />
                <Route path="/class/:classId" component = {InsideClass} />
                <Route path="/members/:classId" component = {MembersList} />
                <Route path="/class/join" component = {JoinClass} />
                <Route path="/CreateExam/:classId" component = {CreateExam} />
                <Route path="/EditExam/:classId/:examId" component = {CreateExam} />
                <Route path="/user/questions" children={<Dashboard />} component = {Questions} />
                <Route path="/questionBank" children={<Dashboard />} component = {questionBank  } />
                <Route path="/Dashboard" component = {Dashboard} />
                <Route path="/exam/:examId/questions"  component={ExamPage} />
                <Route path="/exam/review/:examId/questions/"  component={ExamPage} />                
                <Route path="/exam/correction/:examId/:username" component={ExamCorrection} />
                <Route path="/user/page/" children={<Dashboard />}  component={UserPage} />
                <Route path="/report/:classId/"  component={Report} />
            </div>

        );
    }
}

const mapDispatchToProps = disptach => {
    return {
        savePublicApis : (data) => disptach(savePublicApis(data))
    }
}

export default connect(null , mapDispatchToProps)(App);
