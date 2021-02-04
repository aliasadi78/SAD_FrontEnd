import React, { Component } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import tokenConfig from '../../../utils/tokenConfig';
import serverURL from '../../../utils/serverURL';
import Material_RTL from "../../Material_RTL";
import M_RTL from "../../M_RTL";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ExamCorrectionQuestionCard from './ExamCorrectionQuestionCard' ;
import Backdrop from '@material-ui/core/Backdrop';

import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

class ExamPage extends Component{
    constructor(props){
        super(props);

        this.state = {
            examName : null ,
            c : 100 ,
            holding : false 
        }
    }

    componentDidMount(){
        
    }
    

    componentWillMount(){
        var [check,setCheck] = this.props.check;
        var [totalQuestion,setTotalQuestion] = this.props.totalQuestion;
        var [questionsList,setQuestionsList] = this.props.questionsList; 
        var [grades , setGrades] = this.props.grades ;
        var [time,setTime] = this.props.time;  
        var [pending,setPending] = this.props.pending;           

        setPending(true);             
        var res = []
        var g = []
        if(!check){            
            axios.get(serverURL() + "exam/" + this.props.examId + "/attendees/" + this.props.username , tokenConfig() )
            .then(result => {                    
                res.push(...result.data.questions);                    
                var ll = res.map((q) => q);                    
                setQuestionsList([...ll]);
                result.data.questions.map((q) => {                    
                    g.push(q.answerGrade)
                })
                setGrades([...g]);
                this.setState(prevstate => {
                    return {
                        examName : result.data.examName ,
                        username : result.data.userFirstname + " " + result.data.userLastname
                    }
                });
                setCheck(true);
                setPending(false);
                setTotalQuestion(result.data.questions.length)                    
            }).catch(error=>{
                console.log(error.response)                                 
                setCheck(true);
                setPending(false);
            })                    
        }
    }

    render(){

        console.log(this.props.grades);
    const classes = this.props.classes;
    const [totalQuestion,setTtotalQuestion] = this.props.totalQuestion;
    const [questionsList,setQuestionsList] = this.props.questionsList;
    const [pending,setPending] = this.props.pending; 
    const [grades , setGrades] = this.props.grades ;
    const [firstalert , setFirstalert] = this.props.firstalert ;
    // var indexQuestion = 1;    
    const [indexQuestion,setIndexQuestion] = this.props.indexQuestion;
    const [color,setColor] = this.props.color

    const [backdropPending , setBackdropPending] = this.props.backdropPending;
    var [correctionError , setCorrectionError] = this.props.correctionError ;

    var T = [];
    const handle = (index) => {
      console.log(index)
      const arr = [...color]
      arr[index] = !(color[index])
      setColor(arr)
      console.log(T)
     }


    return(
        <div style={{backgroundColor: 'white' , paddingBottom : '80px'}}> 
        <Material_RTL style={{backgroundColor: 'white'}}>
            <M_RTL style={{backgroundColor: 'white'}}>
                <div style={{fontFamily: 'Vazir',paddingTop: '1%',backgroundColor : '#3D5A80',width:'100%',height:'52px',color: 'white',fontSize: '16px'}}>
                    {this.state.username}
                </div>
                <Container maxWidth="md" alignItems="center" component="main" style={{fontFamily: 'Vazir',marginTop: '1%',paddingTop: '1%',backgroundColor : '#1ca0a0',height: this.props.reviewMode == false ? 110 + 'px' : 52 + 'px' ,fontSize: '16px'}}>                    
                        <Grid item xs={12}>                            
                            <h3 style={{color : 'white' ,fontFamily: 'Vazir' }} > 
                                تصحیح آزمون                        {this.state.examName} 
                            </h3>                                         
                        </Grid>                    
                </Container>
                <Container maxWidth="md" alignItems="center" component="main" style={{fontFamily: 'Vazir',marginTop: '1%', paddingBottom : '10px',paddingTop: '1%',backgroundColor : '#f2f2f2',fontSize: '16px'}}>                    
                    
                    <Grid container xs={12} >
                                                                                                                        
                        
                    <Container maxWidth="md" alignItems="center" component="main" style={{fontFamily: 'Vazir',marginTop: '1%',paddingTop: '1%',backgroundColor : 'white',fontSize: '16px'}}>                                                
                        <Grid id="Grid1">
                            {pending ?
                                <div style={{}}><CircularProgress style={{color: '#1CA0A0'}}/></div>
                            :                                    
                            <div>
                                <div className={classes.root}>
                                    <Collapse in={firstalert} >
                                        <Alert
                                        action={
                                            <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {                                                
                                                setFirstalert (false);
                                            }}
                                            >
                                            <CloseIcon fontSize="inherit" />
                                            </IconButton>
                                        }
                                        >
                                        <p style={{fontFamily: 'Vazir'}}>
                                            برای ذخیره نمرات حتما باید روی تصحیح آزمون بزنید .
                                        </p>
                                        </Alert>
                                    </Collapse>
                                </div>

                                <div className={classes.root} style={{marginTop : '2px'}} >
                                    <Collapse in={correctionError} >
                                        <Alert
                                        severity="error"
                                        action={
                                            <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {                                                
                                                setCorrectionError(false);
                                            }}
                                            >
                                            <CloseIcon fontSize="inherit" />
                                            </IconButton>
                                        }
                                        >
                                        <p style={{fontFamily: 'Vazir'}}>
                                            {/* خطا در ثبت آزمون */}
                                        </p>
                                        </Alert>
                                    </Collapse>
                                </div>

                                {questionsList.map((question,idx)=>                                        
                                    <ExamCorrectionQuestionCard OnChange = {(value) => { grades[idx] = value ; }}
                                    q={question} examId={this.props.examId} username={this.state.username} useranswer={useranswer} idx={idx} answer={questionsList[idx].answerText}/>                                                                             
                                )}                                
                            </div>
                            }
                        </Grid>
                    </Container>                    

                    <Grid item xs={4} ></Grid>

                    <Backdrop className={classes.backdrop} open={backdropPending}>
                        <CircularProgress color="inherit" />
                    </Backdrop>

                    <Grid item xs={4} >

                            <Button variant = "contained" 
                            style={{ marginTop : "8px"  , width : this.state.c + "px" , fontFamily: 'Vazir' , backgroundColor : "#E63946"}} 
                            //   onMouseUp = {(e) =>  {handleFinishExamEvent(e)} }
                            //   onMouseDown = { (e) => { handleFinishExamEvent(e) }}                             

                            onClick = {() => {                                
                                
                                setBackdropPending(true);
                                const a = {
                                    "answerGrades" : grades
                                }

                                const ajson = JSON.stringify(a);

                                console.log(ajson);

                                axios.put(serverURL()+ "exam/" +this.props.examId + "/attendees/" + this.props.username , ajson , tokenConfig())
                                .then(res=>{
                                    console.log(res)    ;
                                    console.log('done');
                                    setBackdropPending(false)
                                })
                                .catch(err=>{
                                    console.log(err)
                                    setBackdropPending(false)
                                    setCorrectionError(true)
                                })                                
                            }}
                            >                             
                                
                                <p> تصحیح </p>                              
                            </Button>
                                                        
                            </Grid>                              

                            <Grid item xs={4} ></Grid>

                    </Grid>   
                </Container>
            </M_RTL>
        </Material_RTL>
        </div>
    )
}}
var useranswer=[]

function faNumber(n){
    const farsidigit = ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"];
    return n
    .toString()
    .split("")
    .map(x => farsidigit[x])
    .join("")
}
const useStyles = makeStyles((theme) => ({
    '@global':{
        '.div2::-webkit-scrollbar':{
            width: '5px',
        },
        'div2::-webkit-scrollbar-thumb': {
            background: '#1CA0A0',
            borderRadius: '10px',
        }
    },
    ListTitle :{
        padding : theme.spacing(1) , 
        marginBottom : theme.spacing(1) ,  
        backgroundColor : '#3D5A80' ,
        color : 'white'
    },
    backdrop : {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },
  }));
export default (props) => {
    const examId = props.match.params.examId ;    
    const username = props.match.params.username ;                

    const classes = useStyles();
    const check = React.useState(false);    
    const totalQuestion = React.useState(0);
    const questionsList= React.useState([]);
    const pending = React.useState(false);    
    const time = React.useState("")
    const backdropPending = React.useState(false) ;
    const color =  React.useState([])
    const indexQuestion =  React.useState(1)    
    var grades= React.useState([]) ;
    var firstalert = React.useState(true) ;
    var correctionError = React.useState(false);
    return (        
        <ExamPage 
            classes={classes} 
            check={check} 
            totalQuestion={totalQuestion} 
            questionsList={questionsList} 
            examId = {examId}
            pending={pending}
            backdropPending = {backdropPending}
            time={time}
            color={color}
            indexQuestion={indexQuestion}     
            username = {username}       
            grades = {grades}
            firstalert = {firstalert}
            correctionError = {correctionError} 
            />    
    )
}