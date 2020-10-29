import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link1 from "@material-ui/core/Link";
import React, {Component} from "react";
import Material_RTL from "./Material_RTL";
import axios from 'axios';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import InputAdornment from "@material-ui/core/InputAdornment";
import {AccountCircle, Visibility, VisibilityOff,login } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
// import clsx from "clsx";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Icon from "@material-ui/core/Icon";
import LoadingButton from '@material-ui/lab/LoadingButton';
import Switch from '@material-ui/core/Switch';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import LoadingButtonsTransition from './butt';
import RTL from './mrtl';
class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            password: '',
            username: '',
        }
        
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }
    // handleSubmit = e => {
    //     e.preventDefault();
    //     // this.state.pending = true;
    //     Axios.post("http://parham-backend.herokuapp.com/user/login", this.state)
    //         .then(result => {
    //             console.log(result);
    //             console.log("good");
    //             const token = "Bearer" + result.data.token;
    //             localStorage.setItem('token', token);
    //             localStorage.getItem('token');
    //         }).catch(error => {
    //         console.log(error);
    //         console.log("bad");
    //     })
        
    // }
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
        // const pending = this.props.padding;
        const [pending, setPending] = this.props.p;
        const handleClick = e => {
            setPending(true);
            e.preventDefault();
        // this.state.pending = true;
        axios.post("http://parham-backend.herokuapp.com/user/login", this.state)
            .then(result => {
                console.log(result);
                console.log("good");
                const token = "Bearer" + result.data.token;
                localStorage.setItem('token', token);
                localStorage.getItem('token');
            }).catch(error => {
            console.log(error);
            console.log("bad");
        })
        }
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.foo}>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            ورود
                        </Typography>
                        <Material_RTL>
                        <RTL>

                            <ValidatorForm className={classes.form} noValidate >
                                <Grid container spacing={2} className={classes.foo} component="h6">
                                    <Grid item xs={12}>
                                        <TextValidator
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
                                            validators={['required', 'minStringLength:' + 6, 'matchRegexp:^[a-zA-Z0-9_]*$']}
                                            errorMessages={['لطفا نام کاربری خود را وارد کنید', 'طول نام کاربری باید بیشتر از 6 باشد', 'a-z 0-9_ لطفا از حروف مجاز استفاده کنید']}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="start">
                                                        <AccountCircle/>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextValidator
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="password"
                                            label="گذرواژه"
                                            type={this.state.showPassword ? 'text' : 'password'}
                                            id="password"
                                            autoComplete="current-password"
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                            validators={['required', 'minStringLength:' + 8]}
                                            errorMessages={['لطفا رمز عبور خود را وارد کنید', 'رمز عبور باید بیشتر از 8 حرف باشد']}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="start">
                                                        <IconButton
                                                            style={{padding:'0px'}}
                                                            aria-label="toggle password visibility"
                                                            onClick={this.handleClickShowPassword}
                                                            onMouseDown={this.handleMouseDownPassword}
                                                        >
                                                            {this.state.showPassword ? <Visibility/> : <VisibilityOff/>}
                                                        </IconButton>
                                                    </InputAdornment>)
                                            }}
                                        /></Grid>
                                    </Grid>
                                        {/* <LoadingButton
                                            // disabled={this.state.isLoading}
                                            // type="submit"
                                            // fullWidth
                                            // variant="contained"
                                            // color="primary"
                                            // className={classes.submit}
                                            variant="outlined"
                                            pendig={pending}
                                            onClick={handleClick}
                                        >
                                            ورود
                                        </LoadingButton> */}
                                    
                                        
                                        <LoadingButton onClick={handleClick} pending={pending} variant="outlined">
        ورود
      </LoadingButton>
                                        
                                        <Grid container>
                                            {/*<Grid item xs>*/}
                                            {/*    <Link1 href="#" variant="body2" className={classes.link}>*/}
                                            {/*        فراموشی رمز*/}
                                            {/*    </Link1>*/}
                                            {/*</Grid>*/}
                                            <Grid item>
                                                <Button
                                                    type="submit"
                                                    fullWidth
                                                    variant="contained"
                                                    // backgroundColor="lightseagreen"
                                                    startIcon={<Icon>person_add</Icon>}
                                                >
                                                    <Link to="/signUp" variant="body2">
                                                        {"ساخت حساب کاربری"}
                                                    </Link> </Button>
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
    root: {
        '& button': {
          margin: theme.spacing(1),
        },
      },
    
    
      switch: {
        display: 'block',
      },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'black',
        backgroundColor: '#f5f5f5',
        // backgroundColor: 'linear-gradient(180deg, #ff1f5a 100%, #21D190 0%)',
        fontFamily: 'Vazir',
        padding: '20px',
        borderRadius: '10px',
        opacity: '90%'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.main,
        color: 'black',
        fontFamily: 'Vazir',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
        fontFamily: 'Vazir !important',
        color: 'black',
        // textAlign: 'right',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        color: 'white',
        fontFamily: 'Vazir',
    },
    link: {
        color: 'black',
        fontFamily: 'Vazir',
    },
    dir: {
        textAlign: 'right',
        color: 'black',
        fontFamily: 'Vazir',
    },
    foo: {
        fontFamily: "Vazir",
    },

}));

export default () => {
    const classes = useStyles();
    const p = React.useState(false);
    return (
        <SignIn classes={classes} p={p} />
    )
}