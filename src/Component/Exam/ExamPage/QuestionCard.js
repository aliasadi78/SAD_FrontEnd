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

        var checklistodd = [];
        var checklisteven = [];
        const [selectedRadioValue,setSelectedRadioValue] = React.useState(props.answer)
        const [shortAnswer,setShortAnswer] = React.useState();
        const [longAnswer,setLongAnswer] = React.useState();
        
        var data;
        var Example;
        const [openDialogQuestion, setOpenDialogQuestion] = React.useState(false);

        if(typeof(props.useranswer[props.idx]) === "undefined") {
            props.useranswer[props.idx] = props.answer
        }

        const handleRadioChange = (event) => {
            setSelectedRadioValue(event.target.value);
            props.useranswer[props.idx] = parseInt(event.target.value);
        };

        const handleChangeCheckBox = (event) => {
            props.useranswer[props.idx]=""
            if(props.idx % 2 == 1){
                checklistodd[parseInt(event.target.value)] = event.target.checked;
                var numberCheckedList ="";
                checklistodd.map((booleanValueCheckList,idx)=>{
                    if(booleanValueCheckList){
                        numberCheckedList = numberCheckedList + (idx+1) + ","
                    }
                })
                props.useranswer[props.idx]= numberCheckedList.slice(0,numberCheckedList.length - 1)
            }
            if(props.idx % 2 == 0){
                checklisteven[parseInt(event.target.value)] = event.target.checked;
                var numberCheckedList ="";
                checklisteven.map((c,i)=>{
                    if(c){
                        numberCheckedList = numberCheckedList + (i+1) + ","
                    }
                })
                props.useranswer[props.idx]= numberCheckedList.slice(0,numberCheckedList.length - 1)
            }
        }
        const handleChangeShortAnswer = (event) => {
            setShortAnswer(event.target.value)
            props.useranswer[props.idx] = event.target.value
        }
        const handleChangeLongAnswer = (event) => {
            setLongAnswer(event.target.value)
            props.useranswer[props.idx]= event.target.value
        }
        
        const handleClickOpenQuestion = () => {
            setOpenDialogQuestion(true);
        };
        const handleCloseQuestion = () => {
            setOpenDialogQuestion(false);
        };
        
        return(
            <Container maxWidth="md" alignItems="center" component="main" style={{fontFamily: 'Vazir',marginTop: '1%',paddingTop: '1%',backgroundColor : 'white',fontSize: '16px',direction: 'rtl',textAlign: 'right'}}>
                <span>{faNumber(props.idx + 1)}.</span><span>{props.q.question.question}                    
                <p> ( {faNumber(props.q.grade)} نمره)  </p>
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
                                    value={parseInt(props.useranswer[props.idx])}
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
                    {props.q.question.type === "MULTICHOISE" && props.idx % 2 == 1 ? (
                        <ul style={{listStyle:'persian',fontFamily: 'Vazir'}}>
                            <FormControl component="fieldset">
                                <FormGroup>
                                    {props.q.question.options.map((options,idx)=>{
                                        if(idx===0){
                                            checklistodd=[]
                                            props.useranswer[props.idx].split(',').map((j)=>{
                                            checklistodd[j - 1] = true
                                            })
                                            console.log(checklistodd)
                                        }
                                        return(
                                            <li key={idx + 1} >
                                                <FormControlLabel control={<Checkbox defaultChecked={checklistodd[idx]} value={idx} style={{color: '#1CA0A0'}} onChange={handleChangeCheckBox} name={idx} />}
                                                style={{marginRight: '0px'}}  label={<span style={{fontFamily: 'Vazir'}}>{options.option}</span>} />
                                            </li>
                                        )
                                    })}
                                </FormGroup>
                            </FormControl>
                        </ul>): null}
                    {props.q.question.type === "MULTICHOISE" && props.idx % 2 == 0 ? (
                        <ul style={{listStyle:'persian',fontFamily: 'Vazir'}}>
                            <FormControl component="fieldset">
                                <FormGroup>
                                    {props.q.question.options.map((options,idx)=>{
                                        if(idx===0){
                                            checklisteven=[]
                                            props.useranswer[props.idx].split(',').map((j)=>{
                                            checklisteven[j - 1] = true
                                            })
                                            console.log(checklisteven)
                                        }
                                        return(
                                            <li key={idx + 1} >
                                                <FormControlLabel control={<Checkbox defaultChecked={checklisteven[idx]} value={idx} style={{color: '#1CA0A0'}} onChange={handleChangeCheckBox} name={idx} />}
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
                            value={props.useranswer[props.idx] !== "undefined" ? props.useranswer[props.idx]:null}
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
                            value={props.useranswer[props.idx] !== "undefined" ? props.useranswer[props.idx]:null}
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