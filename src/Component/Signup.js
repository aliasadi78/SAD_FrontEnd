import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Material_RTL from "./Material_RTL";
import icon, {AccountCircle, Email, PersonAdd, Visibility, VisibilityOff, VpnKey,} from "@material-ui/icons"
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from "@material-ui/core/IconButton";
import  LoadingButton from '@material-ui/lab/LoadingButton';
import Icon from '@material-ui/core/Icon';
import RTL from './M_RTL';
import Vazir from '../fonts/Vazir.ttf';
class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            firstname: '',
            lastname: '',
            password: '',
            email: '',
            repassword: '',
            showPassword: false,
            isLoading: false,
        }
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }
    handleSubmit = e => {
        e.preventDefault();
        // console.log(this.state);
        this.setState({isLoading: true});
        axios.post("https://parham-backend.herokuapp.com/user/signup", this.state)
            .then(result => {
                console.log(result);
                console.log("good");
                const token = "Bearer" + result.data.token;
                localStorage.setItem('token',token);
                localStorage.getItem('token');
            }).catch(error => {
            console.log(error);
            console.log("bad");
        })
        

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

    componentDidMount() {
        // custom rule will have name 'isPasswordMatch'
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.password) {
                return false;
            }
            return true;
        });
    }

    render() {
        const classes = this.props.classes;
        const [pending, setPending] = this.props.p;
        const handleClick = e => {
            setPending(true);
            e.preventDefault();
        // this.state.pending = true;
        axios.post("http://parham-backend.herokuapp.com/user/signup", this.state)
            .then(result => {
                console.log(result);
                console.log("good");
                const token = "Bearer" + result.data.token;
                localStorage.setItem('token', token);
                localStorage.getItem('token');
            }).catch(error => {
            console.log(error);
            alert('خطا! نام کاربری یا ایمیل شما قبلا استفاده شده لطفا تمام موارد * دار را پر کنید');
            console.log("bad");
            setPending(false);
        })}
        return (
            <Container component="main" maxWidth="xs" >
                <CssBaseline/>
                <div>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <PersonAdd/>
                        </Avatar>
                        <Typography component="h1" variant="h5" style={{fontFamily: 'Vazir'}}>
                            ثبت نام
                        </Typography>
                        <Material_RTL>
                            <RTL>
                            <ValidatorForm className={classes.form} noValidate>
                                <Grid container spacing={2} component="h6">
                                    <Grid item xs={12}>
                                        <TextValidator
                                            
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="username"
                                            label={"نام کاربری"}
                                            name="username"
                                            autoComplete="username"
                                            type="string"
                                            value={this.state.username}
                                            onChange={this.handleChange}
                                            InputLabelProps={{style:{fontFamily: 'Vazir'},}}
                                            validators={['required', 'minStringLength:' + 6, 'matchRegexp:^[a-zA-Z0-9_]*$']}
                                            errorMessages={['لطفا یک نام کاربری مناسب وارد کنید', 'طول نام کاربری باید بیشتر از 6 باشد', 'a-z 0-9_ لطفا از حروف مجاز استفاده کنید']}
                                            InputProps={{
                                                style:{fontFamily: 'Vazir'},
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <AccountCircle />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextValidator
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="email"
                                            label="ایمیل"
                                            name="email"
                                            autoComplete="email"
                                            type="string"
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                            InputLabelProps={{style:{fontFamily: 'Vazir'},}}
                                            validators={['required', 'isEmail']}
                                            errorMessages={['لطفا ایمیل خود را وارد کنید', 'ایمیل شما معتبر نیست']}
                                            InputProps={{
                                                style:{fontFamily: 'Vazir'},
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Email />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextValidator
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="password"
                                            label={"رمز عبور"}
                                            id="password"
                                            autoComplete="current-password"
                                            type={this.state.showPassword ? 'text' : 'password'}
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                            InputLabelProps={{style:{fontFamily: 'Vazir'},}}
                                            validators={['required', 'minStringLength:' + 8]}
                                            errorMessages={['لطفا رمز عبور خود را وارد کنید','رمز عبور باید بیشتر از 8 حرف باشد']}
                                            InputProps={{
                                                style:{fontFamily: 'Vazir'},
                                                endAdornment:(
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        style={{padding: '0px',color:'black'}}
                                                        onClick={this.handleClickShowPassword}
                                                        onMouseDown={this.handleMouseDownPassword}
                                                    >
                                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextValidator
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="repassword"
                                            label="تایید رمز عبور"
                                            id="repassword"
                                            autoComplete="current-password"
                                            type={this.state.showPassword ? 'text' : 'password'}
                                            value={this.state.repassword}
                                            onChange={this.handleChange}
                                            InputLabelProps={{style:{fontFamily: 'Vazir'}}}
                                            validators={['isPasswordMatch', 'required']}
                                            errorMessages={['رمز عبور مطابقت ندارد', 'لطفا رمز عبور خود را تکرار کنید']}
                                            InputProps={{
                                                style:{fontFamily: 'Vazir'},
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <VpnKey />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <br/>
                                <Grid container>
                                     <Grid item xs={12}>
                                        <Grid >
                                            <LoadingButton onClick={handleClick} pendingPosition="center" fullWidth pending={pending} variant="contained" style={{color: 'white',fontFamily: 'Vazir'}}>
                                                    {'ثبت نام'}
                                            </LoadingButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <br/>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Grid >
                                        <Link to="/signIn" style={{color: 'white',textDecoration : 'none',}}>
                                            
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            style={{backgroundColor : '#0e918c', color: 'white',fontFamily: 'Vazir'}}
                                            startIcon={<Icon>login</Icon>}
                                            >
                                                { 'ورود' }
                                        
                                        </Button></Link></Grid>
                                    </Grid>
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
    root:{
        color: 'white',
    },
    paper: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'black',
        backgroundColor: '#f5f5f5',
        fontFamily: 'Vazir !important',
        padding: '20px',
        borderRadius: '10px',
        opacity: '95%',
    },
    avatar: {
        margin: theme.spacing(1),
        // backgroundColor: theme.palette.success.main,
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
        color: 'black',
        fontFamily: 'Vazir !important',
        backgroundColor: 'blue',
    },
}));

export default () => {
    const classes = useStyles();
    const p = React.useState(false);
    return (
        <SignUp classes={classes} p={p}/>
    )
}