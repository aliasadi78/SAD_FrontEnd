import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LightenDarkenColor } from 'lighten-darken-color'; 
import Paper from '@material-ui/core/Paper';
import Material_RTL from "../Material_RTL";
import RTL from '../M_RTL';
import Grid from '@material-ui/core/Grid';
import { useDispatch } from 'react-redux' ; 
import {
    loadEdittingQuestion , selectQuestion
} from './QuestionsSlice' ;
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button' ;
import axios from 'axios' ;
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { createMuiTheme } from '@material-ui/core/styles';
import serverURL from '../../utils/serverURL';
import tokenConfig from '../../utils/tokenConfig';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import { connect } from 'react-redux' ;
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
    //برای فونت
    '@global':{
        '.MuiInputBase-input.Mui-disabled' : {
        fontFamily: 'Vazir',
        },
      },
  root: {
    flexGrow: 1,    
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


function UserDesignedQuestion(props) {

    const [deleted , setDeleted] = React.useState(false);    

    const dispatch = useDispatch();

    const classes = useStyles();

    const handleDeleteQuestion = (questionId) => {
        console.log(questionId);
        axios.delete( serverURL() + "question/" +  questionId , tokenConfig() , JSON.stringify({}) , )
        .then(res => {
            console.log(res);
            setDeleted(true);
            props.onRefresh() ;
        })
        .catch(e => {
            console.log(e);
        });
    };

    return (
        <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg" className = {classes.root}>            
            <Material_RTL>
                <RTL>
                    <Accordion   square              
                    className = {classes.accordion}    
                    style={{backgroundColor: props.backColor }}
                    expanded = {props.alwaysExpand}
                    >
                        <AccordionSummary                            
                            aria-controls="panel1c-content"
                            id="panel1c-header"
                            className = {classes.accordion}                            
                            >                            
                            <Grid container spacing={0}  >                                
                                <Grid item xs={12}>
                                    <Paper className={classes.paper}>
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
                                {props.soalImage != null &&
                                    <Grid item xs={12} style={{marginBottom : '0px'}}>
                                        <img src={atob(props.soalImage)} 
                                        width="50%" height="80%" style={{cursor: 'pointer' , margin : '2px'}}/>
                                    </Grid>
                                }
                                <Grid className={classes.expandGrid} item xs={12} >
                                    <ExpandMoreIcon style={{ color: "#EE6C4D    " , align: 'center'}}/>
                                </Grid>            
                            </Grid>                            
                        </AccordionSummary>
                        <AccordionDetails className = {classes.details}>
                            
                                <Grid item justifyContent='center' spacing={3} xs={12} >
                                <Paper className={classes.paper}>
                                {
                                    props.type === 'LONGANSWER' ?
                                        <TextField                                                                    
                                        id="outlined-multiline-static"
                                        label={<span style={{fontFamily: 'Vazir'}}>جواب</span>}
                                        multiline
                                        disabled
                                        defaultValue = {props.answers[0].answer}
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
                                    props.type === 'TEST' ?
                                        <FormControl component="fieldset">                                                    
                                            <RadioGroup aria-label="gender" 
                                            value={props.answers[0].answer}  className = {classes.RadioChoice} name="gender1">
                                                <Grid container>
                                                    <Grid item xs={6}>
                                                        <form class ="form-inline">
                                                            <FormControlLabel value={1} disabled control={<Radio />} /> <TextField disabled defaultValue={props.options[0].option}  variant="filled" margin='dense' />
                                                        </form>       
                                                    </Grid>
                                                        <Grid item xs={6}>
                                                            <form class ="form-inline">
                                                                <FormControlLabel value={2} disabled control={<Radio />} /> <TextField disabled defaultValue={props.options[1].option} variant="filled" margin='dense' />
                                                            </form>       
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <form class ="form-inline">
                                                                <FormControlLabel value={3} disabled control={<Radio />} /> <TextField disabled defaultValue={props.options[2].option} variant="filled" margin='dense' />
                                                            </form>       
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <form class ="form-inline">
                                                                <FormControlLabel value={4} disabled control={<Radio />} /> <TextField disabled defaultValue={props.options[3].option} variant="filled" margin='dense' />
                                                            </form>                                                        
                                                        </Grid>
                                                </Grid>
                                            </RadioGroup>
                                        </FormControl>
                                    :
                                        <FormGroup>
                                            {props.question.options.map((m , index) => 
                                            <form class="form-inline">
                                                <Checkbox checked={props.question.answers.includes({"answer" : index + 1}) ? true : false }  name="gilad"  disabled
                                                    className ={classes.multiCheckbox} color='#3D5A80' /> 
                                                    <TextField variant="filled"  margin='dense'disabled  defaultValue={m.option}/>
                                            </form>  
                                            )}                                                                                                                                        
                                        </FormGroup>
                                                    
                                } 
                                </Paper>
                                </Grid>   

                                {props.javabImage != null &&
                                    <Grid item xs={12} style={{marginBottom : '12px'}}>
                                        <img src={atob(props.javabImage)} 
                                        width="50%" height="80%" style={{cursor: 'pointer' , margin : '2px'}}/>
                                    </Grid>
                                }

                                <Grid container xs={12} justifyContent='center' direction="row" >
                                    <Grid item xs={2}>
                                        <Button variant="contained"                                        
                                            onClick={() => {                                                
                                                dispatch(loadEdittingQuestion(props.index));                                                
                                                props.loadQuestion(props.question);
                                                console.log(props.question);
                                            }} 
                                            className={classes.EditButton}>

                                            <Typography variant='button' style = {{fontFamily: 'Vazir'}} >
                                                ویرایش
                                            </Typography>
                                        </Button>                                       
                                    </Grid>
                                    <Grid item xs={2}>                                        
                                        <Button variant="contained" onClick={() => {                                            
                                            handleDeleteQuestion( props.question._id);                                            
                                            }} className={classes.DeleteButton}>
                                            <Typography variant='button' style = {{fontFamily: 'Vazir'}} >
                                                حذف
                                            </Typography>
                                        </Button>                                                                         
                                    </Grid>                                    
                                </Grid>                                                                                         
                        </AccordionDetails>                        
                    </Accordion>                     
                    </RTL>
                </Material_RTL>                
            </Container>
        </React.Fragment>
    );  
}

const mapDispatchToProps = dispatch => {
    return {
        loadQuestion : (e) => dispatch(selectQuestion(e))
    }
}

export default connect(null , mapDispatchToProps)(UserDesignedQuestion)