import React, { Component } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import tokenConfig from '../../../utils/tokenConfig';
import serverURL from '../../../utils/serverURL';
import Material_RTL from "../../Material_RTL";
import M_RTL from "../../M_RTL";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Pagination from '@material-ui/core/Pagination';
import { CircularProgress } from '@material-ui/core';
import { renderToString,render,renderIntoDocument } from 'react-dom/server';
import ReactDOM from 'react-dom'
import Timer from './Timer/Timer';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
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
                    console.log(error.response.data)
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
    var index = 1;
    return(
        <div style={{backgroundColor: 'white' , paddingBottom : '80px'}}> 
        <Material_RTL style={{backgroundColor: 'white'}}>
            <M_RTL style={{backgroundColor: 'white'}}>
                {/* <CssBaseline /> */}
                <div style={{fontFamily: 'Vazir',paddingTop: '1%',backgroundColor : '#3D5A80',width:'100%',height:'52px',color: 'white',fontSize: '16px'}}>
                    آزمون آنلاین
                </div>
                <Container maxWidth="md" alignItems="center" component="main" style={{fontFamily: 'Vazir',marginTop: '1%',paddingTop: '1%',backgroundColor : '#1ca0a0',height:'150px',fontSize: '16px'}}>
                    <Timer/>
                </Container>
                <Container maxWidth="md" alignItems="center" component="main" style={{fontFamily: 'Vazir',marginTop: '1%',paddingTop: '1%',backgroundColor : '#f2f2f2',fontSize: '16px'}}>
                    <Container maxWidth="md" alignItems="center" component="main" style={{fontFamily: 'Vazir',marginTop: '1%',paddingTop: '1%',backgroundColor : 'white',fontSize: '16px'}}>
                        <Grid id="Grid1">{pending ?
                            (<div style={{}}><CircularProgress style={{color: '#1CA0A0'}}/></div>): 
                            (<div>
                              {questionsList.length > 0 ? (questionsList.map((question,idx)=>{
                                  if(idx === 0){
                                    // alert(questionsList[idx])
                                  return(
                                  <QuestionCard q={question} idx={idx} answer={questionsList[idx].answerText}/>
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
                                    ReactDOM.render(<QuestionCard q={question} idx={idx} answer={questionsList[idx].answerText}/>,document.getElementById('Grid1'))
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
function QuestionCard(props){
   
    // checklist=[]
    const [checked,setChecked] = React.useState();
    // setChecked([])
    
    console.log(props.answer)
    const [selectedValue,setSelectedValue] = React.useState(props.answer)
    console.log(selectedValue)
    // const componentDidUpdate = () =>{
    //     setSelectedValue(parseInt(props.answer))}
    // if(!checked && parseInt(props.answer) != selectedValue){
    //     setSelectedValue(parseInt(props.answer))
    //     setChecked(false)
    // }
    console.log(props.q.question.options)
    // 
    
    
    console.log(typeof(testanswer[props.idx]))
    if(typeof(testanswer[props.idx]) === "undefined") 
    {testanswer[props.idx] = props.answer}
    console.log(testanswer)
    // const [checkOptions,setCheckOptions] = React.useState(()=>{
        
        
    // })
    // console.log(checklist)
    // console.log(checkOptions)
    const [shortAnswer,setShortAnswer] = React.useState();
    // if(props.q.question.type === "SHORTANSWER"){
    //     setShortAnswer(props.answer)
    // }
    const [longAnswer,setLongAnswer] = React.useState();
    // if(props.q.question.type === "LONGANSWER"){
    //     setLongAnswer(props.answer)
    // }
    console.log(longAnswer)
    console.log(shortAnswer)
    const handleRadioChange = (event) => {
        console.log(event.target.value)
        setSelectedValue(event.target.value);
        console.log(selectedValue)
        testanswer[props.idx] = parseInt(event.target.value);
        console.log(testanswer)
    };
    const handleChange = (event) => {
        // setChecked(...event.target.value)
        // console.log(checked)
        console.log(testanswer[props.idx])

        testanswer[props.idx]=""
        console.log(event.target.value)
        console.log(event.target.checked)
        checklist[parseInt(event.target.value)] = event.target.checked;
        var cl ="";
        checklist.map((c,i)=>{
            if(c){
                cl = cl + (i+1) + ","
            }
        })
        testanswer[props.idx]= cl.slice(0,cl.length - 1)
        console.log(checklist)
        console.log(testanswer[props.idx])
        // setChecked(checklist)
    }
    const handleChangeShortAnswer = (event) => {
        
        setShortAnswer(event.target.value)
        testanswer[props.idx] = event.target.value
    }
    const handleChangeLongAnswer = (event) => {
        setLongAnswer(event.target.value)
        testanswer[props.idx]= event.target.value
    }
    const [openDialogQuestion, setOpenDialogQuestion] = React.useState(false);
    const handleClickOpenQuestion = () => {
        setOpenDialogQuestion(true);
    };
    const handleCloseQuestion = () => {
        setOpenDialogQuestion(false);
    };
    var data;
    var Example;
    return(
        <Container maxWidth="md" alignItems="center" component="main" style={{fontFamily: 'Vazir',marginTop: '1%',paddingTop: '1%',backgroundColor : 'white',fontSize: '16px',direction: 'rtl',textAlign: 'right'}}>
            <span>{faNumber(props.idx + 1)}.</span><span>{props.q.question.question}</span>
            <div>
            <Card style={{position: 'relative',right: '37%',width:'25%',}}>
              <CardMedia>
            {typeof(props.q.question.imageQuestion) !== "undefined" ? ( 
                data = props.q.question.imageQuestion.toString(),
                Example = ({ data }) => <img src={atob(data)} onClick={handleClickOpenQuestion} width="100%" height="100%" style={{cursor: 'pointer'}}/>,
                  <Example data={data} />
              ): null}
              <Dialog
                  open={openDialogQuestion}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleCloseQuestion}
                  aria-labelledby="alert-dialog-slide-title"
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                    {typeof(props.q.question.imageQuestion) !== "undefined" ? ( 
                      <Example data={data}/>
                      ): null}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <div onClick={handleCloseQuestion} style={{fontFamily: 'Vazir',color: 'red',position: 'absolute',right:'1%',top: '2%',cursor:'pointer'}}><FontAwesomeIcon icon={faWindowClose} size="2x"/></div>
                  </DialogActions>
                </Dialog>
              </CardMedia>
            </Card>
            </div>
            <br/><br/>
                {props.q.question.type === "TEST" ? (
                    <ul style={{listStyle:'persian',fontFamily: 'Vazir'}}>
                        <FormControl component="fieldset">
                            <RadioGroup
                                aria-label="quiz"
                                name="quiz"
                                value={parseInt(testanswer[props.idx])}
                                onChange={handleRadioChange}
                            >
                            {props.q.question.options.map((options,idx)=>{
                                return(
                                    <li key={idx + 1} >
                                        <FormControlLabel style={{marginRight: '0px'}} value={idx+1} control={<Radio style={{color: '#1CA0A0'}}/>} label={<span style={{fontFamily: 'Vazir'}}>{options.option}</span>} />
                                    </li>
                                )
                            })}
                </RadioGroup>
                </FormControl>
                    </ul>): null}
                        {props.q.question.type === "MULTICHOISE" ? (
                    <ul style={{listStyle:'persian',fontFamily: 'Vazir'}}>
                        <FormControl component="fieldset">
                        <FormGroup>
                            {props.q.question.options.map((options,idx)=>{
                                if(idx===0){
                                console.log(checklist)

                                    checklist=[]
                                    // if(typeof(props.answer) != "undefined"){
                                        testanswer[props.idx].split(',').map((j)=>{
                                        checklist[j - 1] = true
                                    })
                                console.log(checklist)

                                }
                                    // setChecked(checklist)
                                // }
                                console.log(checklist)
                                console.log(checklist[idx])
                                // console.log(checked)
                                return(
                                    <li key={idx + 1} >
                                        <FormControlLabel control={<Checkbox defaultChecked={checklist[idx]} value={idx} style={{color: '#1CA0A0'}} onChange={handleChange} name={idx} />}
                                        style={{marginRight: '0px'}}  label={<span style={{fontFamily: 'Vazir'}}>{options.option}</span>} />
                                    </li>
                                )
                            })}
                </FormGroup>
                </FormControl>
                    </ul>): null}
                    {props.q.question.type === "LONGANSWER" ? (
                        <TextField
                        style={{width: '100%'}}
                        id="outlined-textarea"
                        placeholder="کادر جواب"
                        multiline
                        value={testanswer[props.idx] !== "undefined" ? testanswer[props.idx]:null}
                        onChange={handleChangeLongAnswer}
                        variant="outlined"
                        InputProps={{
                            style:{fontFamily: 'Vazir'},
                        }}
                      />
                    ):null}
                    {props.q.question.type === "SHORTANSWER" ? (
                        <TextField
                        style={{width: '100%'}}
                        id="outlined-textarea"
                        placeholder="کادر جواب"
                        value={testanswer[props.idx] !== "undefined" ? testanswer[props.idx]:null}
                        onChange={handleChangeShortAnswer}
                        multiline
                        variant="outlined"
                        InputProps={{
                            style:{fontFamily: 'Vazir'},
                        }}
                      />
                    ):null}
                    <br/><br/>
        </Container>
    )
}
function faNumber(n){
    const farsidigit = ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"];
    return n
    .toString()
    .split("")
    .map(x => farsidigit[x])
    .join("")
}
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const useStyles = makeStyles((theme) => ({
    
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