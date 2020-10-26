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

import Axios from 'axios';
class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            password: '',
            email: '',
        }
    }
    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }
    handleSubmit = e => {
        e.preventDefault();
        Axios.post("http://parham-backend.herokuapp.com/user/signup", this.state)
        .then(result => {
            console.log(result);
            console.log("BYYYYyyy");
        }).catch(error => {
            console.log(error);
            console.log("hello");
        })
    }
    render() {
        const classes = this.props.classes;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.foo}>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5" className={classes.foo}>
                            ورود به حساب کاربری
                        </Typography>
                        <form className={classes.form + classes.foo} noValidate onSubmit={this.handleSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="ایمیل"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="گذرواژه"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" className={classes.foo}/>}
                                label="به خاطر سپردن"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                ورود
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link1 href="#" variant="body2" className={classes.link}>
                                        فراموشی رمز
                                    </Link1>
                                </Grid>
                                <Grid item>
                                    <Link to="/signUp" /*variant="body2" className={classes.link}*/>
                                        {"حساب کاربری نداری؟ ساخت حساب"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
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
        // backgroundColor: 'linear-gradient(180deg, #ff1f5a 100%, #21D190 0%)',
        fontFamily: 'Vazir',
        padding: '20px',
        borderRadius: '10px',
        opacity: '90%'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.main,
        color: 'white',
        fontFamily: 'Vazir',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
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
    return(
        <SignIn classes={classes} />
    )
}