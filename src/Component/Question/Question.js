import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Material_RTL from "../Material_RTL";
import Typography from '@material-ui/core/Typography';
import RTL from '../M_RTL';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop : theme.spacing(0) ,
  },
  paper: {
    padding: theme.spacing(1),    
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  dropdownpaper :{
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  grid :{
    alignItems : 'flex-end' ,
  },
  dropdowns :{
      height : 'inherit'
  },
  input: {
    display: 'none',
  },
  accordion :{
    backgroundColor : '#98C1D9' ,
  },
  BigForm :{},
  details :{},
  dropdowns : {
    marginRight : theme.spacing(1) ,
    marginLeft : theme.spacing(1) ,
  },
  Button :{
      backgroundColor :'#EE6C4D' ,
      "&:hover": {
        backgroundColor: '#00C853' ,
        color :'white'
      },
  },
  checkbox : {
      color : 'white' ,      
      '&$checked': {
        color: '#EE6C4D',
      },
  },
}));

function valuetext(value) {
    if(value==1)
        return 'آسان';
    else if (value==2)
        return 'متوسط' ;
    else
        return 'سخت' ;;    
  }  

export default function Question(props) {
    const classes = useStyles();
//   const 
    const grades = [
        { title: 'دوازدهم'},
         { title: 'یازدهم'},
            { title: 'دهم'},
            { title: 'نهم'},        
    ];

    const lessons = [
        { title: 'ریاضی'},
         { title: 'هندسه'},
            { title: 'گسسته'},
            { title: 'فیزیک'},        
            {title: 'شیمی'},
            {title: 'ادبیات'},
    ];

    const questionTypes = [
        {title:'تشریحی'} , 
        {title:'تستی'} , 
        {title:'چندگزینه ای'} , 
        {title:'جای خالی'} , 
    ];

    const [publicCheck , setpublicCheck ] = React.useState(false);
    const [difficulty , setDifficulty] = React.useState(1);
    const [questionType , setQuestionType] = React.useState('tashrihi');

    const handleChange = () => {
        setpublicCheck(!publicCheck);
      };    

    const handleQuestionTypeFormChange = e => {
        if(e.target.value == 'تستی')
        {
            setQuestionType('testi');            
        }        
        else{
            setQuestionType('tashrihi');            
        }            
    };

    return (
        <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm" className = {classes.root}>
            <Material_RTL>
                <RTL>
                    <Accordion className={classes.accordion}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1c-content"
                            id="panel1c-header">
                            <Grid container spacing={3}>                                
                                <Grid item xs={12}>
                                    <Paper className={classes.paper}>
                                        <TextField                    
                                            id="outlined-multiline-static"
                                            label="طرح سوال جدید"
                                            multiline
                                            rows={4}
                                            fullWidth = 'true'
                                            className = {classes.BigForm}
                                            // defaultValue="Default Value"
                                            variant="outlined"
                                        />
                                    </Paper>
                                </Grid>
                            </Grid>
                        </AccordionSummary>
                        <AccordionDetails className = {classes.details}>
                                <Grid container spacing={3}>                 
                                <Grid item xs={4}>
                                    <Paper className={classes.dropdownpaper}>
                                        <Autocomplete
                                            id="پایه"
                                            options={grades}
                                            getOptionLabel={(option) => option.title}
                                            className = {classes.dropdowns}                                    
                                            debug
                                            renderInput={(params) => <TextField margin ='dense' {...params} label="پایه"    
                                            />}
                                        />
                                    </Paper>
                                </Grid>
                                <Grid item xs={4}>
                                    <Paper className={classes.dropdownpaper}>                                    
                                        <Autocomplete
                                            id="درس"
                                            options={lessons}
                                            getOptionLabel={(lessons) => lessons.title}
                                            className = {classes.dropdowns}                                    
                                            debug
                                            renderInput={(params) => <TextField margin='dense' {...params} label="درس"    
                                            />}
                                        />                                    
                                    </Paper>
                                </Grid>
                                <Grid item xs={4}>
                                    <Paper className={classes.dropdownpaper}>
                                        <TextField className = {classes.dropdowns} margin ='dense' label="فصل"/>
                                    </Paper>
                                </Grid>                                
                                <Grid item xs={4}>                                    
                                    <Paper className={classes.dropdownpaper}>                                    
                                        <Autocomplete
                                            id="درس"
                                            options={questionTypes}
                                            getOptionLabel={(questionTypes) => questionTypes.title}
                                            className = {classes.dropdowns}                                    
                                            debug
                                            renderInput={(params) => <TextField margin='dense' {...params} label="نوع سوال"    
                                            onChange = {handleQuestionTypeFormChange}
                                            />}
                                        />                                    
                                    </Paper>                                    
                                </Grid>

                                <Grid item xs={6}>
                                    <Paper className={classes.paper}>
                                        <Typography id="discrete-slider" gutterBottom style = {{fontFamily: 'Vazir'}} >
                                            درجه سختی سوال  {valuetext(difficulty)}
                                        </Typography>
                                        <Slider
                                            dir = "rtl"
                                            defaultValue={1}
                                            getAriaValueText={valuetext}
                                            aria-labelledby="discrete-slider"
                                            valueLabelDisplay="auto"                                            
                                            step={1}
                                            marks
                                            min={1}
                                            max={3}
                                        />
                                    </Paper>
                                </Grid>                                

                                <Grid item xs={12}>     
                                    <Paper className={classes.paper}>
                                        {
                                            questionType === 'tashrihi' ?
                                                <TextField                                                                    
                                                id="outlined-multiline-static"
                                                label="جواب"
                                                multiline
                                                rows={4}
                                                fullWidth = 'true'
                                                className = {classes.BigForm}
                                                // defaultValue="Default Value"
                                                variant="outlined"
                                                /> 
                                            :
                                            // questionType === 'testi' ?
                                                <FormControl component="fieldset">                                                    
                                                    <RadioGroup aria-label="gender" name="gender1" onChange={handleChange}>
                                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                                                        <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />
                                                    </RadioGroup>
                                                </FormControl>

                                        }                                                                           
                                    </Paper>
                                </Grid>

                                <Grid item xs={4}>                                    
                                    <Button variant="contained" className={classes.Button} href="#contained-buttons">
                                        <Typography variant='button' style = {{fontFamily: 'Vazir'}} >
                                            {props.submitButton}
                                        </Typography>
                                    </Button>                                    
                                </Grid>
                                <Grid item xs={8} className = {classes.grid} >                                    
                                    <FormControlLabel                                        
                                        control={<Checkbox checked={publicCheck} onChange={handleChange}
                                            className ={classes.checkbox} name="checkedG" />}
                                        label="سوالم برای بقیه کاربران قابل دسترس باشد."
                                        style = {{fontFamily: 'Vazir'}}
                                    />                                    
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
