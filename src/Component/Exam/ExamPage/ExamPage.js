import React, { Component } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import tokenConfig from '../../../utils/tokenConfig';
import serverURL from '../../../utils/serverURL';
import Material_RTL from "../../Material_RTL";
import M_RTL from "../../M_RTL";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from '@material-ui/core/Paper';
import Pagination from '@material-ui/core/Pagination';
import { CircularProgress } from '@material-ui/core';
import ReactDOM from 'react-dom'
import QuestionCard from './QuestionCard' ;
import Timer from './Timer/Timer';
import ClickNHold from 'react-click-n-hold';
import Button from '@material-ui/core/Button';

class ExamPage extends Component{
    constructor(props){
        super(props);

        this.state = {
            examName : null ,
            c : 0 
        }
    }
    componentWillMount(){
        var [check,setCheck] = this.props.check;
        var [totalQuestion,setTotalQuestion] = this.props.totalQuestion;
        var [questionsList,setQuestionsList] = this.props.questionsList; 
        var [time,setTime] = this.props.time;       
        var [pending,setPending] = this.props.pending;        
        setPending(true)
        var res = []
        if(!check){
            axios.get(serverURL() + "exam/" + this.props.examId + "/questions" , tokenConfig() )
                .then(result => {
                    console.log(result.data)
                    console.log(result.data);
                    res.push(...result.data.questions);
                    setTime(result.data.user_examEndTime);
                    var ll = res.map((q) => q);
                    console.log(ll)
                    setQuestionsList([...ll]);
                    this.setState(prevstate => {
                        return {
                            examName : result.data.name
                        }
                    });
                    setCheck(true);
                    setTotalQuestion(result.data.questions.length)
                    setPending(false)
                    console.log(questionsList)
                }).catch(error=>{
                    console.log(error.response)
                    setPending(false)
                    setCheck(true);
                })            
        }
    }
    render(){
    const classes = this.props.classes;
    const [totalQuestion,setTtotalQuestion] = this.props.totalQuestion;
    const [questionsList,setQuestionsList] = this.props.questionsList;
    const [pending,setPending] = this.props.pending; 
    const [time,setTime] = this.props.time;    
    var indexQuestion = 1;
    return(
        <div style={{backgroundColor: 'white' , paddingBottom : '80px'}}> 
        <Material_RTL style={{backgroundColor: 'white'}}>
            <M_RTL style={{backgroundColor: 'white'}}>
                <div style={{fontFamily: 'Vazir',paddingTop: '1%',backgroundColor : '#3D5A80',width:'100%',height:'52px',color: 'white',fontSize: '16px'}}>
                    {this.state.examName}
                </div>
                <Container maxWidth="md" alignItems="center" component="main" style={{fontFamily: 'Vazir',marginTop: '1%',paddingTop: '1%',backgroundColor : '#1ca0a0',height:'110px',fontSize: '16px'}}>
                    <Timer time={time} examId={this.props.examId}/>
                </Container>
                <Container maxWidth="md" alignItems="center" component="main" style={{fontFamily: 'Vazir',marginTop: '1%', paddingBottom : '40px',paddingTop: '1%',backgroundColor : '#f2f2f2',fontSize: '16px'}}>
                <Grid container xs={12} >
                        
                            {this.state.c}
                            
                          <Button onMouseDown = {() => {                                                          
                                setTimeout(() => {
                                    this.setState(prestate => {
                                        return{
                                            c : this.state.c + 1 ,
                                        }
                                    });
                                }, 1000);                                                            
                                }} >
                              add
                          </Button>
                          

                          <Grid item xs={4} ></Grid>
                          <Grid item xs={4} >

                            <Paper elevation = {2} className = {classes.ListTitle}>
                              <h5 style={{fontFamily: 'Vazir' , color : 'white'}}>
                                سوالات
                                {/* <IsoIcon /> */}
                              </h5>
                            </Paper>                          
                          </Grid>                              

                          <Grid item xs={4} ></Grid>

                          {/* <Grid > */}
                        <Grid container item xs={12}
                            direction="row"
                            justify="center"
                            alignItems="center" 
                            style={{display: 'flex',justifyContent: 'center'}}>
                            <Pagination onChange={(event,value) => {
                                axios.post("https://parham-backend.herokuapp.com" + window.location.pathname + "/" + (indexQuestion).toString() + "/answer?answer=" + useranswer[indexQuestion-1] ,"", tokenConfig())
                                .then(res=>{
                                    console.log(res)
                                })
                                .catch(err=>{
                                    console.log(err)
                                })
                                if(questionsList.length > 0 ){ questionsList.map((question,idx)=>{
                                    if(idx === value - 1){                                        
                                        indexQuestion = question.index
                                        return(
                                            ReactDOM.render(<QuestionCard examId={this.props.examId} q={question} useranswer={useranswer} idx={idx} answer={questionsList[idx].answerText}/>,document.getElementById('Grid1'))
                                        )
                                    }
                                    }
                                )}
                            }} variant="outlined" size="small"  count={totalQuestion} shape="rounded" />
                            </Grid>
                        </Grid>                        

                    <Container maxWidth="md" alignItems="center" component="main" style={{fontFamily: 'Vazir',marginTop: '1%',paddingTop: '1%',backgroundColor : 'white',fontSize: '16px'}}>                                                
                        <Grid id="Grid1">
                            {pending ?
                                (<div style={{}}><CircularProgress style={{color: '#1CA0A0'}}/></div>): 
                                (<div>
                                  {questionsList.length > 0 ? (questionsList.map((question,idx)=>{
                                        if(idx === 0){
                                        return(
                                            <QuestionCard q={question} examId={this.props.examId} useranswer={useranswer} idx={idx} answer={questionsList[idx].answerText}/>
                                        )}
                                    })):null}
                                </div>)
                            }
                        </Grid>
                    </Container>
                </Container>
            </M_RTL>
        </Material_RTL>
        </div>
    )
}}
var useranswer=[]
const useStyles = makeStyles((theme) => ({
    ListTitle :{
        padding : theme.spacing(1) , 
        marginBottom : theme.spacing(1) ,  
        backgroundColor : '#3D5A80' ,
        color : 'white'
    },
  }));
export default (props) => {
    const examId = props.match.params.examId ;    
    const classes = useStyles();
    const check = React.useState(false);    
    const totalQuestion = React.useState(0);
    const questionsList= React.useState([]);
    const pending = React.useState(false);    
    const time = React.useState("")
    return (        
        <ExamPage 
            classes={classes} 
            check={check} 
            totalQuestion={totalQuestion} 
            questionsList={questionsList} 
            examId = {examId}
            pending={pending}
            time={time}/>    
    )
}