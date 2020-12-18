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
            axios.get("https://parham-backend.herokuapp.com" + window.location.pathname, tokenConfig() )
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
                    console.log(error)
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
    // function QuestionCard(props){
    //     // var Answers = []
    //     // axios.get("https://parham-backend.herokuapp.com" + window.location.pathname, tokenConfig())
    //     //     .then(res=>{
    //     //         console.log(res)
    //     //             // console.log(res.data.questions);
    //     //             res.data.questions.map((q,i) =>{ 
    //     //             Answers.push(q.answerText);
    //     //             console.log(Answers)
    //     //             });
    //     //             // setQuestionsList([...ll]);
    //     //     }).catch(err=>{
    //     //         console.log(err)
    //     //     })
    //     // axios.get("https://parham-backend.herokuapp.com" + window.location.pathname, tokenConfig())
    //     const [selectedValue,setSelectedValue] = React.useState(()=>{
    //         try{
    //             console.log(props.answer.answerText)
    //             return(props.answer.answerText)}
    //         catch(err){
    //         return("")
    //         }})
    //     // componentDidUpdate:
    //     //     setSelectedValue("")
        
    //     const [checked,setChecked] = React.useState();
    //     // console.log(Answers[1].answerText)
    //     var handleRadioChange = (event) => {
    //         console.log(event.target.value)
    //         setSelectedValue(event.target.value);
    //         console.log(selectedValue)
    //     };
    //     const handleChange = (event) => {
    //         setChecked(...event.target.value)
    //     }
    //     console.log(selectedValue)
    //     // console.log(props.answer.answerText)
    //     // console.log(props.q.question)
    //     // console.log(props.q.question.question)
    //     return(
    //         <Container maxWidth="md" alignItems="center" component="main" style={{fontFamily: 'Vazir',marginTop: '1%',paddingTop: '1%',backgroundColor : 'white',fontSize: '16px',direction: 'rtl',textAlign: 'right'}}>
    //             <span>{faNumber(props.idx + 1)}.</span><span>{props.q.question.question}</span>
    //             <br/><br/>
    //                 {props.q.question.type === "TEST" ? (
    //                     <ul style={{listStyle:'persian',fontFamily: 'Vazir'}}>
    //                         <FormControl component="fieldset">
    //                             <RadioGroup
    //                                 aria-label="quiz"
    //                                 name="quiz"
    //                                 value={parseInt(selectedValue)}
    //                                 onChange={handleRadioChange}
                                    
    //                             >
    //                             {props.q.question.options.map((options,idx)=>{
    //                                 // setSelectedValue('');
    //                                 console.log(idx)
    //                                 // console.log(props.idx)
    //                                 // console.log(Answers[props.idx])
    //                                 // console.log(props.idx+1)
    //                                 // console.log(Answers[props.idx+1])
    //                                 // console.log(props.idx - 1)
    //                                 // console.log(Answers[props.idx] - 1)
    
    //                                 // console.log(props.q.question.options)
    //                                 // console.log(options.option)
    //                                 console.log(selectedValue)
    //                                 return(
    //                                     <li key={idx + 1} >
    //                                         <FormControlLabel style={{marginRight: '0px'}} value={idx+1} control={<Radio style={{color: '#1CA0A0'}}/>} label={<span style={{fontFamily: 'Vazir'}}>{options.option}</span>} />
    //                                     </li>
    //                                 )
    //                             })}
    //                 </RadioGroup>
    //                 </FormControl>
    //                     </ul>): null}
    //                     {props.q.question.type === "MULTICHOISE" ? (
    //                     <ul style={{listStyle:'persian',fontFamily: 'Vazir'}}>
    //                         <FormControl component="fieldset">
    //                         <FormGroup>
    //                             {props.q.question.options.map((options,idx)=>{
    //                                 // setSelectedValue('');
    //                                 console.log(selectedValue)
    //                                 console.log(props.q.question.options)
    //                                 console.log(options.option)
    //                                 console.log(props.q.question)
    //                                 return(
    //                                     <li key={idx + 1} >
    //                                         <FormControlLabel control={<Checkbox style={{color: '#1CA0A0'}} onChange={handleChange} name={options.option} />}
    //                                         style={{marginRight: '0px'}} value={options.option} label={<span style={{fontFamily: 'Vazir'}}>{options.option}</span>} />
    //                                     </li>
    //                                 )
    //                             })}
    //                 </FormGroup>
    //                 </FormControl>
    //                     </ul>): null}
    //                     {props.q.question.type === "LONGANSWER" ? (
    //                         <TextField
    //                         style={{width: '100%'}}
    //                         id="outlined-textarea"
    //                         placeholder="کادر جواب"
    //                         multiline
    //                         variant="outlined"
    //                         InputProps={{
    //                             style:{fontFamily: 'Vazir'},
    //                         }}
    //                       />
    //                     ):null}
    //                     {props.q.question.type === "SHORTANSWER" ? (
    //                         <TextField
    //                         style={{width: '100%'}}
    //                         id="outlined-textarea"
    //                         placeholder="کادر جواب"
    //                         multiline
    //                         variant="outlined"
    //                         InputProps={{
    //                             style:{fontFamily: 'Vazir'},
    //                         }}
    //                       />
    //                     ):null}
    //                     <br/><br/>
    //         </Container>
    //     )
    // }
    return(
        <div style={{height: '100%',backgroundColor: 'white'}}> 
        <Material_RTL style={{backgroundColor: 'white'}}>
            <M_RTL style={{backgroundColor: 'white'}}>
                {/* <CssBaseline /> */}
                <div style={{fontFamily: 'Vazir',paddingTop: '1%',backgroundColor : '#3D5A80',width:'100%',height:'52px',color: 'white',fontSize: '16px'}}>
                    آزمون آنلاین
                </div>
                <Container maxWidth="md" alignItems="center" component="main" style={{fontFamily: 'Vazir',marginTop: '1%',paddingTop: '1%',backgroundColor : '#f2f2f2',height:'150px',fontSize: '16px'}}>
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
                        
                        console.log(value)
                              if(questionsList.length > 0 ){ questionsList.map((question,idx)=>{
                                if(idx === value - 1){
                                    console.log("value:" + value)
                                    console.log("value - 1:" + (value - 1))
                                    console.log("idx:" + idx)
                                    console.log(questionsList[idx].answerText)
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

// class Answer extends Component(){
//     constructor(props){
//         super(props);
//         this.state={
//             answers : [{index: '',answer: ''}]
//         }
        
//     }
//     render(){
//         return(
//             <div></div>
//         )
//     }
// }
var testanswer=[]
function QuestionCard(props){
    // var Answers = []
    // axios.get("https://parham-backend.herokuapp.com" + window.location.pathname, tokenConfig())
    //     .then(res=>{
    //         console.log(res)
    //             // console.log(res.data.questions);
    //             res.data.questions.map((q,i) =>{ 
    //             Answers.push(q.answerText);
    //             console.log(Answers)
    //             });
    //             // setQuestionsList([...ll]);
    //     }).catch(err=>{
    //         console.log(err)
    //     })
    // axios.get("https://parham-backend.herokuapp.com" + window.location.pathname, tokenConfig())
    // const [selectedValue,setSelectedValue] = React.useState(()=>{
    //     try{
    //         console.log(props.answer.answerText)
    //         return(props.answer.answerText)}
    //     catch(err){
    //         console.log(props.answer)
    //     return(props.answer.answerText)
    //     }})
    
    
    const [checked,setChecked] = React.useState(false);
    console.log(props.answer)
    const [selectedValue,setSelectedValue] = React.useState(props.answer)
    console.log(selectedValue)
    // const componentDidUpdate = () =>{
    //     setSelectedValue(parseInt(props.answer))}
    // if(!checked && parseInt(props.answer) != selectedValue){
    //     setSelectedValue(parseInt(props.answer))
    //     setChecked(false)
    // }
    console.log(typeof(testanswer[props.idx]))
    if(typeof(testanswer[props.idx]) === "undefined") 
    {testanswer[props.idx] = props.answer}
    console.log(testanswer)
    // console.log(Answers[1].answerText)
    const handleRadioChange = (event) => {
        console.log(event.target.value)
        setSelectedValue(event.target.value);
        console.log(selectedValue)
        testanswer[props.idx] = parseInt(event.target.value);
        console.log(testanswer)
    };
    const handleChange = (event) => {
        setChecked(...event.target.value)
    }
    return(
        <Container maxWidth="md" alignItems="center" component="main" style={{fontFamily: 'Vazir',marginTop: '1%',paddingTop: '1%',backgroundColor : 'white',fontSize: '16px',direction: 'rtl',textAlign: 'right'}}>
            <span>{faNumber(props.idx + 1)}.</span><span>{props.q.question.question}</span>
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
                                // setSelectedValue('');
                                // console.log(selectedValue)
                                // console.log(props.q.question.options)
                                // console.log(options.option)
                                // console.log(props.q.question)
                                return(
                                    <li key={idx + 1} >
                                        <FormControlLabel control={<Checkbox style={{color: '#1CA0A0'}} onChange={handleChange} name={options.option} />}
                                        style={{marginRight: '0px'}} value={options.option} label={<span style={{fontFamily: 'Vazir'}}>{options.option}</span>} />
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
const useStyles = makeStyles((theme) => ({
    
  }));
export default () => {
    const classes = useStyles();
    const check = React.useState(false);
    const totalQuestion = React.useState(0);
    const questionsList= React.useState([]);
    const pending = React.useState(false);
    return (        
        <ExamPage classes={classes} check={check} totalQuestion={totalQuestion} questionsList={questionsList} pending={pending}/>    
    )
}