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
import { renderToString } from 'react-dom/server';
import Timer from './Timer/Timer';
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
    // console.log(i)
    console.log(questionsList)
    const handlePage = (event,value)=>{
        return (value)
    }
    return(
        <div style={{height: '100%'}}> 
        <Material_RTL>
            <M_RTL>
                <CssBaseline/>
                <div style={{fontFamily: 'Vazir',paddingTop: '1%',backgroundColor : '#3D5A80',width:'100%',height:'52px',color: 'white',fontSize: '16px'}}>
                    آزمون آنلاین
                </div>
                <Container maxWidth="md" alignItems="center" component="main" style={{fontFamily: 'Vazir',marginTop: '1%',paddingTop: '1%',backgroundColor : '#f2f2f2',height:'150px',fontSize: '16px'}}>
                     زمان باقی مانده 
                    <Timer/>
                </Container>
                <Container maxWidth="md" alignItems="center" component="main" style={{fontFamily: 'Vazir',marginTop: '1%',paddingTop: '1%',backgroundColor : '#f2f2f2',fontSize: '16px'}}>
                    <Container maxWidth="md" alignItems="center" component="main" style={{fontFamily: 'Vazir',marginTop: '1%',paddingTop: '1%',backgroundColor : 'white',fontSize: '16px'}}>
                         {/* {pending ? (console.log(questionsList)):(console.log(questionsList[0].question))} */}
                         
                            <Grid id="Grid1">{pending ?
                            (<div style={{}}><CircularProgress style={{color: '#1CA0A0'}}/></div>): 
                            // <QuestionCard q={questionsList} />}
                            (<div>
                              {questionsList.length > 0 ? (questionsList.map((question,idx)=>{
                                  if(idx === 0){
                                  return(
                                  <QuestionCard q={question} idx={idx}/>
                                )}
                                })):null}
                              </div>)
                              
                            }</Grid>
                    </Container>
                    <Grid >
                        <Grid style={{display: 'flex',justifyContent: 'center'}}>
                          <Pagination onChange={(event,value) => {
                              if(questionsList.length > 0 ){ questionsList.map((question,idx)=>{
                                if(idx === value - 1){
                                return(
                                document.getElementById("Grid1").innerHTML = renderToString(<QuestionCard q={question} idx={idx}/>)
                              )}
                              })}
                          }} variant="outlined" size="small" siblingCount={0} boundaryCount={1} count={totalQuestion} shape="rounded" />
                        </Grid>
                    </Grid>
                </Container>
            </M_RTL>
        </Material_RTL>
        </div>
    )
}}

function QuestionCard(props){
    console.log(props.q)
    console.log(props.idx)
    // if(props.q.length > 0){
        // console.log(props.q)
        console.log(props.q.question.question)
    // }
    
    // console.log(props.q.question)
    // console.log(props.q.question.question)
    return(
        <Container maxWidth="md" alignItems="center" component="main" style={{fontFamily: 'Vazir',marginTop: '1%',paddingTop: '1%',backgroundColor : 'white',fontSize: '16px',direction: 'rtl',textAlign: 'right'}}>
            <span>{faNumber(props.q.index)}.</span><span>{props.q.question.question}</span>
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


// import React, { Component } from 'react';
// import { makeStyles } from "@material-ui/core/styles";
// import axios from 'axios';
// import tokenConfig from '../../../utils/tokenConfig';
// import serverURL from '../../../utils/serverURL';
// import Material_RTL from "../../Material_RTL";
// import M_RTL from "../../M_RTL";
// import Grid from "@material-ui/core/Grid";
// import Container from "@material-ui/core/Container";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import Pagination from '@material-ui/core/Pagination';
// function ExamPage(props){
//     const classes = useStyles();
//     const [check,setCheck] = React.useState(false)
//     const [totalQuestion,setTtotalQuestion] = React.useState(0);
//     const [questions,setQuestions] = React.useState([])
    
//     var res = []
//     componentDidMount:{
//     if(!check){
//     axios.get(serverURL() + "exam/" + props.match.params.examId + "/questions", tokenConfig() )
//         .then(result => {
//             // res.push(..."1");
//             res.push(...result.data.questions);
//             var ll = res.map((q) => q);
//             setQuestions([...ll]);
//             // console.log(res)
//             setCheck(true);
//             console.log(questions)
//             setTtotalQuestion(questions.length)
//         }).catch(error=>{
//             console.log(error)
//             setCheck(true);
//         })
//     }}
//     const handlePage = (event,value)=>{
//         return (value)
//     }
//     return(
//         <div style={{height: '100%'}}> 
//         <Material_RTL>
//             <M_RTL>
//                 <CssBaseline/>
//                 <div style={{fontFamily: 'Vazir',paddingTop: '1%',backgroundColor : '#3D5A80',width:'100%',height:'52px',color: 'white',fontSize: '16px'}}>
//                     آزمون آنلاین
//                 </div>
//                 <Container maxWidth="md" alignItems="center" component="main" style={{fontFamily: 'Vazir',marginTop: '1%',paddingTop: '1%',backgroundColor : '#f2f2f2',height:'100px',fontSize: '16px'}}>
//                      TIMER 
//                      </Container>
//                 <Container maxWidth="md" alignItems="center" component="main" style={{fontFamily: 'Vazir',marginTop: '1%',paddingTop: '1%',backgroundColor : '#f2f2f2',fontSize: '16px'}}>
//                     <Container maxWidth="md" alignItems="center" component="main" style={{fontFamily: 'Vazir',marginTop: '1%',paddingTop: '1%',backgroundColor : 'white',fontSize: '16px'}}>
//                          <QuestionCard q={questions[0]} />
//                     </Container>
//                     <Grid >
//                         <Grid style={{display: 'flex',justifyContent: 'center'}}>
//                           <Pagination onChange={handlePage} variant="outlined" size="small" siblingCount={0} boundaryCount={1} count={totalQuestion} shape="rounded" />
//                         </Grid>
//                     </Grid>
//                 </Container>
//             </M_RTL>
//         </Material_RTL>
//         </div>
//     )
// }

// function QuestionCard(props){
//     console.log(props.q)
//     console.log(props.q)
//     // console.log(props.q.question.question)
//     return(
//         <Container maxWidth="md" alignItems="center" component="main" style={{fontFamily: 'Vazir',marginTop: '1%',paddingTop: '1%',backgroundColor : 'white',fontSize: '16px'}}>
//             {/* {props} */}
//         </Container>
//     )
// }

// const useStyles = makeStyles((theme) => ({
    
//   }));
// export default ExamPage;