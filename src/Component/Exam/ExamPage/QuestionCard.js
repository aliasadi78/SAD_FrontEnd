import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Dialog from '@material-ui/core/Dialog';
import Alert from '@material-ui/lab/Alert';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import axios from 'axios';
import Zoom from '@material-ui/core/Zoom';
import Tooltip from '@material-ui/core/Tooltip';
import tokenConfig from '../../../utils/tokenConfig';
import serverURL from '../../../utils/serverURL';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import Container from "@material-ui/core/Container";
import Grid from '@material-ui/core/Grid';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import IconButton from '@material-ui/core/IconButton';
import Axios from 'axios';

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
        const [isFileLoaded , setIsFileLoaded] = React.useState(false);
        const [fileName , setFilename] = React.useState(null)
        const [isfileImage , setisFileImage] = React.useState(false)
        const [ image , setImage] = React.useState(null);
        const [uploading , setUploading] = React.useState(false);
        const [ mood , setMood ] = React.useState("Exam");
        const [ isFileDeleted , setIsFileDeleted] = React.useState(false);
        const [deleting , setDeleting] = React.useState(false);
        const file = new FormData();

        // error handling
        const [ error , setError] = React.useState(false);
        const [ errorMessage , setErrorMessage] = React.useState(null);
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
            <Container maxWidth="md" alignItems="center" component="main" style={{fontFamily: 'Vazir',marginTop: '1%' , paddingBottom : '10px',paddingTop: '1%',backgroundColor : 'white',fontSize: '16px',direction: 'rtl',textAlign: 'right'}}>
                
                {(uploading == true || deleting == true) &&
                <Grid item xs={12} style={{ color : '#EE6C4D'}}>
                    <LinearProgress style={{marginBottom : '8px'}} />
                </Grid>
                }

                <Grid item xs={12}>
                    <Collapse                            
                        in={error} 
                        style={{marginBottom : '16px'}}
                        >
                        <Alert
                        severity="error"
                        action={
                            <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setError(false);
                                // setAddQuestionPending(false)
                            }}                            
                            >
                            <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        >
                            <span style={{fontFamily: 'Vazir' , marginLeft : '8px' , marginRight : '8px'}}> {errorMessage} </span>
                        </Alert>
                    </Collapse>
                </Grid>
                
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
                                
                        </Grid>
                </Grid>

                
                {mood == 'Exam' &&
                <Grid item xs={12} >
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
                                            console.log(props.useranswer)
                                            if(typeof(props.useranswer[props.idx]) !== "undefined"){
                                            props.useranswer[props.idx].split(',').map((j)=>{
                                            checklistodd[j - 1] = true
                                            })}
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
                                            console.log(props.useranswer)
                                            if(typeof(props.useranswer[props.idx]) !== "undefined"){
                                            props.useranswer[props.idx].split(',').map((j)=>{
                                            checklisteven[j - 1] = true
                                            })}
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
                        <div>
                            
                            <Grid item xs={12}>
                                <input 
                                    type="file" name="file" accept=".pdf,.png,.jpg,.zip,.jpeg"
                                    style={{display : 'none'}}
                                    id='file' type="file"                                 
                                    onChange={(e) => {
                                        console.log(e.target.files[0])                                                                        
                                        file.append('answer' , e.target.files[0] );    
                                        setIsFileLoaded(true); 
                                        const a = e.target.files[0].name.split('.') ;
                                        console.log(a[a.length-1]);
                                        if(a[a.length - 1] == "jpg" || 
                                            a[a.length - 1] == "png" ||
                                            a[a.length - 1] == "PNG" )  
                                            setisFileImage(true); 
                                        else
                                            setisFileImage(false);     
                                        setFilename(e.target.files[0].name);
                                        let reader = new FileReader();
                                        
                                        reader.readAsDataURL(e.target.files[0]);
                                        
                                        reader.onload = (e) => {
                                            // console.log(e.target.result);
                                            setImage(e.target.result);
                                            setIsFileLoaded(true);                                            
                                        }
                                        setUploading(true);
                                        setIsFileDeleted(false);
                                        const index = props.idx + 1 ;
                                        axios.post(serverURL() + "exam/" + props.examId + "/questions/" + index + "/answer" , file , tokenConfig() )                                
                                        .then(res => {
                                            console.log("done");                                            
                                            setUploading(false);
                                            console.log(file);                                            
                                        })
                                        .catch(err => {
                                            console.log(err.response);
                                            setError(true);
                                            setErrorMessage(err.response.data.error)
                                            setUploading(false);
                                        })
                                    }}/>
                            </Grid>

                            <div >
                                <label htmlFor='file'>
                                    <Tooltip title={<span style={{fontFamily: 'Vazir',fontSize: '12px'}}>افزودن فایل </span>}
                                    placement="left"
                                    TransitionComponent={Zoom} style={{fontFamily: 'Vazir'}} >
                                        <IconButton aria-label="upload picture" component="span">                        
                                            <FileCopyIcon style={{color:'#EE6C4D'}} />                                    
                                        </IconButton>  
                                    </Tooltip>                                  
                                </label>
                            </div>                              

                            {(props.q.answerFile != null && isFileLoaded == false && isFileDeleted == false) &&                            
                            <div>
                                {isfileImage ?
                                    <img src= {props.q.answerFile} 
                                    width="50%" height="80%" style={{cursor: 'pointer' , margin : '2px'}}/>                                                                  
                                :
                                    <a href = {props.q.answerFile} >
                                        دانلود فایل
                                    </a>
                                }
                            </div>
                            }


                            {(isfileImage == true && isFileDeleted == false)  &&
                                <Grid item xs ={12} >
                                    
                                            <IconButton onClick={()=>{                                        
                                                setDeleting(true);
                                                setImage(null);                                                
                                                setisFileImage(false);  
                                                setIsFileLoaded(false);                                      
                                                const index = props.idx + 1 ;
                                                axios.delete(serverURL() + "exam/" + props.examId + "/questions/" + index + "/answer?deleteFile=true" , tokenConfig() )                                
                                                .then(res => {
                                                    console.log("done");
                                                    setDeleting(false);
                                                    setIsFileDeleted(true);
                                                })
                                                .catch(err => {
                                                    console.log(err);                                                    
                                                })
                                            }}                                            
                                            >
                                                <CloseIcon style={{color:'#EE6C4D'}} />
                                            </IconButton>                                                                                    

                                    <img src= {image} 
                                    width="50%" height="80%" style={{cursor: 'pointer' , margin : '2px'}}/>                                     
                                </Grid>
                            }                                                                              

                            {isFileLoaded &&                            
                                <div >
                                    {fileName}  
                                    {isfileImage == false &&                          
                                        <label htmlFor='file'>                                                                                    
                                            <IconButton onClick={()=>{                                                                                    
                                                setDeleting(true);
                                                setImage(null);                                                
                                                setisFileImage(false);  
                                                setIsFileLoaded(false);                                                                        
                                                const index = props.idx + 1 ;
                                                axios.delete(serverURL() + "exam/" + props.examId + "/questions/" + index + "/answer?deleteFile=true" , tokenConfig() )                                
                                                .then(res => {
                                                    console.log("done");
                                                    setDeleting(false);
                                                    setIsFileDeleted(true);
                                                })
                                                .catch(err => {
                                                    console.log(err);                                                    
                                                })
                                            }}                                            
                                            >
                                                <CloseIcon style={{color:'#EE6C4D'}} />
                                            </IconButton>                                            
                                        </label>
                                    }
                                </div>                                    
                            }

                            <div style= {{position : 'relative' , marginTop : '8px' }} >
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
                            </div>
                        </div>
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

                </Grid>                      
                }
                                            
            </Container>
        )
}