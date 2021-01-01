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
import ReactDOM from 'react-dom'
import QuestionCard from './QuestionCard' ;
import Timer from './Timer/Timer';
import Button from '@material-ui/core/Button';
import Typography from 'material-ui/styles/typography';
import ReviewQuestionCard from './reviewQuestionCard';

class ExamPage extends Component{
    constructor(props){
        super(props);

        this.state = {
            examName : null ,
            c : 100 ,
            holding : false 
        }
    }
    

    componentWillMount(){
        var [check,setCheck] = this.props.check;
        var [totalQuestion,setTotalQuestion] = this.props.totalQuestion;
        var [questionsList,setQuestionsList] = this.props.questionsList; 
        var [time,setTime] = this.props.time;  
        var [pending,setPending] = this.props.pending;  
        setPending(true);             
        var res = []
        if(!check && !this.props.reviewMode){
            axios.get(serverURL() + "exam/" + this.props.examId + "/questions" , tokenConfig() )
                .then(result => {                    
                    res.push(...result.data.questions);
                    setTime(result.data.user_examEndTime);
                    var ll = res.map((q) => q);                    
                    setQuestionsList([...ll]);
                    this.setState(prevstate => {
                        return {
                            examName : result.data.name
                        }
                    });
                    setCheck(true);
                    setPending(false);
                    setTotalQuestion(result.data.questions.length)                    
                }).catch(error=>{
                    console.log(error.response)
                    setTime("")                    
                    setCheck(true);
                    setPending(false);
                })            
        }
        if(!check && this.props.reviewMode ){
            axios.get(serverURL() + "exam/" + this.props.examId + "/questions/review" , tokenConfig() )
            .then( result => {
                setQuestionsList([...result.data.questions]);                
                setCheck(true);     
                setPending(false);           
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }
    render(){
    const classes = this.props.classes;
    const [totalQuestion,setTtotalQuestion] = this.props.totalQuestion;
    const [questionsList,setQuestionsList] = this.props.questionsList;
    const [pending,setPending] = this.props.pending; 
    // var indexQuestion = 1;
    const [time,setTime] = this.props.time;
    const [indexQuestion,setIndexQuestion] = this.props.indexQuestion;
    const [color,setColor] = this.props.color
    var T = [];
    const handle = (index) => {
      console.log(index)
      const arr = [...color]
      arr[index] = !(color[index])
      setColor(arr)
      console.log(T)
     }

    // const  handleFinishExamEvent = (event) => {
    //     if (event.type === "mousedown") {
    //         console.log("shit down");                            
    //                 setTimeout(() => {
    //                 this.setState(prestate => {                                        
    //                     return{
    //                         c : this.state.c + 1 ,
    //                     }
    //                 })                                     
    //                 },50 ) ;                                                
    //     } else {
    //         this.setState(prestate => {                                        
    //             return{
    //                 holding : false ,
    //                 c : 100
    //             }
    //         })
    //     }
    // }

    return(
        <div style={{backgroundColor: 'white' , paddingBottom : '80px'}}> 
        <Material_RTL style={{backgroundColor: 'white'}}>
            <M_RTL style={{backgroundColor: 'white'}}>
                <div style={{fontFamily: 'Vazir',paddingTop: '1%',backgroundColor : '#3D5A80',width:'100%',height:'52px',color: 'white',fontSize: '16px'}}>
                    {this.state.examName}
                </div>
                <Container maxWidth="md" alignItems="center" component="main" style={{fontFamily: 'Vazir',marginTop: '1%',paddingTop: '1%',backgroundColor : '#1ca0a0',height:'110px',fontSize: '16px'}}>
                    {this.props.reviewMode == false ?
                        <Timer time={time} examId={this.props.examId}/>
                    :
                        <Grid item xs={12}>
                            {/* <Typography variant="h1" style={{fontFamily: 'Vazir'}} >
                                مرور آزمون
                            </Typography>                             */}
                        </Grid>
                    }
                </Container>
                <Container maxWidth="md" alignItems="center" component="main" style={{fontFamily: 'Vazir',marginTop: '1%', paddingBottom : '40px',paddingTop: '1%',backgroundColor : '#f2f2f2',fontSize: '16px'}}>
                <Grid container xs={12} >
                                                    
                          <Grid item xs={4} ></Grid>
                          <Grid item xs={4} >

                          <Button variant = "contained" 
                          style={{ marginBottom : "8px"  , width : this.state.c + "px" , fontFamily: 'Vazir' , backgroundColor : "#E63946"}} 
                        //   onMouseUp = {(e) =>  {handleFinishExamEvent(e)} }
                        //   onMouseDown = { (e) => { handleFinishExamEvent(e) }} 

                        onClick = {() => {
                            for (let index = 0; index < questionsList.length; index++) {
                                const element = questionsList[index];
                                axios.post("https://parham-backend.herokuapp.com" + window.location.pathname + "/" + (indexQuestion).toString() + "/answer?answer=" + useranswer[indexQuestion-1] ,"", tokenConfig())
                                .then(res=>{
                                    console.log(res)
                                })

                                .catch(err=>{
                                    console.log(err)
                                })
                            }
                        }}
                          >
                              اتمام آزمون 
                          </Button>
                                                      
                          </Grid>                              

                          <Grid item xs={4} ></Grid>

                    {this.props.reviewMode == false &&                           
                        <Grid container item xs={12}
                            direction="row"
                            justify="center"
                            alignItems="center" 
                            style={{display: 'flex',justifyContent: 'center'}}>
                                <div class="div1" style={{width:'100%',overflow:'hidden'}}>
                                    <div class="div2" style={{display: 'flex',padding: '1%',overflowX:'scroll',backgroundColor: '#1ca0a0'}}>
                                        {questionsList.map((q,index) => {
                                          return(
                                            <Button onClick={()=>{
                                                axios.post("https://parham-backend.herokuapp.com" + window.location.pathname + "/" + (indexQuestion).toString() + "/answer?answer=" + useranswer[indexQuestion-1] ,"", tokenConfig())
                                                .then(res=>{
                                                    console.log(res)
                                                })

                                                .catch(err=>{
                                                    console.log(err)
                                                })
                                                                                                
                                                if(questionsList.length > 0 ){ questionsList.map((question,idx)=>{
                                                    if(idx === index){                                        
                                                        setIndexQuestion(question.index)
                                                        console.log(indexQuestion)
                                                        return(
                                                            ReactDOM.render(<QuestionCard examId={this.props.examId} q={question} useranswer={useranswer} idx={idx} answer={questionsList[idx].answerText}/>,document.getElementById('Grid1'))
                                                        )
                                                    }
                                                    }
                                                )}                                                
                                                console.log(useranswer)
                                                console.log(questionsList[indexQuestion-1])
                                                console.log(questionsList[index])
                                            }} variant="outlined" style={{fontFamily: 'Vazir',backgroundColor : typeof(questionsList[index].answerText) !== "undefined" || typeof(useranswer[index]) !== "undefined" ? "green": "gray",color: "white",margin:'1%'}}>{faNumber(index+1)}</Button>
                                          )
                                        })}
                                    </div>
                                </div>
                            </Grid>                        
                    }

                    {this.props.reviewMode == false &&
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
                    }

                    {this.props.reviewMode == true &&
                        <Container maxWidth="md" alignItems="center" component="main" style={{fontFamily: 'Vazir',marginTop: '1%',paddingTop: '1%',backgroundColor : 'white',fontSize: '16px'}}>                                                
                            <Grid id="Grid1">
                                {pending ?
                                    <div style={{}}><CircularProgress style={{color: '#1CA0A0'}}/></div>
                                :                                    
                                <div>
                                    {questionsList.map((question,idx)=>                                        
                                        <ReviewQuestionCard q={question} examId={this.props.examId} useranswer={useranswer} idx={idx} answer={questionsList[idx].answerText}/>                                         
                                    )}
                                </div>
                                }
                            </Grid>
                        </Container>
                    }
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
  }));
export default (props) => {
    const examId = props.match.params.examId ;    
    const classes = useStyles();
    const check = React.useState(false);    
    const totalQuestion = React.useState(0);
    const questionsList= React.useState([]);
    const pending = React.useState(false);    
    const time = React.useState("")
    const color =  React.useState([])
    const indexQuestion =  React.useState(1)
    const [reviewMode , s] = React.useState(props.location.pathname.includes("review"));    
    console.log(reviewMode);
    return (        
        <ExamPage 
            classes={classes} 
            check={check} 
            totalQuestion={totalQuestion} 
            questionsList={questionsList} 
            examId = {examId}
            pending={pending}
            time={time}
            color={color}
            indexQuestion={indexQuestion}
            reviewMode = {reviewMode}
            />    
    )
}