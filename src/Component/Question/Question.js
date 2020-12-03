import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { LightenDarkenColor } from 'lighten-darken-color'; 
import Paper from '@material-ui/core/Paper';
import tokenConfig from '../../utils/tokenConfig';
import serverURL from '../../utils/serverURL';
import Material_RTL from "../Material_RTL";
import Typography from '@material-ui/core/Typography';
import RTL from '../M_RTL';
import Grid from '@material-ui/core/Grid';
import AlertDialog from '../Dialog' ;
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import axios from 'axios' ;
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import { createMuiTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import FormGroup from '@material-ui/core/FormGroup';
import { Dialog } from '@material-ui/core';

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

function TestAnswerToSend( choice1 , choice2 , choice3 , choice4 ){

}

function valuetext(value) {
    if(value=="LOW")
        return 'آسان';
    else if (value=="MEDIUM")
        return 'متوسط' ;
    else
        return 'سخت' ;;    
  }   

export default function Question(props) {
    const classes = useStyles();

    const [isEditting, setIsEditting] = React.useState(false);

    const [soalImageBase64 , setSoalImageBase64] = React.useState("");
    const [isSoalImage , setIsSoalImage] = React.useState(false);
    const [javabImageBase64 , setJavabImageBase64] = React.useState("");
    const [isJavabImage , setIsJavabImage] = React.useState(false);  
    
    const [grades , setGrades] = React.useState([]);

    axios.get(serverURL() + "public/question/category" , tokenConfig())
    .then(res => {
        setGrades([...res.data.base]);
        console.log(res.data);
    })
    .catch(err=>{
        console.log(err);
    });

    // const grades = [
    //     { title: 'دوازدهم' , code : 12},
    //      { title: 'یازدهم' , code : 11},
    //         { title: 'دهم' , code : 10},            
    // ];

    const lessons = [
        { title: 'ریاضی' , code : "MATH"},        
        { title: 'زیست' , code : "BIOLOGY"},        
        { title: 'فیزیک' , code :"PHYSICS" },        
        {title:   'شیمی' , code : "CHEMISTRY"},        
    ];

    const questionTypes = [
        {title:'تشریحی' , code : "LONGANSWER"} , 
        {title:'تستی'   , code : "TEST"} , 
        {title:'چندگزینه ای'  , code : "MULTICHOISE"} ,            
    ];    

    const [publicCheck , setpublicCheck ] = React.useState(false);
    const [difficulty , setDifficulty] = React.useState("LOW");
    const [questionType , setQuestionType] = React.useState('LONGANSWER');
    const [questionAdded , setQuestionAdded] = React.useState(false);
    
    const [choice1 , setChoice1] = React.useState(false);
    const [choice2 , setChoice2] = React.useState(false);
    const [choice3 , setChoice3] = React.useState(false);
    const [choice4 , setChoice4] = React.useState(false);    

    const [gozine1 , setGozine1] = React.useState("");
    const [gozine2 , setGozine2] = React.useState("");
    const [gozine3 , setGozine3] = React.useState("");
    const [gozine4 , setGozine4] = React.useState("");

    const [TestAnswer , setTestAnswer] = React.useState(null);    
    
    const [question , setQuestion] = React.useState(null);
    const [grade , setGrade] = React.useState(null);
    const [lesson , setLesson] = React.useState(null);
    const [ session , setSession] = React.useState(null);    
    const [ answer , setAnswer] = React.useState(null);    

    const [answers , setAnswers] = React.useState([]);

    const handleChange = () => {
        setpublicCheck(!publicCheck);        
      };    

    // if(props.isEditting == true){
    //     setpublicCheck(props.question.) ;
    //     setQuestion (props.question.) ;
    //     setGrade (props.question.) ;
    //     setLesson (props.question.) ;
    //     setDifficulty (props.question.) ;
    //     setQuestionType (props.question.) ;
    // }

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
        // console.log(ajson);
        console.log("add question");
        console.log(ajson);
        axios.post(serverURL() + "question" , ajson , tokenConfig() )
        .then(res => {
            console.log(res);            
            setQuestionAdded(true);
        })
        .catch(e => {
            console.log(e);
        });
    }

    const EditQuestion = (type , publicCheck , question , 
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
            // console.log(ajson);
            console.log("add question");
            console.log(ajson);
            axios.put(serverURL() + "question" , ajson , tokenConfig() )
            .then(res => {
                console.log(res);            
                // setQuestionAdded(true);
            })
            .catch(e => {
                console.log(e);
            });
    }

    const uploadSoalImage = async (e) => {
        const file = e.target.files[0];  
        const base64 = await convertBase64(file); 

        setSoalImageBase64(base64);
        setIsSoalImage(true);
        console.log(btoa(base64));
    // console.log(base64);
    }

    const uploadJavabImage = async (e) => {
        console.log(344354);
        const file = e.target.files[0];  
        console.log("234234");
        const base64 = await convertBase64(file); 
        console.log("234234");
        setJavabImageBase64(base64);
        console.log(isJavabImage);
        setIsJavabImage(true);
        console.log(isJavabImage);
    // console.log(base64);
    }
  
    const convertBase64 = (file) => {
        return new Promise((resolve , reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
  
            fileReader.onload = () => {
              resolve(fileReader.result);
            };
  
            fileReader.onerror = (err) => {
                reject(err);
            };
        })
      }

    // console.log(props.questionIndex);
    if(props.questionIndex != -1)
    {
        setIsEditting(true);
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
                                            rows={4}
                                            onChange={(e) =>{setQuestion(e.target.value)} }
                                            fullWidth = 'true'
                                            className = {classes.BigForm}
                                            // defaultValue="Default Value"
                                            variant="outlined"
                                            InputLabelProps={{style:{fontFamily: 'Vazir'}}}
                                            InputProps={{
                                                style:{fontFamily: 'Vazir'},
                                            }}
                                        />
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    <input accept="image/*" className={classes.input} id="icon-button" name="soal" type="file" 
                                        onChange={(e) => {
                                            uploadSoalImage(e);
                                        }}/>
                                    <label htmlFor="icon-button">
                                        <IconButton aria-label="upload picture" component="span">
                                        <PhotoLibraryIcon style={{color:'#EE6C4D'}} />
                                        </IconButton>
                                    </label>    
                                </Grid>
                                {isSoalImage == true &&
                                <Grid item xs={12}>
                                  <img src={soalImageBase64} 
                                //   onClick={handleClickOpenImage} 
                                width="50%" height="80%" style={{cursor: 'pointer' , margin : '2px'}}/>  
                                <IconButton onClick={()=>{
                                    setSoalImageBase64(null);
                                    setIsSoalImage(false);
                                }}>
                                    <CloseIcon style={{color : '#EE6C4D'}} />
                                </IconButton>
                                </Grid>
                                }                             
                            </Grid>                                                                                
                                <Grid container spacing={3} >                 

                                    <Grid item xs={4}>
                                            <Autocomplete
                                                id="پایه"
                                                options={grades}
                                                getOptionLabel={(option) => option.title}
                                                getOptionSelected ={(option , value) => option.title === value.title}
                                                className = {classes.dropdowns}                                    
                                                debug
                                                InputLabelProps={{style:{fontFamily: 'Vazir'}}}
                                                InputProps={{
                                                    style:{fontFamily: 'Vazir'},
                                                }}   
                                                style={{fontFamily: 'Vazir'}}          
                                                onChange ={(e , newValue)=>{                                                    
                                                    setGrade(newValue.code);                                                    
                                                }}
                                                renderInput={(params) => <TextField  variant = 'filled' margin ='dense' style={{fontFamily: 'Vazir'}} InputLabelProps={{style:{fontFamily: 'Vazir'}}}
                                                InputProps={{
                                                    style:{fontFamily: 'Vazir'},
                                                }}  {...params} label="پایه"    
                                                />}
                                            />                                        
                                    </Grid>
                                    <Grid item xs={4}>                                        
                                            <Autocomplete
                                                id="درس"
                                                options={lessons}
                                                getOptionLabel={(lessons) => lessons.title}
                                                getOptionSelected ={(option , value) => option.title === value.title}
                                                className = {classes.dropdowns}                                    
                                                debug                                   
                                                onChange = {(e , newValue)=>{                                                    
                                                    setLesson(newValue.code);
                                                }}
                                                InputLabelProps={{style:{fontFamily: 'Vazir'}}}
                                                InputProps={{
                                                    style:{fontFamily: 'Vazir'},
                                                }}
                                                renderInput={(params) => <TextField variant = 'filled' margin='dense' {...params} label="درس"    
                                                />}
                                            />                                                                            
                                    </Grid>
                                    <Grid item xs={4}>                                        
                                            <TextField className = {classes.dropdowns} onChange={(e) => {
                                                setSession(e.target.value);
                                            }} variant = 'filled' margin ='dense' label="فصل" 
                                            InputLabelProps={{style:{fontFamily: 'Vazir'}}}
                                            InputProps={{
                                                style:{fontFamily: 'Vazir'},
                                            }}
                                            style={{fontFamily: 'Vazir'}} />    
                                                                                
                                    </Grid>   
                                </Grid>                                                         
                                <Grid container spacing = {3}>
                                    <Grid item xs={6}>                                                                            
                                            <Autocomplete                                                
                                                options={questionTypes}
                                                getOptionLabel={(questionTypes) => questionTypes.title}
                                                getOptionSelected ={(option , value) => option.title === value.title}
                                                className = {classes.dropdowns}                                    
                                                debug                                                
                                                onChange = {(e, newValue)=> {                                                    
                                                    console.log(newValue);                                                                                                        
                                                    setQuestionType(newValue.code);
                                                }}
                                                InputLabelProps={{style:{fontFamily: 'Vazir'}}}
                                                InputProps={{
                                                    style:{fontFamily: 'Vazir'},
                                                }}
                                                renderInput={(params) => <TextField margin='dense' variant="filled" {...params} label="نوع سوال" />}
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
                                            questionType === 'LONGANSWER' ?
                                                <TextField                                                                    
                                                id="outlined-multiline-static"
                                                label="جواب"
                                                multiline
                                                rows={4}
                                                fullWidth = 'true'
                                                className = {classes.BigForm}
                                                onChange = {(e)=>{setAnswer(e.target.value)}}
                                                InputLabelProps={{style:{fontFamily: 'Vazir'}}}
                                                InputProps={{
                                                    style:{fontFamily: 'Vazir'},
                                                }}

                                                // defaultValue="Default Value"
                                                variant="outlined"
                                                />   
                                            :                                          
                                            questionType === 'TEST' ?
                                                <FormControl component="fieldset">                                                    
                                                    <RadioGroup aria-label="gender"  className = {classes.RadioChoice} name="gender1" onChange={(e) => {
                                                        console.log(e.target.value)                                                        
                                                        setTestAnswer(e.target.value)}
                                                        }>
                                                        <Grid container >
                                                            <Grid item xs={6}>
                                                                <form class ="form-inline">
                                                                    <FormControlLabel value="g1" control={<Radio />} /> <TextField onChange={(e) => {
                                                                        setGozine1(e.target.value);
                                                                    }} variant="filled" margin='dense' />
                                                                </form>       
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <form class ="form-inline">
                                                                    <FormControlLabel value="g2" control={<Radio />} /> <TextField onChange={(e) => {
                                                                        setGozine2(e.target.value);
                                                                    }} variant="filled" margin='dense' />
                                                                </form>       
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <form class ="form-inline">
                                                                    <FormControlLabel value="g3" control={<Radio />} /> <TextField onChange={(e) => {
                                                                        setGozine3(e.target.value);
                                                                    }} variant="filled" margin='dense' />
                                                                </form>       
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <form class ="form-inline">
                                                                    <FormControlLabel value="g4" control={<Radio />} /> <TextField onChange={(e) => {
                                                                        setGozine4(e.target.value);
                                                                    }} variant="filled" margin='dense' />
                                                                </form>          
                                                            </Grid>
                                                        </Grid>                                              
                                                    </RadioGroup>
                                                </FormControl>
                                            :
                                                <FormGroup>
                                                    <form class="form-inline">
                                                        <Checkbox checked={choice1} onChange={()=>(setChoice1(!choice1))} name="gilad" 
                                                            className ={classes.multiCheckbox} color='#3D5A80' /> 
                                                            <TextField variant="filled" onChange={(e) => {
                                                                setGozine1(e.target.value);
                                                            }} margin='dense' />
                                                    </form>
                                                    
                                                    <form class="form-inline">
                                                        <Checkbox checked={choice2} onChange={()=>(setChoice2(!choice2))} name="gilad" 
                                                            className ={classes.multiCheckbox} color='#3D5A80' /> 
                                                            <TextField onChange={(e) => {
                                                                setGozine2(e.target.value);
                                                            }} variant="filled" margin='dense' />
                                                    </form>

                                                    <form class="form-inline">
                                                        <Checkbox checked={choice3} onChange={()=>(setChoice3(!choice3))} name="gilad" 
                                                            className ={classes.multiCheckbox} color='#3D5A80' /> 
                                                            <TextField onChange={(e) => {
                                                                setGozine3(e.target.value);
                                                            }} variant="filled" margin='dense' />
                                                    </form>

                                                    <form class="form-inline">
                                                        <Checkbox checked={choice4} onChange={()=>(setChoice4(!choice4))} name="gilad" 
                                                            className ={classes.multiCheckbox} color='#3D5A80' /> 
                                                            <TextField onChange={(e) => {
                                                                setGozine4(e.target.value);                                                                
                                                            }}
                                                            variant="filled" margin='dense' />
                                                    </form>                                                    
                                                </FormGroup>

                                        }                                                                           
                                    </Paper>
                                </Grid>

                                <Grid item xs={12}>
                                    <input accept="image/*" name="javab" className={classes.input} id="javab" type="file" 
                                        onChange={(e) => {
                                            uploadJavabImage(e);
                                        }}/>
                                    <label htmlFor="javab">
                                        <IconButton aria-label="upload picture" component="span">
                                        <PhotoLibraryIcon style={{color:'#EE6C4D'}} />
                                        </IconButton>
                                    </label>    
                                </Grid>
                                {isJavabImage == true &&
                                    <Grid item xs={12}>
                                    <img src={javabImageBase64} 
                                    //   onClick={handleClickOpenImage} 
                                    width="50%" height="80%" style={{cursor: 'pointer' , margin : '2px'}}/>  
                                    <IconButton onClick={()=>{
                                        setJavabImageBase64(null);
                                        setIsJavabImage(false);
                                    }}>
                                        <CloseIcon style={{color:'#EE6C4D'}} />
                                    </IconButton>
                                    </Grid>
                                }      

                                <Grid item xs={4}>                                    
                                    <Button variant="contained"
                                     onClick={() => {AddQuestion(                                            
                                        questionType , publicCheck , question ,
                                        answer , [
                                            { "option" : gozine1 } ,
                                            { "option" : gozine2 } , 
                                            { "option" : gozine3 } , 
                                            { "option" : gozine4 } ] , grade , difficulty , lesson , session
                                        , soalImageBase64 , javabImageBase64
                                    )}} 
                                    className={classes.Button} href="#contained-buttons">
                                        <Typography variant='button' style = {{fontFamily: 'Vazir'}} >
                                            {isEditting == true ?
                                                "ویرایش "
                                            :
                                                "طرح"
                                            }
                                        </Typography>
                                    </Button>                                    
                                </Grid>
                                <Grid item xs={8} className = {classes.grid} >                                    
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
