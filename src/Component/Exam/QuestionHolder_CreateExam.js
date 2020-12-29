import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LightenDarkenColor } from 'lighten-darken-color'; 
import Paper from '@material-ui/core/Paper';
import Material_RTL from "../Material_RTL";
import RTL from '../M_RTL';
import Grid from '@material-ui/core/Grid';
import { Form , Col , Row} from 'react-bootstrap';
import { useDispatch } from 'react-redux' ; 
import {
    addQuestion , removeQuestion , addGrade , moveUp , moveDown , updateSumGrade
} from './ExamSlice' ;
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button' ;
import axios from 'axios' ;
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { createMuiTheme } from '@material-ui/core/styles';
import serverURL from '../../utils/serverURL';
import tokenConfig from '../../utils/tokenConfig';
import AlertDialog from '../Dialog';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';

const theme = createMuiTheme({
  palette: {
    primary:{
        main :  '#3D5A80',
    }, 
    secondary :{
        main: '#EE6C4D' ,
    }, 
  },  
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,        
    paddingRight : '1px' ,
    paddingLeft :  '1px' ,
    width : '100%',
    marginBottom : theme.spacing(2) 
  },
  paper: {
    padding: theme.spacing(1),    
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius : '0px' ,
    marginBottom : theme.spacing(3)
  },
  expandGrid :{               
      align : 'center'
  },
  grid :{
    alignItems : 'flex-end' ,
  },
  input: {
    display: 'none',
  },
  accordion:{
      paddingBottom : theme.spacing(0) ,
  },  
  EditButton :{
      backgroundColor :'#EE6C4D' ,
      "&:hover": {
        backgroundColor: LightenDarkenColor('#EE6C4D', -40) ,
        color :'white'
      },
  },
  DeleteButton :{
    backgroundColor :'#E63946' ,
    "&:hover": {
      backgroundColor: LightenDarkenColor('#E63946', -40) ,
      color :'white'
  },
},
}));

function editQuestion (){
    // localStorage.setItem()
}


export default function QuestionHolder_Create(props) {

    const [deleted , setDeleted] = React.useState(false);

    const [choice1 , setChoice1] = React.useState(false);
    const [choice2 , setChoice2] = React.useState(false);
    const [choice3 , setChoice3] = React.useState(false);
    const [choice4 , setChoice4] = React.useState(false);    

    const dispatch = useDispatch();

    const classes = useStyles();

    const handleDeleteQuestion = (questionId) => {
        console.log(questionId);
        axios.delete( serverURL() + "question/" +  questionId , tokenConfig() , JSON.stringify({}) , )
        .then(res => {
            console.log(res);
            setDeleted(true);
        })
        .catch(e => {
            console.log(e);
        });
    };

    // const [answers , ]

    return (
        <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg" className = {classes.root} >            
            <Material_RTL>
                <RTL>
                    <Accordion   square              
                    className = {classes.accordion}    
                    style={{backgroundColor: props.backColor }}
                    expanded = {props.alwaysExpand}
                    >
                        <AccordionSummary
                            // expandIcon={<ExpandMoreIcon style={{ color: "white" }}/>}
                            aria-controls="panel1c-content"
                            id="panel1c-header"
                            className = {classes.accordion}                            
                            >                            
                            <Grid container spacing={0}  >  
                                {props.mode == "preview" &&
                                    <Grid item xs={4}>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" style={{color: 'balck'}}>
                                        نمره
                                        </Form.Label>
                                        <Col sm="4">
                                            <Form.Control type="text" defaultValue={props.grade} 
                                            onChange={(e) => {                                            
                                                dispatch(addGrade({"index" : props.index , "grade" : e.target.value}));
                                                dispatch(updateSumGrade());
                                            }} />
                                        </Col>
                                    </Form.Group>
                                    </Grid>
                                }                                      
                                {props.mode == "preview" &&                                     
                                    <Grid item xs={4}></Grid>
                                }   
                                {props.mode == "preview" &&                                     
                                    <Grid item xs={4}>              
                                        <ButtonGroup size="small" variant="contained" color="#3D5A80" aria-label="contained primary button group">
                                            <Button onClick={()=> {
                                                dispatch(moveUp(props.index));
                                            }}><ArrowUpwardIcon /></Button>
                                            <Button onClick={()=> {
                                                dispatch(moveDown(props.index));
                                            }}><ArrowDownwardIcon /></Button>
                                            <Button onClick={() => {
                                            if(props.mode=="select question")
                                                handleDeleteQuestion( props.question._id);
                                            if(props.mode=="preview")
                                            {
                                                // if(props.question._id !== null)
                                                //     dispatch(removeQuestion(props.question._id));
                                                // if(props.question.qId !== null)
                                                //     dispatch(removeQuestion(props.question.qId));                                                
                                                dispatch(removeQuestion(props.index));
                                            }                                                
                                                }}><HighlightOffIcon /></Button>
                                        </ButtonGroup>                          
                                    </Grid>                                                                
                                }                       
                                <Grid item xs={12}>
                                    <Paper className={classes.paper} elevation={0}>
                                        <TextField                    
                                            id="outlined-multiline-static"
                                            defaultValue = {props.question.question}                                  
                                            multiline
                                            disabled
                                            // rows={4}
                                            fullWidth = 'true'
                                            className = {classes.BigForm}                                            
                                            variant="outlined"
                                            InputLabelProps={{style:{fontFamily: 'Vazir'}}}
                                            InputProps={{
                                                style:{fontFamily: 'Vazir'},
                                            }}
                                        />
                                    </Paper>
                                </Grid>     
                                {props.question.imageQuestion != null &&
                                    <Grid item xs={12} style={{marginBottom : '0px'}}>
                                        <img src={atob(props.question.imageQuestion)} 
                                        width="50%" height="80%" style={{cursor: 'pointer' , margin : '2px'}}/>
                                    </Grid>
                                }
                                {props.mode == "select question" &&     
                                <Grid container xs={12} justifyContent='center' direction="row" >
                                    <Grid item xs={2}>
                                        <Tooltip title={<span style={{fontFamily: 'Vazir',fontSize: '12px'}}>اضافه به آزمون</span>}>
                                            <IconButton variant="contained"                                        
                                                onClick={() => {                                                
                                                    dispatch(addQuestion(props.question));                                                
                                                }} >
                                                        <AddToQueueIcon fontSize="large" style={{color: '#EE6C4D',cursor:'pointer'}} />                                            
                                            </IconButton>                                       
                                        </Tooltip>
                                    </Grid>                                    
                                    <Grid item xs={2}>  
                                        <Tooltip title={<span style={{fontFamily: 'Vazir',fontSize: '12px'}}> حذف از سوالات من </span>}>
                                            <IconButton variant="contained" onClick={() => {                                            
                                                    handleDeleteQuestion( props.question._id);                                            
                                                    }}>
                                                        <DeleteIcon fontSize="large" style={{color: '#E63946',cursor:'pointer'}} />                                            
                                            </IconButton>   
                                        </Tooltip>                                                                      
                                    </Grid>                                    
                                </Grid>   
                                }     
                                {props.mode == "preview"  &&
                                    <Grid className={classes.expandGrid} item xs={12} >
                                        <ExpandMoreIcon style={{ color: "#3D5A80" , align: 'center'}}/>
                                    </Grid>            
                                }
                            </Grid>                            
                        </AccordionSummary>
                        <AccordionDetails className = {classes.details}>
                            
                                <Grid item justifyContent='center' spacing={3} xs={12} >
                                <Paper className={classes.paper}>
                                {
                                    props.question.type === "LONGANSWER" ?
                                        <TextField                                                                    
                                        id="outlined-multiline-static"
                                        label="جواب"
                                        multiline
                                        disabled
                                        defaultValue = {props.question.answers[0].answer}
                                        rows={4}
                                        fullWidth = 'true'
                                        className = {classes.BigForm}
                                        disabled                                        
                                        // defaultValue="Default Value"
                                        variant="outlined"
                                        InputLabelProps={{style:{fontFamily: 'Vazir'}}}
                                            InputProps={{
                                                style:{fontFamily: 'Vazir'},
                                            }}
                                        />   
                                    :                                          
                                    props.question.type === 'TEST' ?
                                        <FormControl component="fieldset">                                                    
                                            <RadioGroup aria-label="gender" 
                                            value={props.question.answers[0].answer}  className = {classes.RadioChoice} name="gender1">
                                                <Grid container>
                                                    <Grid item xs={6}>
                                                        <form class ="form-inline">
                                                            <FormControlLabel value={1} disabled control={<Radio />} /> <TextField disabled defaultValue={props.question.options[0].option}  variant="filled" margin='dense' />
                                                        </form>       
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <form class ="form-inline">
                                                            <FormControlLabel value={2} disabled control={<Radio />} /> <TextField disabled defaultValue={props.question.options[1].option} variant="filled" margin='dense' />
                                                        </form>       
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <form class ="form-inline">
                                                            <FormControlLabel value={3} disabled control={<Radio />} /> <TextField disabled defaultValue={props.question.options[2].option} variant="filled" margin='dense' />
                                                        </form>       
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <form class ="form-inline">
                                                            <FormControlLabel value={4} disabled control={<Radio />} /> <TextField disabled defaultValue={props.question.options[3].option} variant="filled" margin='dense' />
                                                        </form>                                                        
                                                    </Grid>
                                                </Grid>
                                            </RadioGroup>
                                        </FormControl>
                                    :props.question.type === 'MULTICHOISE' &&
                                        <FormGroup>
                                            {props.question.options.map((m , index) => 
                                            <form class="form-inline">
                                                <Checkbox checked={props.question.answers.some(elem =>{
                                                    return JSON.stringify({"answer" : index + 1}) === JSON.stringify(elem);})
                                                    ? true : false }  name="gilad"  disabled
                                                    className ={classes.multiCheckbox} color='#3D5A80' /> 
                                                    <TextField variant="filled"  margin='dense'disabled  defaultValue={props.question.options[index].option}/>
                                            </form>                                    
                                            )}                                                         
                                        </FormGroup>

                                } 
                                </Paper>
                                </Grid>                            
                                
                                {props.question.imageAnswer != null &&
                                    <Grid item xs={12} style={{marginBottom : '0px'}}>
                                        <img src={atob(props.question.imageAnswer)} 
                                        width="50%" height="80%" style={{cursor: 'pointer' , margin : '2px'}}/>
                                    </Grid>
                                }                                                                 
                                                                                                                      
                        </AccordionDetails>                        
                    </Accordion> 
                    {
                        deleted == true ?
                        <AlertDialog text = "سوال شما حذف شد" />
                        :
                        <p></p>
                    }
                    </RTL>
                </Material_RTL>                
            </Container>
        </React.Fragment>
    );  
}