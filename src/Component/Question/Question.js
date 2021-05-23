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
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import axios from 'axios' ;
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import LoadingButton from '@material-ui/lab/LoadingButton';
import FormControl from '@material-ui/core/FormControl';
import { createMuiTheme } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import UploadImage from './uploadImage';
import { connect } from 'react-redux' ;
import { 
    question , 
    answer ,
    base , 
    type , 
    hardness , 
    course , 
    chapter ,
    addOption ,     
    setPublic ,
    removeOption ,
    editOption ,
    MultiChoiseCheck ,
    addAnswer , 
    cancelEdit ,
    addAnswerField
  } from './QuestionsSlice' ;

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
  '@global':{
        '.MuiInputLabel-filled.MuiInputLabel-shrink.MuiInputLabel-marginDense' : {
        display: 'block',
        fontFamily: 'Vazir',
      },
      '.MuiInputLabel-filled.MuiInputLabel-marginDense': {
        display: 'block',
        fontFamily: 'Vazir',
      },
      '.MuiAutocomplete-option': {
        display: 'block',
        fontFamily: 'Vazir',
        textAlign: 'right',
        direction: 'rtl',
      },
      '.MuiAutocomplete-inputRoot[class*="MuiFilledInput-root"][class*="MuiFilledInput-marginDense"] .MuiAutocomplete-input': {
        display: 'block',
        fontFamily: 'Vazir',
      },
      '.MuiFormControlLabel-label': {
        display: 'block',
        fontFamily: 'Vazir',
      },
      //فونت گزینه ها
      '.MuiFilledInput-root': {
        fontFamily: 'Vazir',
      },
    },
  RadioChoice :{
    
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

function Question(props) {

    const classes = useStyles();

    const [publicCheck , setpublicCheck ] = React.useState(props.question.public);    
    
    const [AddQuestionPending , setAddQuestionPending] = React.useState(false);    

    const [error , setError] = React.useState(false);
    const [errorMessage , setErrorMessage] = React.useState([]);

    const AddQuestion = () => {

        console.log(props.questionOptions);

        const answers = [] ;

        if(props.question.type == 'MULTICHOISE'){
            for (let index = 0; index < props.options.length; index++) {
                const element = props.options[index];
                if(element.answer == true)
                    answers.push({"answer" : index + 1 });
            }
        }
        else 
            answers.push(...props.question.answers) ;  
        
        const a = {
            "type":          props.question.type ,
            "public":        props.question.public,            
            "question":      props.question.question,
            "answers":       answers ,
            "options":       props.question.options ,             
            "base": ""+      props.question.base + "",
            "hardness":      props.question.hardness,
            "course":        props.question.course , 
            "chapter" :      props.question.chapter,
            "imageQuestion": props.question.imageQuestion,
            "imageAnswer":   props.question.imageAnswer,
        }        

        const ajson = JSON.stringify(a);        
        console.log(ajson);        

        axios.post(serverURL() + "question" , ajson , tokenConfig() )
        .then(res => {
            console.log(res);                        
            setAddQuestionPending(false);
            props.onRefresh() ;
            props.cancelEdit();    
        })
        .catch(e => {
            setError(true);
            setAddQuestionPending(false);
            try{
               setErrorMessage(e.response.data.error) 
            } catch (err){

            }            
            console.log(e.response);
        });
    }

    const EditQuestion = () => {      
        
            const answers = [] ;

            if(props.question.type == 'MULTICHOISE'){
                for (let index = 0; index < props.options.length; index++) {
                    const element = props.options[index];
                    if(element.answer == true)
                        answers.push({"answer" : index + 1 });
                }
            }
            else 
                answers.push(...props.question.answers) ;  
        
            const a = {
                "type":          props.question.type ,
                "public":        props.question.public,            
                "question":      props.question.question,
                "answers":       answers ,
                "options":       props.question.options ,             
                "base": ""+      props.question.base + "",
                "hardness":      props.question.hardness,
                "course":        props.question.course , 
                "chapter" :      props.question.chapter,
                "imageQuestion": props.question.imageQuestion,
                "imageAnswer":   props.question.imageAnswer,
                "questionId" : props.question.id
            } 

            const ajson = JSON.stringify(a);            
            console.log(ajson);
            axios.put(serverURL() + "question" , ajson , tokenConfig() )
            .then(res => {
                console.log(res);  
                setAddQuestionPending(false);  
                props.onRefresh() ;    
                props.cancelEdit();    
                // setQuestionAdded(true);
            })
            .catch(e => {
                console.log(e);
            });
    }    

    if(props.index > -1 && props.question.type == 'MULTICHOISE')
    {
        for (let index = 0; index < props.question.options.length; index++) {
            const element = props.question.options[index];
            // props.addAnswerField({})
        }
    }
            
    return (
        <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg" className = {classes.root}>            
            <Material_RTL>
                <RTL>
                    <Grid item xs={12} >
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
                                    setAddQuestionPending(false)
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

                        <Paper style={{backgroundColor : props.backColor}} className = {classes.FormsPaper} >
                            <Grid container spacing={0}>  
                                {props.index >= 0 &&
                                <Grid item xs={12}>
                                    <Button variant="contained"  
                                    style={{backgroundColor : '#E63946' , marginBottom : '16px'}}                                      
                                        onClick={() => {                                                                                                                             
                                            props.cancelEdit();
                                        }} 
                                        className={classes.Button}>
                                            <Typography variant='button' style = {{fontFamily: 'Vazir'}} >                                            
                                                    لغو ویرایش         
                                            </Typography>
                                    </Button>                                    
                                </Grid>          
                                }                    
                                <Grid item xs={12}>
                                    <Paper className={classes.questionFacePaper}>
                                        <TextField                    
                                            id="outlined-multiline-static"
                                            label="صورت سوال"
                                            multiline
                                            defaultValue = {props.question.question}                                            
                                            rows={4}
                                            onChange={(e) =>{props.setQuestion(e.target.value)} }
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

                                <UploadImage id="soal" />                                   

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
                                                value = {props.question.base}
                                                // defaultValue={props.question.base}
                                                variant = "filled"                                                    
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                margin = "dense"
                                                style={{
                                                    style:{fontFamily: 'Vazir'},
                                                }}
                                                onChange ={(e)=>{                                                    
                                                    props.setBase(e.target.value);                                                                                                           
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
                                                value = {props.question.course}
                                                variant = "filled"                                                    
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                margin = "dense"
                                                style={{
                                                    style:{fontFamily: 'Vazir'},
                                                }}
                                                onChange ={(e)=>{                                                    
                                                    props.setCourse(e.target.value);                                                                                                            
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
                                                value = {props.question.chapter}
                                                variant = "filled"                                                    
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                margin = "dense"
                                                style={{
                                                    style:{fontFamily: 'Vazir'},
                                                }}
                                                onChange ={(e)=>{                                                    
                                                    props.setChapter(e.target.value);                                                                                                            
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
                                                value = {props.question.type}                                                
                                                variant = "filled"                                                    
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                margin = "dense"
                                                style={{ fontFamily: 'Vazir', width : '200px' }}
                                                onChange ={(e)=>{                                                    
                                                    props.setType(e.target.value);
                                                    if(e.target.value == 'TEST')                                                                                                            
                                                    {
                                                        props.addOption(); props.addOption(); props.addOption(); props.addOption();
                                                    }
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
                                                درجه سختی سوال :  {valuetext(props.question.hardness)}
                                            </Typography>
                                            <ThemeProvider theme = {theme}>
                                                <Slider
                                                    dir = "rtl"                                                    
                                                    value={props.question.hardness === "LOW" ? 1 :
                                                    props.question.hardness === "MEDIUM" ? 2 :
                                                    props.question.hardness === "HARD" && 3}                                                    
                                                    getAriaValueText={valuetext}
                                                    aria-labelledby="discrete-slider"
                                                    InputLabelProps={{style:{fontFamily: 'Vazir'}}}
                                                    InputProps={{
                                                        style:{fontFamily: 'Vazir'},
                                                    }}
                                                    // valueLabelDisplay="auto"     
                                                    onChange ={(e)=>{
                                                        if(e.target.value==1) props.setHardness("LOW");
                                                        if(e.target.value==2) props.setHardness("MEDIUM");
                                                        if(e.target.value==3) props.setHardness("HARD");
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
                                            props.question.type === 'MULTICHOISE' ?
                                            <Grid container spacing={2} >                                                
                                                <Grid item xs={7}>                                                                                                            
                                                    <FormGroup>          
                                                        {props.question.options.map((m , index) =>                                            
                                                        <div>
                                                            <IconButton onClick={()=>{
                                                                props.removeOption(index)
                                                            }}>
                                                                <CloseIcon />
                                                            </IconButton>                                                               
                                                            {/* <form class="form-inline">                                                                                                                         */}
                                                                <Checkbox checked={props.options[index].answer} onChange={()=>(props.MultiChoiseCheck({"index": index , "answer": !props.options[index].answer}))} name="gilad" 
                                                                    className ={classes.multiCheckbox} color='#3D5A80' /> 
                                                                <TextField variant="filled"  value={m.option} onChange={(e) => {
                                                                    props.editOption({"option" : e.target.value , "index" : index});                                                                
                                                                }} margin='dense' />                                                            

                                                            {/* </form>                             */}
                                                            
                                                        </div>                            
                                                        )}
                                                    </FormGroup>                                                                                         
                                                </Grid> 
                                                <Grid item xs={6}></Grid>
                                                <Grid item xs={6} >
                                                    <Button variant="contained" onClick={() => {
                                                        props.addOption();
                                                    }} style = {{fontFamily: 'Vazir'}} >
                                                        گزینه جدید
                                                    </Button>  
                                                </Grid>                                              
                                            </Grid>
                                            :                                          
                                            props.question.type === 'TEST' ?
                                                <FormControl component="fieldset">                                                    
                                                    <RadioGroup aria-label="gender"  className = {classes.RadioChoice} name="gender1" onChange={(e) => {                                                                                                             
                                                        props.setAnswer([{"answer" : parseInt(e.target.value)}]);                                                        
                                                        }} value={props.question.answers.length > 0 && props.question.answers[0].answer}>
                                                        <Grid container >
                                                            <Grid item xs={6}>
                                                                <form class ="form-inline">
                                                                    <FormControlLabel value={1} control={<Radio />} /> <TextField onChange={(e) => {                                                                        
                                                                        props.editOption({ "option" : e.target.value , "index" : 0}) ; 
                                                                    }} variant="filled" value={props.question.options[0].option} margin='dense' />
                                                                </form>       
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <form class ="form-inline">
                                                                    <FormControlLabel value={2} control={<Radio />} /> <TextField onChange={(e) => {                                                                        
                                                                        props.editOption({ "option" : e.target.value , "index" : 1}) ; 
                                                                    }} variant="filled" value={props.question.options[1].option} margin='dense' />
                                                                </form>       
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <form class ="form-inline">
                                                                    <FormControlLabel value={3} control={<Radio />} /> <TextField onChange={(e) => {                                                                        
                                                                        props.editOption({ "option" : e.target.value , "index" : 2}) ; 
                                                                    }} variant="filled" value={props.question.options[2].option} margin='dense' />
                                                                </form>       
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <form class ="form-inline">
                                                                    <FormControlLabel value={4} control={<Radio />} /> <TextField onChange={(e) => {                                                                        
                                                                        props.editOption({ "option" : e.target.value , "index" : 3}) ; 
                                                                    }} variant="filled" value={props.question.options[3].option} margin='dense' />
                                                                </form>          
                                                            </Grid>                                                            
                                                        </Grid>                                              
                                                    </RadioGroup>
                                                </FormControl>
                                            :
                                            <div>
                                                <TextField                                                                    
                                                    id="outlined-multiline-static"
                                                    label="جواب"
                                                    multiline
                                                    rows={4}
                                                    fullWidth = 'true'
                                                    defaultValue={props.index < 0 ? null : props.question.answers[0].answer}
                                                    className = {classes.BigForm}
                                                    onChange = {(e)=>{props.setAnswer([ {"answer" : e.target.value}])}}
                                                    InputLabelProps={{style:{fontFamily: 'Vazir'}}}
                                                    InputProps={{
                                                        style:{fontFamily: 'Vazir'},
                                                    }}

                                                    // defaultValue="Default Value"
                                                    variant="outlined"
                                                    /> 
                                                <UploadImage id = "javab" />
                                            </div>

                                        }                                                                           
                                    </Paper>
                                </Grid>                                

                                <Grid item xs={4}>                                    
                                    <LoadingButton variant="contained"
                                     pending={AddQuestionPending}
                                     onClick={() => {                                                                                 
                                        setAddQuestionPending(true)                                        

                                        if(props.index != -1)
                                            EditQuestion();
                                        else
                                            AddQuestion()
                                }} 
                                    className={classes.Button}>
                                        <Typography variant='button' style = {{fontFamily: 'Vazir'}} >                                            
                                                {props.index == -1 ?
                                                <p>طرح </p>
                                                :
                                                <p>ویرایش  </p>
                                                }                                                
                                        </Typography>
                                    </LoadingButton>                                    
                                </Grid>
                                <Grid item xs={8} className = {classes.grid} >                                    
                                    <FormControlLabel                                        
                                        control={<Checkbox checked={props.question.public} onChange={()=> {
                                            props.setPublic(!publicCheck);
                                            setpublicCheck(!publicCheck);                                                    
                                        }}
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
                    </Paper>
                    </RTL>
                </Material_RTL>                
            </Container>
        </React.Fragment>
    );  
}


const mapStateToProps = (state) => {
    return{
      index : state.edittingQuestion.edittingQuestionIndex  , 
      question : state.edittingQuestion.edittedQuestion ,
      options : state.edittingQuestion.options       
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setQuestion: (e) => dispatch(question (e))
        ,setAnswer: (e) => dispatch(answer(e))
        ,setBase: (e) => dispatch(base (e))
        ,setType: (e) => dispatch(type (e))
        ,setHardness: (e) => dispatch(hardness (e))
        ,setCourse: (e) => dispatch(course (e))
        ,setChapter: (e) => dispatch(chapter(e))
        ,addOption: () => dispatch(addOption())
        ,setPublic: (e) => dispatch(setPublic(e))
        ,editOption: (e) => dispatch(editOption(e))
        ,removeOption: (e) => dispatch(removeOption(e))
        ,MultiChoiseCheck : (e) => dispatch(MultiChoiseCheck(e))
        ,addAnswer : (e) => dispatch(addAnswer(e))
        ,cancelEdit : () => dispatch(cancelEdit())
        ,addAnswerField : (e) => dispatch(addAnswerField(e))
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(Question)