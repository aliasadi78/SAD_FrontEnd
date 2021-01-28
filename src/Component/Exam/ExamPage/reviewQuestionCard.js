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
import DescriptionIcon from '@material-ui/icons/Description';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import Container from "@material-ui/core/Container";
import Grid from '@material-ui/core/Grid';

export default function ReviewQuestionCard(props){    
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

        console.log(props.q);

        var checklistodd = [];
        var checklisteven = [];
        const [selectedRadioValue,setSelectedRadioValue] = React.useState(props.answer)
        const [shortAnswer,setShortAnswer] = React.useState();
        const [longAnswer,setLongAnswer] = React.useState();
        const [isFileLoaded , setIsFileLoaded] = React.useState(false);
        const [fileName , setFilename] = React.useState(null)
        const [isfileImage , setisFileImage] = React.useState(false)
        const [ image , setImage] = React.useState(null);

        const [ mood , setMood ] = React.useState("Exam");

        const file = new FormData();
        
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
           
        var type = null ;
        const [check , setCheck] = React.useState(true);

        // if(props.q.answerFile != null){
        //     type = props.q.answerFile.split('.')[props.q.answerFile.split.length - 1 ]            

        //     if(check){
        //         if( type == "jpg" || 
        //             type == "png" ||
        //             type == "PNG" )  {
        //                 setisFileImage(true); 
        //                 setCheck(true);
        //             }                    
        //         else {            
        //             setisFileImage(false);                     
        //             setCheck(true);
        //         }
        //     }
        // }

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
            <Container maxWidth="md" alignItems="center" component="main" style={{fontFamily: 'Vazir',marginTop: '1%' , paddingBottom : '10px',paddingTop: '1%',backgroundColor : 'white',fontSize: '16px',direction: 'rtl',textAlign: 'right'}}>
                <span>{faNumber(props.idx + 1)}.</span><span>{props.q.question.question}                    
                <p> ( {faNumber(props.q.grade)} نمره)  </p>
                    </span>
                <Grid item xs={12}>                    
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
                </Grid>      

                <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center" 
                    >

                        <Grid item xs={12} >
                            {/* <Typography style={{fontFamily: 'Vazir'}} >
                                جواب شما 
                            </Typography>                          */}
                        </Grid>
                </Grid>  

                                <br />
                            <p style={{color : '#3D5A80'}} > <DescriptionIcon  /> جواب شما :  </p>
                            {/* <br /> */}

                <div>
                <Grid item xs={12} >
                    {props.q.question.type === "TEST" ? (
                        
                        <FormControl>                                
                            <RadioGroup
                                aria-label="quiz"
                                name="quiz"
                                value={parseInt(props.useranswer[props.idx])}
                                onChange={handleRadioChange}                                
                            >
                                <ul style={{listStyle:'persian',fontFamily: 'Vazir'}}>
                                    <Grid container >
                                        {props.q.question.options.map((options,idx)=>{
                                            return(
                                                <Grid item xs={6} >
                                                    <li key={idx + 1} >
                                                        <FormControlLabel style={{marginRight: '0px'}} value={idx+1} control={<Radio style={{color: '#3D5A80'}}/>} disabled label={<span style={{fontFamily: 'Vazir'}}>{options.option}</span>} />
                                                    </li>
                                                </Grid>
                                            )
                                        })}
                                    </Grid>
                                </ul>
                            </RadioGroup>
                        </FormControl>
                        ): null}
                    </Grid>
                    <Grid item xs={12} >
                    {props.q.question.type === "MULTICHOISE" && props.idx % 2 == 1 ? (
                        <ul style={{listStyle:'persian',fontFamily: 'Vazir'}}>
                            <FormControl component="fieldset">
                                <FormGroup>
                                    {props.q.question.options.map((options,idx)=>{
                                        if(idx===0){
                                            checklistodd=[]
                                            console.log(props.useranswer)
                                            if(typeof(props.useranswer[props.idx]) !== "undefined"){
                                            props.useranswer[props.idx].split(',').map((j)=>{
                                            checklistodd[j - 1] = true
                                            })}
                                            console.log(checklistodd)
                                        }
                                        return(
                                            <li key={idx + 1} >
                                                <FormControlLabel control={<Checkbox disabled defaultChecked={checklistodd[idx]} value={idx} style={{color: '#3D5A80'}} onChange={handleChangeCheckBox} name={idx} />}
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
                                            console.log(props.useranswer)
                                            if(typeof(props.useranswer[props.idx]) !== "undefined"){
                                            props.useranswer[props.idx].split(',').map((j)=>{
                                            checklisteven[j - 1] = true
                                            })}
                                            console.log(checklisteven)
                                        }
                                        return(
                                            <li key={idx + 1} >
                                                <FormControlLabel control={<Checkbox disabled defaultChecked={checklisteven[idx]} value={idx} style={{color: '#3D5A80'}} onChange={handleChangeCheckBox} name={idx} />}
                                                style={{marginRight: '0px'}}  label={<span style={{fontFamily: 'Vazir'}}>{options.option}</span>} />
                                            </li>
                                        )
                                    })}
                                </FormGroup>
                            </FormControl>
                        </ul>): null}
                    {props.q.question.type === "LONGANSWER" ? (
                        <div> 

                            {(props.q.answerFile != null) &&                            
                                <div>
                                    {isfileImage == true?
                                        <img src= {props.q.answerFile} 
                                        width="50%" height="80%" style={{cursor: 'pointer' , margin : '2px'}}/>                                                                  
                                    :
                                        <a href = {props.q.answerFile} >
                                            دانلود فایل
                                        </a>
                                    }
                                </div>
                            }

                            <TextField
                                style={{width: '100%'}}
                                id="outlined-textarea"
                                placeholder="کادر جواب"
                                multiline
                                disabled
                                value={props.useranswer[props.idx] !== "undefined" ? props.useranswer[props.idx]:null}
                                onChange={handleChangeLongAnswer}
                                variant="outlined"
                                InputProps={{
                                    style:{fontFamily: 'Vazir'},
                                }}
                            />


                        </div>
                    ):null}
                    {props.q.question.type === "SHORTANSWER" ? (
                        <TextField
                            style={{width: '100%'}}
                            id="outlined-textarea"
                            placeholder="کادر جواب"
                            value={props.q.question.answers[0].answer}
                            onChange={handleChangeShortAnswer}
                            multiline
                            variant="outlined"
                            InputProps={{
                                style:{fontFamily: 'Vazir'},
                            }}
                        />
                    ):null}       

                </Grid>                                      
              </div>  
              <br />              
              <p style={{color : '#1ca0a0'}}>
                               <CheckCircleIcon />    جواب درست : </p>                                
                                <div>
                <Grid item xs={12} >
                    {props.q.question.type === "TEST" ? (
                        
                        <FormControl>                                
                            <RadioGroup
                                aria-label="quiz"
                                name="quiz"
                                value={parseInt(props.q.question.answers[0].answer)}
                                onChange={handleRadioChange}
                            >
                                <ul style={{listStyle:'persian',fontFamily: 'Vazir'}}>
                                    <Grid container >
                                        {props.q.question.options.map((options,idx)=>{
                                            return(
                                                <Grid item xs={6} >
                                                    <li key={idx + 1} >
                                                        <FormControlLabel style={{marginRight: '0px'}} value={idx+1} control={<Radio style={{color: '#1CA0A0'}}/>} disabled label={<span style={{fontFamily: 'Vazir'}}>{options.option}</span>} />
                                                    </li>
                                                </Grid>
                                            )
                                        })}
                                    </Grid>
                                </ul>
                            </RadioGroup>
                        </FormControl>
                        ): null}
                    </Grid>
                    <Grid item xs={12} >
                    {props.q.question.type === "MULTICHOISE" && props.idx % 2 == 1 ? (
                        <ul style={{listStyle:'persian',fontFamily: 'Vazir'}}>
                            <FormControl component="fieldset">
                                <FormGroup>
                                    {props.q.question.options.map((options,idx)=>{
                                        if(idx===0){
                                            checklistodd=[]
                                            console.log(props.useranswer)
                                            if(typeof(props.useranswer[props.idx]) !== "undefined"){
                                            props.useranswer[props.idx].split(',').map((j)=>{
                                            checklistodd[j - 1] = true
                                            })}
                                            console.log(checklistodd)
                                        }
                                        return(
                                            <li key={idx + 1} >
                                                <FormControlLabel control={<Checkbox disabled defaultChecked={
                                                    props.q.question.answers.some(elem => {
                                                        return elem.answer === idx + 1;
                                                    })
                                                } value={idx} style={{color: '#1CA0A0'}} name={idx} />}
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
                                            console.log(props.useranswer)
                                            if(typeof(props.useranswer[props.idx]) !== "undefined"){
                                            props.useranswer[props.idx].split(',').map((j)=>{
                                            checklisteven[j - 1] = true
                                            })}
                                            console.log(checklisteven)
                                        }
                                        return(
                                            <li key={idx + 1} >
                                                <FormControlLabel control={<Checkbox disabled defaultChecked={
                                                    props.q.question.answers.some(elem => {
                                                        return elem.answer === idx + 1;
                                                    })
                                                } value={idx} style={{color: '#1CA0A0'}} onChange={handleChangeCheckBox} name={idx} />}
                                                style={{marginRight: '0px'}}  label={<span style={{fontFamily: 'Vazir'}}>{options.option}</span>} />
                                            </li>
                                        )
                                    })}
                                </FormGroup>
                            </FormControl>
                        </ul>): null}
                    {props.q.question.type === "LONGANSWER" ? (
                        <div>                        
                            <TextField
                                style={{width: '100%'}}
                                id="outlined-textarea"
                                placeholder="کادر جواب"
                                multiline
                                disabled
                                value={props.q.question.answers[0].answer}
                                onChange={handleChangeLongAnswer}
                                variant="outlined"
                                InputProps={{
                                    style:{fontFamily: 'Vazir'},
                                }}
                            />

                            {props.q.question.imageAnswer != null &&
                                <Grid container justify = 'center' alignItems='center' direction='row'>                                    
                                    <Grid item xs={12} style={{textAlign : 'center'}} >
                                        <img
                                        src={atob(props.q.question.imageAnswer)}                                        
                                        width="50%" height="80%" style={{cursor: 'pointer' , margin : '14px'}}/>
                                    </Grid>                                    
                                </Grid>
                            }

                        </div>
                    ):null}
                    {props.q.question.type === "SHORTANSWER" ? (
                        <TextField
                            style={{width: '100%'}}
                            id="outlined-textarea"
                            placeholder="کادر جواب"
                            value={props.q.question.answers[0].answer}
                            onChange={handleChangeShortAnswer}
                            multiline
                            variant="outlined"
                            InputProps={{
                                style:{fontFamily: 'Vazir'},
                            }}
                        />
                    ):null}       

                </Grid>                                      
              </div> 
                <hr />                                            
            </Container>            
        )
}