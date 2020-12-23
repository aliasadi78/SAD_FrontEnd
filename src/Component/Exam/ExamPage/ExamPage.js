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
import { renderToString,render,renderIntoDocument } from 'react-dom/server';
import ReactDOM from 'react-dom'
import QuestionCard from './QuestionCard' ;
import Timer from './Timer/Timer';
import Slide from '@material-ui/core/Slide';
class ExamPage extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        var [check,setCheck] = this.props.check;
        var [totalQuestion,setTotalQuestion] = this.props.totalQuestion;
        var [questionsList,setQuestionsList] = this.props.questionsList;        
        const [pending,setPending] = this.props.pending;        
        setPending(true)
        var res = []
        var i = 0;
        console.log(i)
        if(!check){
            axios.get(serverURL() + "exam/" + this.props.examId + "/questions" , tokenConfig() )
                .then(result => {
                    // res.push(..."1");
                    console.log(result)
                    console.log(result.data)
                    console.log(result.data.questions)
                    i = i + 1;
                    console.log(i)
                    res.push(...result.data.questions);
                    var ll = res.map((q) => q);
                    setQuestionsList([...ll]);
                    console.log(ll)
                    setCheck(true);
                    console.log(questionsList)
                    console.log(res)
                    setTotalQuestion(result.data.questions.length)
                    console.log(questionsList.length)
                    console.log(totalQuestion)
                    console.log(pending)
                    setPending(false)
                    console.log(pending)
                }).catch(error=>{
                    console.log(error.response)
                    setPending(false)
                    setCheck(true);
                })            
        }
    }
    render(){
    const classes = this.props.classes;
    const [check,setCheck] = this.props.check;
    const [totalQuestion,setTtotalQuestion] = this.props.totalQuestion;
    const [questionsList,setQuestionsList] = this.props.questionsList;
    const [pending,setPending] = this.props.pending;
    console.log(questionsList)
    console.log(questionsList)  
    var index = 1;
    return(
        <div style={{backgroundColor: 'white' , paddingBottom : '80px'}}> 
        <Material_RTL style={{backgroundColor: 'white'}}>
            <M_RTL style={{backgroundColor: 'white'}}>
                {/* <CssBaseline /> */}
                <div style={{fontFamily: 'Vazir',paddingTop: '1%',backgroundColor : '#3D5A80',width:'100%',height:'52px',color: 'white',fontSize: '16px'}}>
                    آزمون آنلاین
                </div>
                <Container maxWidth="md" alignItems="center" component="main" style={{fontFamily: 'Vazir',marginTop: '1%',paddingTop: '1%',backgroundColor : '#1ca0a0',height:'90px',fontSize: '16px'}}>
                    <Timer/>
                </Container>
                <Container maxWidth="md" alignItems="center" component="main" style={{fontFamily: 'Vazir',marginTop: '1%',paddingTop: '1%',backgroundColor : '#f2f2f2',fontSize: '16px'}}>
                <Grid container xs={12} >                      
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
                        </Grid>

                    <Container maxWidth="md" alignItems="center" component="main" style={{fontFamily: 'Vazir',marginTop: '1%',paddingTop: '1%',backgroundColor : 'white',fontSize: '16px'}}>                                                
                        <Grid id="Grid1">{pending ?
                            (<div style={{}}><CircularProgress style={{color: '#1CA0A0'}}/></div>): 
                            (<div>
                              {questionsList.length > 0 ? (questionsList.map((question,idx)=>{
                                  if(idx === 0){
                                    // alert(questionsList[idx])
                                  return(
                                  <QuestionCard examId = {examId} q={question} testanswer={testanswer} setTestAnswer = {() => {
                                      
                                  }} idx={idx} answer={questionsList[idx].answerText}/>
                                )}
                                })):null}
                              </div>)
                            }
                            </Grid>
                    </Container>
                    <Grid >
                        <Grid style={{display: 'flex',justifyContent: 'center'}}>
                          <Pagination onChange={(event,value) => {
                                    checklist=[]

                              console.log(testanswer)
                              console.log(checklist)
                              console.log(questionsList[value])
                        axios.post("https://parham-backend.herokuapp.com" + window.location.pathname + "/" + (index).toString() + "/answer?answer=" + testanswer[index-1] ,"", tokenConfig())
                        .then(res=>{
                            console.log(res)
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                        // alert(value)
                              if(questionsList.length > 0 ){ questionsList.map((question,idx)=>{
                                if(idx === value - 1){
                                    console.log("value:" + value)
                                    console.log("value - 1:" + (value - 1))
                                    console.log("idx:" + idx)
                                    console.log(questionsList[idx].answerText)
                                    console.log(question)
                                    index = question.index
                                    console.log(questionsList[idx])
                                    console.log(questionsList)
                                    checklist=[]
                                    // {handleRadioChange}
                                return(
                                    ReactDOM.render(<QuestionCard q={question} testanswer={testanswer} idx={idx} answer={questionsList[idx].answerText}/>,document.getElementById('Grid1'))
                                )}
                              }
                              )}
                          }} variant="outlined" size="small"  count={totalQuestion} shape="rounded" />
                        </Grid>
                    </Grid>
                </Container>
            </M_RTL>
        </Material_RTL>
        </div>
    )
}}

var testanswer=[]
var checklist = [];

var checklist;
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
    return (        
        <ExamPage 
            classes={classes} 
            check={check} 
            totalQuestion={totalQuestion} 
            questionsList={questionsList} 
            examId = {examId}
            pending={pending}/>    
    )
}