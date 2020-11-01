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
      // background: 'linear-gradient(-90deg, rgba(48,191,227,0.9559174011401436) 0%, rgba(78,168,222,0.9391106784510679) 100%)',
      // backgroundColor : '#3D5A80' ,      
      backgroundColor : '#3D5A80' ,      
      border: 0,
      borderRadius: 24,
      boxShadow: '0 3px 5px 2px rgba(140, 140, 140, .5)',
      color: 'white',
      height: 48,
      width : 48 , 
      padding: '0 30px',
      "&:hover": {
        backgroundColor: '#00C853'
      },
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

    const handleChange = (event) => {
      setValues({
        ...values,
        [event.target.name]: event.target.value,
      });
    };
    
    const [selectedDate , setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));  
    
    // const []

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

    const classes = useStyles();

    return (
      <div>
        
        <div class="row" >
          <Image  className="avatarimage-Editpage"
            height = "80" width = "80"
            // src='data:image/png;base64,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'
            src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAh1BMVEXVgaGkS3P///+gRm/TfZ7Xg6PTf5/Te52eRG2iSHHUep3ZhqWqUnn/+/3YfaDUfZ7HcpTMeJmuV321X4Pek6/ai6n32+X41uLeiqr87/Tts8jzx9f30N7nqcDjorrjqr/65+7Aao3knLfqvMz+9fn23ubjk7Hvu8+7Zon46O3us8nntcfehai7RIR+AAANUklEQVR4nOWda3fquA6GTRI7JIFwv7XABkqBUv7/7ztOoFwTXyQ5YdZ5v+yZWbPaPFu2ZMuyzDzn2s6+J5+//5ab4WjEGWN8NBpulv9+Pyffs637X88c/uz2z+RrsWOnNA47QRAIdpOQ/94J4/TEdouvyU/b4Ve4IpxN9sNTHIbinqtIQoRhfBruJzNHX+KCcDZfTOO4o2N74OzE8XQxd0FJTdgeH3dxGFjA3RSE8e44ph6xpITtySKNAxvbvdgyiNPFhBSSkHCc4SHorqaUkGO6z6IiXH2cgGOzEDI8fayIvoyEsD3ZkVjvATLe0YxWAsLtfhpi5l6ZRDjdE6wI0ISzY9pxgHdWmB7RAQRJOFuk1MPzmXGBZEQRzhbk0+9VQYxjRBBuj47td2VMj4j5CCf8cjj/ntVJvyonnEzDyvgyhdNJpYQ/m9hFfFBJxJuf6gj3adV8OWO6r4hwVfEAvSmcApZy9oQflQ/Qm0T84ZxwtavLgGeFO1szWhJ+1jID7yXST4eE7WW9BjwrXFrtOWwIV9Nq1jA6BVYOx4JwTjFCuRT6h4h07oLwGCPRkoSLXiaR/SOOMz6SE7Y3mCnIE9E99KOmn6vpR/1DVyQYyHBjOhkNCbeIKciT4NDyo6hxryjyW4cAARlMDfcbZoSrE3gKct6VeI0iScgufLSKk5m/MSIcg30M5+uGX4h3lt9YgxlFapRzNCGcgH1M0lXy5YZsdBPoj49NdlQGhPMU+AGc9XV8uR37AmpGk6ihJ/yEAiZdE76cEWxGgyWclvATOkSTgSmgRBxAEWMtoo4QOkQ5bxU70GJFLajD0Q5UDeEECsisADOHw6CIGnejJhxD5yCzwjsLjKgOGkrCFdiLtgCEDbBHVYZ+FeEWupJJLIfoWVEL6G7ESbWAUxC2p1DAAQRQIkI9qpgqluEKwg1wsc2N4+Cz/C5woAYbCOERvF2CAkpE6K8My/eLpYRzcKTvw8Zorj448peGxTJCuBvtwU2IGKflDrWEEOxlgIHiJvBeqszblBAuoSdncDdzMeIaithZ2hCCl9uM4yyIMGLZIryQ8Ae8WMOaEDMTWVp4/FZIuANnZZI+2obQlY2cijtTwg944lBgTSiNCM/qhUUnUwWEK3jql68RsfCi6ABPMcYFIaOAEBwosiU3GhAzTGXIMCHcI5LbHD9IEUs3qfD1IPyFEO5HseuZP0Vwb1rkT18IN4gDJoppiJuITGx0hPDsb0YI3Bg+Cbz8zvSSJX4mRLgZ6Wgo+KQwhC/r0yfCL9QxdkIxDaWrwRCy8EtFuEW4GSneJCFsoj6CpVsF4RF5UE9EiDtNDz7KCWc4E7KAiBD595zOSgkXyB9NROj3cIf8waKMcIarRZB+7D1syOJZCSHWhGTzEPsdD0a8I8TOQjpfiq64uZ+Jd4R4EyYkSxpkPMx0b0RGaEKazVMDt6Y5686IN8I9vjD9HdalZ3X2r4TtE/rHvsPe4k+n9gshalPxR0iyP8SGw1y3LcaVcEhRGkuzxycAZGL4TIhIP92JIJmIytPc6ZqU+iP8JbkAQ5JrA+f1H9T5fSLEh4pcFPlSokry9JFwQlTATTBMCWJFrnDyQLgk+ovDe1PEucWjxOKesE00SCmWNUQmlMO0fUdINUgJzg+pTHgdpmfCJd01A6QRW2SALFjeCOkGKfocn2I986fzMM0JxyTh/iJovVCmiMqR5orHV8IP0rswHEFIaMG/pFtOCD/zLRLvQbf6hG4m0/lMOCNEZ6CelBxgUzE6UI5RdslIZYRz6htpsLIo2kmYKZxfCPEJmmfZlUBfAAkDxUV5uiYjHNHfmrRHdADIxOhMSD0Nc9kiugA8T0RGuWS7l81lhGwOugDMF24MV5qgUHIwDxpNai96UVa4wIgyNAVKepHZSI2inhvAPFvDSNKIxeLcaKT6A4KLsyU6tSXhjwtHc1HSa+kY/ZYrA2aKfyShG0dzEU+6Ska/1UVdltVJuhrmfbltM8OTXr/0Dmm/55SPsc6XJFy47pLAE9bt+4+UUeT7/TVzzCddzVIS0m4sisWTpLcetBp+M5PfaA3WvcQ5Hsu3F8yrqBcSzy/ky9+Z81L0HTCTx5AlNO+udMsIDkbfWemMfTsMh2+g+Js5DYf1K5ywz+q6rtWhziejOVZ7W3V+2b/36KrjSsE/RnXq9KYSS4ap6/4PSGzYsO5vcKwhG9X9CY41+j8grGoFXJcq48u3Fvme4voPVf1q15JAnAW99WHQb7XO58Pyz/7gsO4KuY/6j4Nmhuod+i25oX9JLGa7/KjVP3SZa3O6+uk8S14MWn5JjuaWq/Fbgy5zZ0vuxpfyvEdb0/ToImq21oEjSCfRIsNrGOP9QTYOuC58JRrRr2kULeg0kKgGdWUaEq9LeSIOhqcVRfIzQ1J+T7Yupdxb8KQ3AJnv3pAD0iyx3FsQ7g+z7DYK72LIfkBnR7k/JNvjJ6JPc6Gk0WgOyIKY3OMT5Wk4H1Dx5YwHIp/T+STKtSVdhH8pUhTBG0beK5yQ5Eu50B4T2gvRMPJO8TdFzjshuUjyqmhNcT0If25h2MMTIr+P9jjpFn32JGegI74GyWxEnx8mpC70Vcg6lPz8EHMGbNnDEyJ438+ccIk7x+dBwzVg1vcT4VPzc3x4QOQup+A9I7z4O6/FANfTmPcJxgreZzivp4HWRCXrqgCzLm5AxLwmCljXlqzdOtFHNWGI57o2WG0itJa7WsRLbSLE1VQ5RM8CDdRLfSmgRphXDgjrqHipEbav88b3DgQhWt/G+Kvztq7Vp7myDUC0jYvXWn3r+xbVBPpXRZbfeb1vYTkRqfpdAWR5zft6Z8ZuImLupmFl1w/7du/J6u5aHW70JiuHend3zeL+YV1e5ooYmCPe3T+0uEOK76KLlMXdmrs7pOb3gOuchGeZT8X7e8DGC7e6x2gm46j4cJfbdJjWGCjuZGjEh/v4hj0V+KHuMZrJsEPPY08Fw2FK1HEOK7Oug099MYx6m5B0n6GQ0XXap94mJv1p6tlRFMlkl/HSn8agx9B7uJlcBuvTlx5D+mxNvcu1R+mN+NonSt/rq/bVzIN0hAW9vtpTnQnfIVL8SWvE6Wu/Nl12/71MqDNi59ZM2LRv4vs40rM0Rizsm6hO11A1fSST0p0W975UG/ENltyP8ntmJjTtQVv/rulZql1UWQ9aZUbq3UyobK9Y2ke43Ijwpjru1CzdJ5b3glbMxP/UKFX081bMxHcLh4qAqOrJruirz4P3mol++eG+sq++4m2E9wr5ioCvfhtB9d5a1WeiKvnlVTYvj+lYvFGCevaPVKqeWdo3SlTvzLyPtykPhfp3ZlRvBXHxHkaMFCVEBm8FqTqXv0NCWJ0SNnnvSfmYzjsgqgDN3uzyVFXD9ccM5cbQ8N015dt5dSMqAU3fzlM/+lQvohIwMH7/UP2QbJ2I6txF8XOygHdI63M36oM1m3dINW/J8l49cVFdZ2r3lqzmPWAuKqgNfuFT1wrbvgesedOZ88rXqFFfXe9t+6az9l3uqncait1ELvt3ubVvq1dXA50DauqgIW+ry12GukCjkkL9s6KGpoom2JRjKAh1r48btrbES9scs9TLaAi97UlzpmjcoRQjfXdTcdoqKFSEGofKyO9VFqmp725a6kb1hN5YW8CQ9JzOxqih726ajpUMakJvokXk3GHc8A0uy6bPiRk7Qm+uL0PhwtEFRKNbpGlpIDQkVC/CLzJopgvgM2q/W7LctiH0Pg2KiXjSbdAy+g2j9rupFtCA0GSgnhsG07nVpmF7Ye0QNSM0fHRO0TDYTubthV+yv1BCGTTMShe5GKAHq98YCLNbo0ITJmwIvZVudXOD7PYR65wo6hs3cBEnZaC3JPS2U9M6aZ6INbg/zdq8CU8wVS3V7Am99sb8Yk0G+dzeWkvn9y3w5HZpo1hsgwjlftHmZk3W3vqgbYN1pWsdLJtfx+X7QTihjBpWd9yyRm1ZE++onDNvaDZY92zbtgmTKAEg9FbGk/FGKRV014N+K+e5SjK3+oN1N8j/D8ufGkzNfIw9oddegu5987OYCHpnBeL63wCKl6ZT0J4wW8Jhekzwpz8hEgYLNQyht9rV2x073NmMUAih533E9fXlFXHR6RI1oXQ4dZkxtHIxcELP26NmI1QifT3CdkXo/WwqH6oi3rwUITgklDuqiodqODXZKVESZkO1un71nfRL/0HkhN72mFbTsT5Ij4b7CGJCz5stYveMQbyY6T/FEWHG6NiOYYrjQxNKxqPD+dhJj0g+AkI5H/fT0EXsEOF0j5h/hIRyzzHZkU/IIN5NrPYQZSIhlFp9nEI6yCA8fQAWaIWiIpQaL1ISyEB6F6M8oZkICbPRukjjADMnRRCnC5rR+SdSQqn2+GMXhzDKIIx3H2NSPI+eMNNsvpjGcceGUnTieLqYo0NDgVwQZppN9sMkDEOh4xQiDONkuJ+4oMvkijBTezX5Wuw6aRqHnSB4YBUiCDphnKad3eJr8kM9Mu/lkvCi7ex7/vn7b7kZjkZZDoqPRsPN8t/v5/x7RhDRdfofpE4TM6LL2akAAAAASUVORK5CYII='
            
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
                        label="نام کابری"
                        id="user-name"
                        defaultValue={props.username}
                        className={classes.textField}   
                        variant="outlined"                 
                        margin ="dense"              
                        />
                </div>

                <div class="col">
                    <TextField        
                        label="E-MAIL"
                        id="email"
                        defaultValue={props.email}
                        variant="outlined"
                        className={classes.textField}                    
                        margin ="dense"              
                        /> 
                </div>

            </div>

        <div class="row"><br/></div>

        <div dir="rtl" class = "row" >
          <div class = "col">
            <TextField        
              label="نام"            
              id="first-name"
              defaultValue={props.firstname}
              className={classes.textField}     
              variant="outlined"       
              // variant="filled"
              margin ="dense"              
            /> 
          </div>           
          <div class = "col">
            <TextField
              label="نام خانوادگی"            
              id="last-name"
              defaultValue= {props.lastname}
              className={classes.textField}      
              variant="outlined"      
              // variant="filled"
              margin ="dense"
            /> 
          </div>           
        </div>        
        
        <div class="row"><br/></div>
        
        <div class ="row">                                     
          <div class="col">                                
            <TextField
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
          <div class="col">
            <InputLabel htmlFor="formatted-text-mask-input">تلفن همراه</InputLabel>
            <Input
              value={values.textmask}
              onChange={handleChange}
              name="textmask"              
              id="formatted-text-mask-input"
              inputComponent={TextMaskCustom}
              variant="outlined"
            />          
          </div>          
        </div>        
              
        <div class="row"><br/><br/></div>
        
        <div class = "row">
          <div class ="col">
            <Button className={classes.SaveChangesButton} onClick={()=>{            
              const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjljMGI3ODU2YzBkYTAwMTc3YWQzMGMiLCJpYXQiOjE2MDQwNjIwNzJ9.kiXC8E1w7OicGXlOCGrpH9eptALM8DUjcfY6U7ZmUe0';                            
              axios.put('https://parham-backend.herokuapp.com/user/update' 
              , {headers:
                  { 'Authorization': 'Bearer ' + token  } 
              }
              , {                  
                // firstname : "mohammdpedram" ,
                lastname : "isazadeh" ,
                // email : "kpm@yaoo.com"   
              })
              .then(res => {
                  console.log('done');
                  return(
                      <AlertDialog />
                  )
              });            
            } }>
            <span class="material-icons">
            done
            </span>
              </Button>
          </div>
        </div>
      </div>
    );  
}

export default class PersonalForms extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      userFound : false
    };

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjljMGI3ODU2YzBkYTAwMTc3YWQzMGMiLCJpYXQiOjE2MDQwNjIwNzJ9.kiXC8E1w7OicGXlOCGrpH9eptALM8DUjcfY6U7ZmUe0';
    //localStorage.getItem('token');    

    axios.get(
        'https://parham-backend.herokuapp.com/user' , {headers:
      { 'Authorization': ' Bearer ' + token  }
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

            <div class="col" ></div>
            <div class="col" >
              <CircularProgress />                                  
            </div>
            <div class="col" ></div>

          </div>
        </div>
      );
    } 

  }
}