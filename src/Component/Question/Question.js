import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LightenDarkenColor } from 'lighten-darken-color'; 
import Paper from '@material-ui/core/Paper';
import Material_RTL from "../Material_RTL";
import Typography from '@material-ui/core/Typography';
import RTL from '../M_RTL';
import Grid from '@material-ui/core/Grid';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AccordionActions from '@material-ui/core/AccordionActions';
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
import { createMuiTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
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
    // marginTop : theme.spacing(5) ,
    width : '100%'
  },
  RadioChoice :{
    
  },
  paper: {
    padding: theme.spacing(1),    
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius : '0px' ,
  },
  dropdownpaper :{
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBottom : theme.spacing(3) , 
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
  BigForm :{},
  details :{},
  dropdowns : {
    marginRight : theme.spacing(1) ,
    marginLeft : theme.spacing(1) ,
  },
  Button :{
      backgroundColor :'#EE6C4D' ,
      "&:hover": {
        backgroundColor: LightenDarkenColor('#EE6C4D', -40) ,        
        color :'white'
      },
  },
  checkbox : {
      color : '#EE6C4D' ,            
  },
  multiCheckbox : {
    color : '#3D5A80' ,            
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
    
    const [choice1 , setChoice1] = React.useState(false);
    const [choice2 , setChoice2] = React.useState(false);
    const [choice3 , setChoice3] = React.useState(false);
    const [choice4 , setChoice4] = React.useState(false);

    const[TestAnswer , setTestAnswer] = React.useState(null);    

    const handleChange = () => {
        setpublicCheck(!publicCheck);
      };    

    const handleQuestionTypeFormChange = e => {
        if(e.target.value == 'تستی')
        {
            // setQuestionType('testi');            
            return 'testi' ;
        }        
        else if(e.target.value=='تشریحی'){
            // setQuestionType('tashrihi');            
            return 'tashrihi' ; 
        }else {
            // setQuestionType('multichoice');
            return 'multichoice' ;
        }
    };

    return (
        <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg" className = {classes.root}>            
            <Material_RTL>
                <RTL>
                    <Accordion square
                    style={{backgroundColor: props.backColor }}
                    expanded = {props.alwaysExpand}
                    >
                        <AccordionSummary
                            // expandIcon={<ExpandMoreIcon style={{ color: "white" }}/>}
                            aria-controls="panel1c-content"
                            id="panel1c-header"
                            className = {classes.accordion}
                            >                            
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
                            <Paper className={classes.dropdownpaper}>
                                <Grid container spacing={3} >                 

                                    <Grid item xs={4}>
                                            <Autocomplete
                                                id="پایه"
                                                options={grades}
                                                getOptionLabel={(option) => option.title}
                                                className = {classes.dropdowns}                                    
                                                debug                                            
                                                renderInput={(params) => <TextField variant = 'outlined' margin ='dense' {...params} label="پایه"    
                                                />}
                                            />                                        
                                    </Grid>
                                    <Grid item xs={4}>                                        
                                            <Autocomplete
                                                id="درس"
                                                options={lessons}
                                                getOptionLabel={(lessons) => lessons.title}
                                                className = {classes.dropdowns}                                    
                                                debug                                            
                                                renderInput={(params) => <TextField variant = 'outlined' margin='dense' {...params} label="درس"    
                                                />}
                                            />                                                                            
                                    </Grid>
                                    <Grid item xs={4}>                                        
                                            <TextField className = {classes.dropdowns} variant = 'outlined' margin ='dense' label="فصل"/>                                        
                                    </Grid>   
                                </Grid>                             
                            </Paper>
                            <Paper className={classes.dropdownpaper}>                                    
                                <Grid container spacing = {3}>
                                    <Grid item xs={4}>                                                                            
                                            <Autocomplete                                                
                                                options={questionTypes}
                                                getOptionLabel={(questionTypes) => questionTypes.title}
                                                className = {classes.dropdowns}                                    
                                                debug                                                
                                                renderInput={(params) => <TextField margin='dense' variant="outlined" {...params} label="نوع سوال"    
                                                onChange = {(e)=> setQuestionType(valuetext(e.target.value))}
                                                />}
                                            />                                                                            
                                    </Grid>

                                    <Grid item xs={6}>                                        
                                            <Typography id="discrete-slider" gutterBottom style = {{fontFamily: 'Vazir'}} >
                                                درجه سختی سوال :  {valuetext(difficulty)}
                                            </Typography>
                                            <ThemeProvider theme = {theme}>
                                                <Slider
                                                    dir = "rtl"
                                                    defaultValue={1}
                                                    getAriaValueText={valuetext}
                                                    aria-labelledby="discrete-slider"
                                                    // valueLabelDisplay="auto"     
                                                    onChange ={(e)=>setDifficulty(e.target.value)}                                       
                                                    step={1}
                                                    color = "secondary"
                                                    marks
                                                    style={{color:'#3D5A80'}}
                                                    min={1}
                                                    max={3}
                                                />                             
                                            </ThemeProvider>           
                                    </Grid>                         
                                    <Grid item xs = {2}>
                                        <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                                        <label htmlFor="icon-button-file">
                                            <IconButton aria-label="upload picture" component="span">
                                            <PhotoLibraryIcon style={{color:'#EE6C4D'}} />
                                            </IconButton>
                                        </label>    
                                    </Grid>       
                                </Grid>
                            </Paper>
                            <Grid container spacing = {3}>
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
                                            questionType === 'testi' ?
                                                <FormControl component="fieldset">                                                    
                                                    <RadioGroup aria-label="gender"  className = {classes.RadioChoice} name="gender1" onChange={(e) => setTestAnswer(e.target.value)}>
                                                        <form class ="form-inline">
                                                            <FormControlLabel value="g1" control={<Radio />} /> <TextField variant="filled" margin='dense' />
                                                        </form>       

                                                        <form class ="form-inline">
                                                            <FormControlLabel value="g2" control={<Radio />} /> <TextField variant="filled" margin='dense' />
                                                        </form>       

                                                        <form class ="form-inline">
                                                            <FormControlLabel value="g3" control={<Radio />} /> <TextField variant="filled" margin='dense' />
                                                        </form>       

                                                        <form class ="form-inline">
                                                            <FormControlLabel value="g4" control={<Radio />} /> <TextField variant="filled" margin='dense' />
                                                        </form>                                                        
                                                    </RadioGroup>
                                                </FormControl>
                                            :
                                                <FormGroup>
                                                    <form class="form-inline">
                                                        <Checkbox checked={choice1} onChange={()=>(setChoice1(!choice1))} name="gilad" 
                                                            className ={classes.multiCheckbox} color='#3D5A80' /> 
                                                            <TextField variant="filled" margin='dense' />
                                                    </form>
                                                    
                                                    <form class="form-inline">
                                                        <Checkbox checked={choice2} onChange={()=>(setChoice2(!choice2))} name="gilad" 
                                                            className ={classes.multiCheckbox} color='#3D5A80' /> 
                                                            <TextField variant="filled" margin='dense' />
                                                    </form>

                                                    <form class="form-inline">
                                                        <Checkbox checked={choice3} onChange={()=>(setChoice3(!choice3))} name="gilad" 
                                                            className ={classes.multiCheckbox} color='#3D5A80' /> 
                                                            <TextField variant="filled" margin='dense' />
                                                    </form>

                                                    <form class="form-inline">
                                                        <Checkbox checked={choice4} onChange={()=>(setChoice4(!choice4))} name="gilad" 
                                                            className ={classes.multiCheckbox} color='#3D5A80' /> 
                                                            <TextField variant="filled" margin='dense' />
                                                    </form>                                                    
                                                </FormGroup>

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
                                            className ={classes.checkbox} color='#EE6C4D' />}
                                        label="سوالم برای بقیه کاربران در دسترس باشد."
                                        style = {{fontFamily: 'Vazir' , color : 'white'}}
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

function AddQuestion (){

}
