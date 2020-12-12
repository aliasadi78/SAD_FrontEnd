import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LightenDarkenColor } from 'lighten-darken-color'; 
import Paper from '@material-ui/core/Paper';
import tokenConfig from '../../utils/tokenConfig';
import serverURL from '../../utils/serverURL';
import Material_RTL from "../Material_RTL";
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import RTL from '../M_RTL';
import Grid from '@material-ui/core/Grid';
import AlertDialog from '../Dialog' ;
import InputLabel from '@material-ui/core/InputLabel';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import {useDispatch} from 'react-redux';
import axios from 'axios' ;
import {
    addQuestion
} from './ExamSlice' ;
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import { createMuiTheme } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import UploadImage from '../Question/uploadImage';
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
    
    
  root: {
    flexGrow: 1,
    backgroundColor : 'white' ,
    // marginTop : theme.spacing(5) ,
    width : '100%'
  },
  
  questionFacePaper: {
    padding: theme.spacing(1),    
    marginBottom : theme.spacing(0) ,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius : '0px' ,
  },
  paper: {
    padding: theme.spacing(1),    
    marginBottom : theme.spacing(0) ,
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
  expandGrid : {
      margin : theme.spacing(0) ,
      padding : theme.spacing(0)
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
  formControl : {
      margin : theme.spacing(1) ,             
      minWidth : 120
  },
  checkbox : {
      color : '#EE6C4D' ,            
  },
  multiCheckbox : {
    color : '#3D5A80' ,            
  },
  FormsPaper :{
    padding : theme.spacing(2), 
  },
}));

function valuetext(value) {
    if(value=="LOW")
        return 'آسان';
    else if (value=="MEDIUM")
        return 'متوسط' ;
    else
        return 'سخت' ;;    
  }   

function AddQuestionExam(props) {

    // const index = useSelector(state =>state.edittingQuestion.edittingQuestionIndex);    

    const classes = useStyles();

    const [soalImageBase64 , setSoalImageBase64] = React.useState(null);
    const [javabImageBase64 , setJavabImageBase64] = React.useState(null);

    const [publicCheck , setpublicCheck ] = React.useState(false);
    const [difficulty , setDifficulty] = React.useState("LOW");
    const [questionType , setQuestionType] = React.useState(null);
    const [questionAdded , setQuestionAdded] = React.useState(false);
    
    const [choice1 , setChoice1] = React.useState(false);
    const [choice2 , setChoice2] = React.useState(false);
    const [choice3 , setChoice3] = React.useState(false);
    const [choice4 , setChoice4] = React.useState(false);    

    const [gozine1 , setGozine1] = React.useState("");
    const [gozine2 , setGozine2] = React.useState("");
    const [gozine3 , setGozine3] = React.useState("");
    const [gozine4 , setGozine4] = React.useState("");  
    
    const [options , setOptions] = React.useState([]);

    const dispatch = useDispatch();
    const [addToMyQuestions , setAddToMyQuestions] = React.useState(false);

    const [question , setQuestion] = React.useState(null);
    const [grade , setGrade] = React.useState('');
    const [lesson , setLesson] = React.useState(null);
    const [ session , setSession] = React.useState(null);            

    const [multitestOptions , setMultitestOptions] = React.useState([{ "option" : "" , "answer" : "" }])

    const [answers , setAnswers] = React.useState([]);

    const handleChange = () => {
        setpublicCheck(!publicCheck);        
    };    

    const handleChangeAddToMyQuestion = () => {
        setAddToMyQuestions(!addToMyQuestions);        
    };    
    const AddQuestion = (type , publicCheck , question , 
    answer , options , base , hardness , course , chapter , soalImage , javabImage ) => {

        console.log(options);

        const a = {
            "type": type ,
            "public": publicCheck,            
            "question": question,
            "answers": answers ,
            "options": options,
            "base": "" +  base + "",
            "hardness":  hardness,
            "course": course , 
            "chapter" : chapter,
            "imageQuestion": soalImage,
            "imageAnswer": javabImage,
        }
        const ajson = JSON.stringify(a);
        
        dispatch(addQuestion(a));
        
        axios.post(serverURL() + "question" , ajson , tokenConfig() )
        .then(res => {
            console.log(res);            
            setQuestionAdded(true);
        })
        .catch(e => {
            console.log(e);
        });
    }
    return (
        <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg" className = {classes.root}>            
            <Material_RTL>
                <RTL>
                        <Paper style={{backgroundColor : props.backColor}} className = {classes.FormsPaper} >
                            <Grid container spacing={0}>                                
                                <Grid item xs={12}>
                                    <Paper className={classes.questionFacePaper}>
                                        <TextField                    
                                            id="outlined-multiline-static"
                                            label="صورت سوال"
                                            multiline
                                            defaultValue = {props.index < 0 ? question : props.questions[0].question}                                            
                                            rows={4}
                                            onChange={(e) =>{setQuestion(e.target.value)} }
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

                                <UploadImage 
                                getImage={(value)=>{
                                    setSoalImageBase64(value)
                                }}
                                id="soal" />                                   

                            </Grid>                                                                                
                                <Grid container spacing={3} >                 

                                    <Grid item xs={4}>                                            
                                        <FormControl className={classes.formControl}>
                                            <InputLabel 
                                            id="demo-simple-select-label"
                                            style={{fontFamily: 'Vazir'}}                                                
                                            >
                                                پایه
                                            </InputLabel> 
                                            <Select
                                                value = {grade}
                                                defaultValue={props.index >= 0 && props.questions[0].base}
                                                variant = "filled"                                                    
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                margin = "dense"
                                                style={{
                                                    style:{fontFamily: 'Vazir'},
                                                }}
                                                onChange ={(e)=>{                                                    
                                                    setGrade(e.target.value);                                                                                                           
                                                }}
                                                    >
                                                {props.grades.map( ([key , value]) =>
                                                    <MenuItem value={key} style={{fontFamily: 'Vazir'}}> {value} </MenuItem>      
                                                )}                                                    
                                            </Select>                                  
                                        </FormControl>
                                    </Grid>         

                                    <Grid item xs={4}>                                            
                                        <FormControl className={classes.formControl}>
                                            <InputLabel 
                                            id="demo-simple-select-label"
                                            style={{fontFamily: 'Vazir'}}                                                
                                            >
                                                درس
                                            </InputLabel> 
                                            <Select
                                                value = {lesson}
                                                variant = "filled"                                                    
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                margin = "dense"
                                                style={{
                                                    style:{fontFamily: 'Vazir'},
                                                }}
                                                onChange ={(e)=>{                                                    
                                                    setLesson(e.target.value);                                                                                                            
                                                }}
                                                    >
                                                {props.courses.map( ([key , value]) =>
                                                    <MenuItem value={key} style={{fontFamily: 'Vazir'}}> {value} </MenuItem>      
                                                )}                                                    
                                            </Select>                                  
                                        </FormControl>
                                    </Grid>                                                                 

                                    <Grid item xs={4}>                                            
                                        <FormControl className={classes.formControl}>
                                            <InputLabel 
                                            id="demo-simple-select-label"
                                            style={{fontFamily: 'Vazir'}}                                                
                                            >
                                                فصل
                                            </InputLabel> 
                                            <Select
                                                value = {session}
                                                variant = "filled"                                                    
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                margin = "dense"
                                                style={{
                                                    style:{fontFamily: 'Vazir'},
                                                }}
                                                onChange ={(e)=>{                                                    
                                                    setSession(e.target.value);                                                                                                            
                                                }}
                                                    >
                                                {props.chapters.map( ([key , value]) =>
                                                    <MenuItem value={key} style={{fontFamily: 'Vazir'}}> {value} </MenuItem>      
                                                )}                                                    
                                            </Select>                                  
                                        </FormControl>
                                    </Grid>         

                                    <Grid item xs={6}>                                            
                                        <FormControl className={classes.formControl}>
                                            <InputLabel 
                                            id="demo-simple-select-label"
                                            style={{fontFamily: 'Vazir'}}                                                
                                            >
                                                نوع سوال
                                            </InputLabel> 
                                            <Select
                                                value = {questionType}
                                                variant = "filled"                                                    
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                margin = "dense"
                                                style={{
                                                    style:{fontFamily: 'Vazir'},
                                                }}
                                                onChange ={(e)=>{                                                    
                                                    setQuestionType(e.target.value);                                                                                                            
                                                }}
                                                    >
                                                {props.types.map( ([key , value]) =>
                                                    <MenuItem value={key} style={{fontFamily: 'Vazir'}}> {value} </MenuItem>      
                                                )}                                                    
                                            </Select>                                  
                                        </FormControl>
                                    </Grid>                                         

                                    <Grid item xs={5}>                                        
                                            <Typography id="discrete-slider" gutterBottom style = {{fontFamily: 'Vazir'}} >
                                                درجه سختی سوال :  {valuetext(difficulty)}
                                            </Typography>
                                            <ThemeProvider theme = {theme}>
                                                <Slider
                                                    dir = "rtl"
                                                    defaultValue={1}
                                                    getAriaValueText={valuetext}
                                                    aria-labelledby="discrete-slider"
                                                    InputLabelProps={{style:{fontFamily: 'Vazir'}}}
                                                    InputProps={{
                                                        style:{fontFamily: 'Vazir'},
                                                    }}
                                                    // valueLabelDisplay="auto"     
                                                    onChange ={(e)=>{
                                                        if(e.target.value==1)
                                                            setDifficulty("LOW");
                                                        if(e.target.value==2)
                                                            setDifficulty("MEDIUM");
                                                        if(e.target.value==3)
                                                            setDifficulty("HARD");
                                                    }}                                       
                                                    step={1}
                                                    color = "secondary"
                                                    marks
                                                    style={{color:'#3D5A80'}}
                                                    min={1}
                                                    max={3}
                                                />                             
                                            </ThemeProvider>           
                                    </Grid>   
                                    
                                     <Grid item xs={1} ></Grid>
                                </Grid>                            
                            <Grid container spacing = {3}>
                                <Grid item xs={12}>     
                                    <Paper className={classes.paper}>
                                        {
                                            questionType === 'MULTICHOISE' ?
                                            <Grid container spacing={2} >                                                
                                                <Grid item xs={6}>                                                                                                            
                                                    <FormGroup>                                                        
                                                        <form class="form-inline">
                                                            <Checkbox checked={choice1} onChange={()=>(setChoice1(!choice1))} name="gilad" 
                                                                className ={classes.multiCheckbox} color='#3D5A80' /> 
                                                                <TextField variant="filled" onChange={(e) => {
                                                                    setGozine1(e.target.value);                                                                
                                                                }} margin='dense' />
                                                        </form>                                                        
                                                    </FormGroup>                                                                                         
                                                </Grid> 
                                                <Grid item xs={6}></Grid>
                                                <Grid item xs={6} >
                                                    <Button variant="contained" style = {{fontFamily: 'Vazir'}} >
                                                        گزینه جدید
                                                    </Button>  
                                                </Grid>                                              
                                            </Grid>
                                            :                                          
                                            questionType === 'TEST' ?
                                                <FormControl component="fieldset">                                                    
                                                    <RadioGroup aria-label="gender"  className = {classes.RadioChoice} name="gender1" onChange={(e) => {
                                                        console.log(e.target.value)                                                        
                                                        setAnswers([{"answer" : e.target.value}])}
                                                        }>
                                                        <Grid container >
                                                            <Grid item xs={6}>
                                                                <form class ="form-inline">
                                                                    <FormControlLabel value="1" control={<Radio />} /> <TextField onChange={(e) => {
                                                                        setGozine1(e.target.value);
                                                                    }} variant="filled" margin='dense' />
                                                                </form>       
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <form class ="form-inline">
                                                                    <FormControlLabel value="2" control={<Radio />} /> <TextField onChange={(e) => {
                                                                        setGozine2(e.target.value);
                                                                    }} variant="filled" margin='dense' />
                                                                </form>       
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <form class ="form-inline">
                                                                    <FormControlLabel value="3" control={<Radio />} /> <TextField onChange={(e) => {
                                                                        setGozine3(e.target.value);
                                                                    }} variant="filled" margin='dense' />
                                                                </form>       
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <form class ="form-inline">
                                                                    <FormControlLabel value="4" control={<Radio />} /> <TextField onChange={(e) => {
                                                                        setGozine4(e.target.value);
                                                                    }} variant="filled" margin='dense' />
                                                                </form>          
                                                            </Grid>                                                            
                                                        </Grid>                                              
                                                    </RadioGroup>
                                                </FormControl>
                                            :
                                            <TextField                                                                    
                                                id="outlined-multiline-static"
                                                label="جواب"
                                                multiline
                                                rows={4}
                                                fullWidth = 'true'
                                                className = {classes.BigForm}
                                                onChange = {(e)=>{setAnswers([ {"answer" : e.target.value}])}}
                                                InputLabelProps={{style:{fontFamily: 'Vazir'}}}
                                                InputProps={{
                                                    style:{fontFamily: 'Vazir'},
                                                }}

                                                // defaultValue="Default Value"
                                                variant="outlined"
                                                /> 

                                        }                                                                           
                                    </Paper>
                                </Grid>
                                {/* //  upload image */}                                  
                                
                                <UploadImage
                                getImage={(value)=>{
                                    setJavabImageBase64(value)
                                }}
                                 id = "javab" />
                                                                
                                <Grid item xs={4}>                                    
                                    <Button variant="contained"
                                     onClick={() => {                                                                                                                                                                 
                                        AddQuestion(                                            
                                        questionType , publicCheck , question ,
                                        answers , [
                                            { "option" : gozine1 } ,
                                            { "option" : gozine2 } , 
                                            { "option" : gozine3 } , 
                                            { "option" : gozine4 } ] , grade , difficulty , lesson , session
                                        , soalImageBase64 , javabImageBase64 );
                                    }} 
                                    className={classes.Button}>
                                        <Typography variant='button' style = {{fontFamily: 'Vazir'}} >                                            
                                                اضافه
                                        </Typography>
                                    </Button>                                    
                                </Grid>

                                <Grid item xs={7} className = {classes.grid} >                                    
                                    <FormControlLabel                                        
                                        control={<Checkbox checked={publicCheck} onChange={handleChange}
                                            className ={classes.checkbox} color='#EE6C4D' />}
                                        label="سوالم برای بقیه کاربران در دسترس باشد."
                                        style = {{fontFamily: 'Vazir' , color : 'black'}}
                                        LabelProps={{style:{fontFamily: 'Vazir'}}}
                                        InputProps={{
                                            style:{fontFamily: 'Vazir'},
                                        }}
                                    />                                    
                                </Grid>                                                                

                            </Grid>
                            { questionAdded == true ?
                                <AlertDialog text = "سوال شما اضافه شد." />
                                :   
                                <p></p>
                            }                        
                    </Paper>
                    </RTL>
                </Material_RTL>                
            </Container>
        </React.Fragment>
    );  
}


const mapStateToProps = state => {
    return{
      index : state.edittingQuestion.edittingQuestionIndex  
    }
}

export default connect(mapStateToProps)(AddQuestionExam)