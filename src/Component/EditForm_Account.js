import React , {Component} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton' ;
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel' ;
import InputAdornment from '@material-ui/core/InputAdornment' ;
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button'
import updateUser from './../Request methods/UpdateUser' ;
import axios from 'axios' ;
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems : 'center' ,
      },
    root: {
    display: 'flex',
    flexWrap: 'wrap',
      },
    margin: {
    margin: theme.spacing(1),
      },
    withoutLabel: {
    marginTop: theme.spacing(3),
      },
      SaveChangesButton: {         
        backgroundColor : '#EE6C4D' ,      
        border: 0,
        // borderRadius: 18 ,
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

function EditProfileValidationForms_Account (props){
  
    const classes = useStyles();

    const [values , setValues] =  React.useState({
        password : '' ,
        showPassword : false ,
        confirmPassword : '' ,
        showConfirmedPassword : false         
    });

    const handleChange = (props) => (event) => {
        setValues({...values , [props]: event.target.value})
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    } ;

    return (
        <div className={classes.container} class="containers" >                        

            <div class ="row" > <br/><br/> </div>

            <div class = "row">

                <div class="col">
                    <InputLabel htmlFor="standard-adornment-password">تکرار رمز عبور جدید </InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"  
                            onClick={handleClickShowPassword}                      
                            onMouseDown={handleMouseDownPassword}
                            >
                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        }
                    />
                </div>

                <div class="col">
                    <InputLabel htmlFor="standard-adornment-password">رمز عبور جدید</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type={values.showConfirmedPassword ? 'text' : 'password'}
                        value={values.confirmPassword}
                        onChange={handleChange('password')}
                        defaultValue = {props.password}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"  
                            onClick={handleClickShowPassword}                      
                            onMouseDown={handleMouseDownPassword}
                            >
                            {values.showConfirmedPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        }
                    />
                </div>

            </div>         
                          
            <div class="row"><br/><br/></div>
            
            <div class = "row">
                <div class ="col">
                    <Button className={classes.SaveChangesButton}
                            style={{fontFamily: 'Vazir'}} square>
                    <span class="material-icons">
                    done
                    </span>
                    اعمال تغییرات 
                    </Button>
                </div>
            </div>   

        </div> 
    );
}

export default class passwordForms extends Component {
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
                password : res.data.user.password ,
                userFound : true
                }
            })
        })
        .catch(err => {
    
        });  
    }

    render(){
        if(this.state.userFound == true){
            return(
              <EditProfileValidationForms_Account
                password = {this.state.password}
                />
            );
          } else
          {
            return (
                <CircularProgress />            
            );
          }
    }
}