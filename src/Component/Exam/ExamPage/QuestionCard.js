import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
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
import Container from "@material-ui/core/Container";

export default function QuestionCard(props){     

    
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

        const [checked,setChecked] = React.useState();
        // setChecked([])
        var checklist = [];
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
        
        
        // console.log(typeof(props.testanswer[props.idx]))
        if(typeof(props.testanswer[props.idx]) === "undefined") 
        {props.testanswer[props.idx] = props.answer}
        console.log(props.testanswer)
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
            props.testanswer[props.idx] = parseInt(event.target.value);
            console.log(props.testanswer)
        };
        const handleChange = (event) => {
            // setChecked(...event.target.value)
            // console.log(checked)
            console.log(props.testanswer[props.idx])
    
            props.testanswer[props.idx]=""
            console.log(event.target.value)
            console.log(event.target.checked)
            checklist[parseInt(event.target.value)] = event.target.checked;
            var cl ="";
            checklist.map((c,i)=>{
                if(c){
                    cl = cl + (i+1) + ","
                }
            })
            props.testanswer[props.idx]= cl.slice(0,cl.length - 1)
            console.log(checklist)
            console.log(props.testanswer[props.idx])
            // setChecked(checklist)
        }
        const handleChangeShortAnswer = (event) => {
            
            setShortAnswer(event.target.value)
            props.testanswer[props.idx] = event.target.value
        }
        const handleChangeLongAnswer = (event) => {
            setLongAnswer(event.target.value)
            props.testanswer[props.idx]= event.target.value
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
                <span>{faNumber(props.idx + 1)}.</span><span>{props.q.question.question}                    
                <p> ( {props.q.grade} نمره)  </p>
                    </span>
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
                    {props.q.question.type === "TEST" ? (
                        <ul style={{listStyle:'persian',fontFamily: 'Vazir'}}>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    aria-label="quiz"
                                    name="quiz"
                                    value={parseInt(props.testanswer[props.idx])}
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
                                            props.testanswer[props.idx].split(',').map((j)=>{
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
                            value={props.testanswer[props.idx] !== "undefined" ? props.testanswer[props.idx]:null}
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
                            value={props.testanswer[props.idx] !== "undefined" ? props.testanswer[props.idx]:null}
                            onChange={handleChangeShortAnswer}
                            multiline
                            variant="outlined"
                            InputProps={{
                                style:{fontFamily: 'Vazir'},
                            }}
                          />
                        ):null}                        
            </Container>
        )
}