import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import React, { Component } from "react";
import Material_RTL from "./Material_RTL";
import axios from 'axios';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import InputAdornment from "@material-ui/core/InputAdornment";
import { AccountCircle, Visibility, VisibilityOff, login } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import LoadingButton from '@material-ui/lab/LoadingButton';
import RTL from './M_RTL';
import Vazir from '../fonts/Vazir.ttf';

class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            password: '',
            username: '',
        }

    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleClickShowPassword = () => {
        this.setState({
            ...this.state,
            showPassword: !this.state.showPassword,
        });
    };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    render() {
        const classes = this.props.classes;
        const [pending, setPending] = this.props.p;
        const handleClick = e => {
            setPending(true);
            e.preventDefault();
            axios.post("http://parham-backend.herokuapp.com/user/login", this.state)
                .then(result => {
                    console.log(result);
                    console.log("good");
                    const token = "Bearer" + result.data.token;
                    localStorage.setItem('token', token);
                    localStorage.getItem('token');
                }).catch(error => {
                    console.log(error);
                    alert(" خطا! نام کاربری یا رمز عبور شما اشتباه می باشد.لطفا تمام موارد * دار را پر کنید.");
                    setPending(false); 
                    console.log("bad");

                })
        }
        return (
            <Container component="main" maxWidth="xs"                 
                className={classes.container}>
                <CssBaseline />
                <div className={classes.foo}>
                    <div className={classes.paper}>
                       <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" style={{fontFamily: 'Vazir'}}>
                            {'ورود'}
                        </Typography>
                        <Material_RTL>
                            <RTL>

                                <ValidatorForm className={classes.form} noValidate style={{fontFamily: 'Vazir'}}>
                                    <Grid container spacing={2} component="h6">
                                        <Grid item xs={12} style={{fontFamily: 'Vazir'}}>
                                            <TextValidator
                                            style={{fontFamily: 'Vazir'}}
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="username"
                                                label="نام کاربری"
                                                name="username"
                                                autoComplete="username"
                                                autoFocus
                                                value={this.state.username}
                                                onChange={this.handleChange}
                                                InputLabelProps={{style:{fontFamily: 'Vazir'}}}
                                                validators={['required', 'minStringLength:' + 6, 'matchRegexp:^[a-zA-Z0-9_]*$']}
                                                errorMessages={['لطفا نام کاربری خود را وارد کنید', 'طول نام کاربری باید بیشتر از 6 باشد', 'a-z 0-9_ لطفا از حروف مجاز استفاده کنید']}
                                                InputProps={{
                                                    style:{fontFamily: 'Vazir'},
                                                    endAdornment: (
                                                        <InputAdornment position="start">
                                                            <AccountCircle />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextValidator
                                            style={{fontFamily: 'Vazir'}}
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                name="password"
                                                label="رمز عبور"
                                                type={this.state.showPassword ? 'text' : 'password'}
                                                id="password"
                                                autoComplete="current-password"
                                                value={this.state.password}
                                                onChange={this.handleChange}
                                                InputLabelProps={{style:{fontFamily: 'Vazir'}}}
                                                validators={['required', 'minStringLength:' + 8]}
                                                errorMessages={['لطفا رمز عبور خود را وارد کنید', 'رمز عبور باید بیشتر از 8 حرف باشد']}
                                                errorStyle={{style:{color: 'red',fontFamily: 'Vazir'}}}
                                                errorText={{style:{color: 'red',fontFamily: 'Vazir'}}}
                                                InputProps={{
                                                    style:{fontFamily: 'Vazir'},
                                                    endAdornment: (
                                                        <InputAdornment position="start">
                                                            <IconButton
                                                                style={{ padding: '0px',color:'black' }}
                                                                aria-label="toggle password visibility"
                                                                onClick={this.handleClickShowPassword}
                                                                onMouseDown={this.handleMouseDownPassword}
                                                            >
                                                                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                                            </IconButton>
                                                        </InputAdornment>)
                                                }}
                                            /></Grid>
                                    </Grid>
                                    <br/>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Grid classes={classes.root} >
                                            <LoadingButton onClick={handleClick} pendingPosition="center" className={classes.topButton} pending={pending} variant="contained"  style={{fontFamily: 'Vazir'}} fullWidth>
                                            ورود
                                            </LoadingButton>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    
                                    <br/>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Grid>
                                            <Link to="/signUp" style={{color: 'white',textDecoration : 'none',fontFamily: 'Vazir'}}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                fullWidth
                                                style={{backgroundColor : '#0e918c',fontFamily: 'Vazir'}}
                                                startIcon={<Icon>person_add</Icon>}
                                            >
                                                
                                                    {"ثبت نام"}
                                                 </Button></Link>
                                        </Grid></Grid>
                                    </Grid>
                                </ValidatorForm>
                            </RTL>
                        </Material_RTL>
                    </div>
                </div>
            </Container>
        )
    };
}

const useStyles = makeStyles((theme) => ({
    container :{        
    },
    switch: {
        display: 'block',
    },
    paper: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'black',
        backgroundColor: '#f5f5f5',
        padding: '20px',
        borderRadius: '10px',
        opacity: '95%'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.main,
        color: 'black',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
        color: 'black',
    },
    topButton :{
        backgroundColor : '#EE6C4D' , 
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        color: 'white',
    },

}));

export default () => {
    const classes = useStyles();
    const p = React.useState(false);
    return (
        <SignIn classes={classes} p={p} />
    )
}