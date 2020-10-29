import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Material_RTL from "./Material_RTL";
import icon, {AccountCircle, Email, PersonAdd, Visibility, VisibilityOff, VpnKey,} from "@material-ui/icons"
import TextFieldIcon from 'material-ui-textfield-icon';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
// import LoadingButton from "@material-ui/lab/LoadingButton";
import  LoadingButton from '@material-ui/lab/LoadingButton';
import Icon from '@material-ui/core/Icon';
// import Grid from '@material-ui/core/Grid';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import Button from 'react-bootstrap-button-loader';
// import Button from 'antd';
import RTL from './mrtl'
import LoadingButtonsTransition from './butin';
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
            console.log("bad");
        })}
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <PersonAdd/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            ثبت نام
                        </Typography>
                        <Material_RTL>
                            <RTL>
                            <ValidatorForm className={classes.form} noValidate>
                                <Grid container spacing={2} className={classes.foo} component="h6">
                                    <Grid item xs={12}>
                                        <TextValidator
                                            // classes={this.props.classes.root}
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
                                            validators={['required', 'minStringLength:' + 6, 'matchRegexp:^[a-zA-Z0-9_]*$']}
                                            errorMessages={['لطفا یک نام کاربری مناسب وارد کنید', 'طول نام کاربری باید بیشتر از 6 باشد', 'a-z 0-9_ لطفا از حروف مجاز استفاده کنید']}
                                            InputProps={{
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
                                            validators={['required', 'isEmail']}
                                            errorMessages={['لطفا ایمیل خود را وارد کنید', 'ایمیل شما معتبر نیست']}
                                            InputProps={{
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
                                            validators={['required', 'minStringLength:' + 8]}
                                            errorMessages={['لطفا رمز عبور خود را وارد کنید','رمز عبور باید بیشتر از 8 حرف باشد']}
                                            InputProps={{
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
                                            validators={['isPasswordMatch', 'required']}
                                            errorMessages={['رمز عبور مطابقت ندارد', 'لطفا رمز عبور خود را تکرار کنید']}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <VpnKey />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                {/* <Button
                                    disabled={this.state.isLoading}
                                    type="submit"
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={this.handleSubmit}
                                >
                                    {/* submit */}
                                    {/* {this.state.isLoading ? "صبر کنید": "ثبت نام"}
                                </Button> */}
                                {/* <LoadingButtonsTransition state/> */}
                                <LoadingButton onClick={handleClick} pending={pending} variant="outlined">
        ثبت نام
      </LoadingButton>
                                <Grid container>
                                    <Grid item className={classes.foo}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            // backgroundColor="lightseagreen"
                                            startIcon={<Icon>login</Icon>}
                                            >
                                            <Link to="/signIn" variant="body2">
                                                ورود به حساب
                                        </Link>
                                        </Button>
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
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'black',
        backgroundColor: '#f5f5f5',
        fontFamily: 'Vazir !important',
        padding: '20px',
        borderRadius: '10px',
        opacity: '90%',
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
    foo: {
        fontFamily: "Vazir !important",
        color: 'black',
    },
    di: {
        textAlign: 'right',
        direction: 'rtl',
    },
}));

export default () => {
    const classes = useStyles();
    const p = React.useState(false);
    return (
        <SignUp classes={classes} p={p}/>
    )
}