import React , {Component} from 'react';
import 'semantic-ui-css/semantic.min.css'
import TextField from '@material-ui/core/TextField';
import {   
  fade , 
  ThemeProvider ,
  makeStyles ,
  createMuiTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import axios from 'axios' ;
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';

import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import {Image} from 'semantic-ui-react';
import './../App.css' ;
import AlertDialog from './../Request methods/UpdateUser';
import { CircularProgress } from '@material-ui/core';
import Material_RTL from './Material_RTL';
import RTL from './M_RTL';
import { EditorDragHandle } from 'material-ui/svg-icons';

const useStyles = makeStyles((theme) => ({
    progressBar : {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
      alignItems : 'center' , 
      justifyContent : 'center' ,
      width : '100%' ,
      height : '100%'
    },
    margin: {
        margin: theme.spacing(1),
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems : 'center' ,
      justifyItems : 'center' , 
    },
    textField: {      
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
      // borderColor : 'green', //'#737373'
    },
    input: {
      display: 'none',      
      margin: theme.spacing(1),
    },        
    paper: {
      alignItems : 'center' ,
    },
    progressbarContainer : {
      alignItems : 'center' , 
    },
    SaveChangesButton: {         
      backgroundColor : '#EE6C4D' ,      
      border: 0,
      borderRadius: 18 ,
      boxShadow: '0 3px 5px 2px rgba(140, 140, 140, .5)',
      color: 'white',
      height: 48,      
      padding: '0 30px',
      "&:hover": {
        backgroundColor: '#00C853'
      },
      alignItems : "center" ,
    },    
}));

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['0','9',/\d/,/\d/,/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

function EditProfileValidationForms_Personal (props) {    

    const [values, setValues] = React.useState({
      textmask: '09         ',      
    });

    const [username , setUsername] = React.useState(props.username) ;
    const [firstname , setFirstname] = React.useState(props.firstname) ;
    const [lastname , setLastname] = React.useState(props.lastname) ;
    const [email , setEmail] = React.useState(props.email) ;

    const handleUsernameChanged = e =>{
      setUsername(e.target.value)
    };
    const handleFirstnameChanged = e =>{
      setFirstname(e.target.value)
    };
    const handleLastnameChanged = e =>{
      setLastname(e.target.value)
    };
    const handleEmailChanged = e =>{
      setEmail(e.target.value)
    };

    const handleChange = (event) => {
      setValues({
        ...values,
        [event.target.name]: event.target.value,
      });
    };
    
    const [selectedDate , setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));    

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

    const classes = useStyles();

    return (
      <div>        
        <Material_RTL>
          <RTL>                
            <div class="row" >          
              <Image  className="avatarimage-Editpage"
                height = "80" width = "80"                
                src = 'data:image/png;base64,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'              
                circular />
            </div>
            <div class="row" className={classes.paper}>
              <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
              <label htmlFor="icon-button-file">
                <IconButton color="default" aria-label="upload picture" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
            </div>

            <div class = "row">
                    
                    <div class="col">
                        <TextField   
                            style={{fontFamily: 'Vazir'}}     
                            label="نام کابری"
                            id="user-name"
                            defaultValue={props.username}
                            className={classes.textField}   
                            variant="outlined"                 
                            margin ="dense"           
                            onChange ={handleUsernameChanged}   
                            />
                    </div>

                    <div class="col">
                        <TextField 
                            style={{fontFamily: 'Vazir'}}      
                            label="E-MAIL"
                            id="email"
                            defaultValue={props.email}
                            variant="outlined"
                            className={classes.textField}                    
                            margin ="dense"          
                            onChange = {handleEmailChanged}    
                            /> 
                    </div>

                </div>

            <div class="row"><br/></div>
            <div dir="rtl" class = "row" >
              <div class = "col">
                <TextField 
                  style={{fontFamily: 'Vazir'}}       
                  label="نام"            
                  id="first-name"
                  defaultValue={props.firstname}
                  className={classes.textField}     
                  variant="outlined"       
                  // variant="filled"
                  margin ="dense"              
                  onChange = {handleFirstnameChanged}
                /> 
              </div>           
              <div class = "col">
                <TextField
                  style={{fontFamily: 'Vazir'}}
                  label="نام خانوادگی"            
                  id="last-name"
                  defaultValue= {props.lastname}
                  className={classes.textField}      
                  variant="outlined"      
                  // variant="filled"
                  margin ="dense"
                  onChange ={handleLastnameChanged}
                /> 
              </div>           
            </div>        
            
            <div class="row"><br/></div>
            
            <div class ="row">                                     
              <div class="col">                                
                <TextField
                style={{fontFamily: 'Vazir'}}
                  id="date"
                  label="تاریخ تولد "
                  type="date"
                  // variant="filled"
                  defaultValue="2017-05-24"
                  className={classes.textField}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />  
              </div>
              {/* <div class="col">
                <InputLabel htmlFor="formatted-text-mask-input">تلفن همراه</InputLabel>
                <Input
                  value={values.textmask}
                  style={{fontFamily: 'Vazir'}}
                  onChange={handleChange}
                  name="textmask"              
                  id="formatted-text-mask-input"
                  inputComponent={TextMaskCustom}
                  variant="outlined"
                />          
              </div>           */}
            </div>        
                  
            <div class="row"><br/><br/></div>
            
            <div class = "row">
              <div class ="col">
                <Button 
                  style={{fontFamily: 'Vazir'}}
                  className={classes.SaveChangesButton} onClick={()=>{     
                     
                  const token = localStorage.getItem('token');
                  console.log(token)
                  axios.put('https://parham-backend.herokuapp.com/user' 
                  , {headers:
                      { 'Authorization': token  } 
                  }
                  , {                  
                    // firstname : "mohammdpedram" ,
                    "lastname" : "isazadeh"
                    // email : "kpm@yaoo.com"   
                  })
                  .then(res => {                      
                      console.log(res.data.message);
                      console.log("done");
                      return(
                          <AlertDialog />
                      )
                  });            
                } }>
                
                  <span class="material-icons">
                    done
                  </span>
                  اعمال تغییرات 
                  
                </Button>
              </div>              
            </div>
          </RTL>
        </Material_RTL>

      </div>
    );  
}

export default class PersonalForms extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      userFound : false
    };
    
    const token = localStorage.getItem('token');    

    axios.get(
        'https://parham-backend.herokuapp.com/user' , {headers:
      { 'Authorization': token  }
    })
    .then(res => {        
        this.setState(prevState => {
          return{
            firstname : res.data.user.firstname ,
            lastname : res.data.user.lastname ,
            username : res.data.user.username ,
            email : res.data.user.email ,          
            userFound : true
          }
        })
    })  
    .catch(err => {
        console.log(err)
    });     
  }

  render(){  

    if(this.state.userFound == true){
      return(
        <EditProfileValidationForms_Personal
          firstname = {this.state.firstname}
          lastname = {this.state.lastname}
          email = {this.state.email}
          username = {this.state.username}
          />
      );
    } else
    {
      return (
        <div className = {useStyles.progressbarContainer}>
          <div class="row">

            <div class="col-sm-4" ></div>
            <div class="col-sm-4" >
              <CircularProgress />                                  
            </div>
            <div class="col-sm-4" ></div>

          </div>
        </div>
      );
    } 

  }
}