import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RTL from "./rtl";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import cors from 'cors';
import propType from 'prop-types';
class SignUp extends Component{
    constructor() {
        super();
        this.state = {
            username: '',
            firstname: '',
            lastname: '',
            password: '',
            email: '',
            repassword: '',
        }
    }
    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }
    handleSubmit = e => {
        e.preventDefault();
        // console.log(this.state);
        axios.post("https://parham-backend.herokuapp.com/user/signup", this.state)
        .then(result => {
            console.log(result);
            console.log("good");
        }).catch(error => {
            console.log(error);
            console.log("bad");
        })
    }
    componentDidMount() {
        // custom rule will have name 'isPasswordMatch'
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.password) {
                return false;
            }
            return true;
        });
    }
    render(){
    const classes = this.props.classes;

    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.foo}>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" className={classes.foo}>
                    ثبت نام
                </Typography>
                <RTL>
                <ValidatorForm className={classes.form} noValidate onSubmit={this.handleSubmit}>
                    <Grid container spacing={2} className={classes.foo}>
                        <Grid item xs={12} >
                            <TextValidator
                                classes={this.props.classes.root}
                                variant="outlined"
                                required
                                fullWidth
                                // style={{color: 'black',textAlign:'right',direction:'rtl', }}
                                id="username"
                                label="نام کاربری"
                                name="username"
                                autoComplete="username"
                                type="string"
                                value={this.state.username}
                                onChange={this.handleChange}
                                validators={['required','minStringLength:' +6 ,'matchRegexp:^[a-zA-Z0-9]*$']}
                                errorMessages={['لطفا یک نام کاربری مناسب وارد کنید','طول نام کاربری باید بیشتر از 6 باشد','a-z 0-9لطفا از حروف مجاز نام برده شده استفاده کنید']}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextValidator
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="آدرس ایمیل"
                                name="email"
                                autoComplete="email"
                                type="string"
                                value={this.state.email}
                                onChange={this.handleChange}
                                validators={['required', 'isEmail']}
                                errorMessages={['لطفا ایمیل خود را وارد کنید', 'ایمیل شما معتبر نیست']}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextValidator
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="گذرواژه"
                                // type="password"
                                id="password"
                                autoComplete="current-password"
                                type="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                validators={['required']}
                                errorMessages={['لطفا گذرواژه خود را وارد کنید']}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextValidator
                                variant="outlined"
                                required
                                fullWidth
                                name="repassword"
                                label="تایید گذرواژه"
                                // type="password"
                                id="repassword"
                                autoComplete="current-password"
                                type="password"
                                value={this.state.repassword}
                                onChange={this.handleChange}
                                validators={['isPasswordMatch', 'required']}
                                errorMessages={['گذرواژه مطابقت ندارد', 'لطفا گذرواژه خود را تکرار کنید']}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        ثبت نام
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item className={classes.foo}>
                            <Link to="/signIn" variant="body2" >
                                حساب کاربری داری؟  ورود به حساب
                            </Link>
                        </Grid>
                    </Grid>
                </ValidatorForm>
                </RTL>
            </div>
            </div>
        </Container>
    )};
}
const useStyles = makeStyles((theme) => ({
    direction:'rtl',
    root:{
      "& label.Mui-focused":{
          color: "black",
          textAlign: "right",
      }
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'white',
        backgroundColor: '#f5f5f5',
        fontFamily: 'Vazir !important',
        padding: '20px',
        borderRadius: '20px',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.success.main,
        color: 'black',
        fontFamily: 'Vazir !important',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
        color: 'black',
        font: 'Vazir',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        color: 'white',
        fontFamily: 'Vazir !important',
    },
    foo:{
        fontFamily: "Vazir !important",
        color: 'black',
    },
    di:{
        textAlign: 'right',
        direction: 'rtl',
    },
}));

export default () =>{
    const classes = useStyles();
    return(
    <SignUp classes={classes} />
    )
}