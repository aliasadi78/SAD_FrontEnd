import React, { Component } from 'react';
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Material_RTL from "../Component/Material_RTL";
import M_RTL from "../Component/M_RTL";
import Grid from "@material-ui/core/Grid";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from "@material-ui/core/Button";
import LoadingButton from '@material-ui/lab/LoadingButton';
import { makeStyles } from "@material-ui/core/styles";
class NewClassPage extends Component{
    constructor() {
        super();
        this.state = {
            title: '',
            paye: '',
            lesson: '',
            ownername: '',
            description: '',
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state);
    }
    

    
    render(){
        const classes = this.props.classes;
        const [paye, setPaye] = this.props.a;
        const [lesson, setLesson] = this.props.l;
        const handleChangePaye = (event) => {
            setPaye(event.target.value);
            alert(event.target.value);
            // console.log(event);
            this.setState({ [event.target.name]: event.target.value });
            console.log(this.state);
        };
        const handleChangeLesson = (event) => {
            setLesson(event.target.value);
            // console.log(lesson.value);
            // console.log(lesson.name);
            // console.log(event);
            alert(event.target.value);
            this.setState({ [event.target.name]: event.target.value });
            console.log(this.state);
        };
        const [pending, setPending] = this.props.p;
        const handleClick = e => {
            setPending(true);
            e.preventDefault();
            alert("OK");
        }
            
        return(
            <Container component="main" maxWidth="xs" >
                <CssBaseline />
                <Material_RTL>
                    <M_RTL>
                        <div className={classes.paper}>
                        <br/>
                        <div><h3 style={{fontFamily: 'Vazir',}}>ایجاد کلاس جدید</h3></div>
                        
                        <ValidatorForm className={classes.form} noValidate style={{fontFamily: 'Vazir'}}>
                                    <Grid container spacing={2} component="h6">
                                        <Grid item xs={12} style={{fontFamily: 'Vazir'}}>
                                            <TextValidator
                                            style={{fontFamily: 'Vazir'}}
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="title"
                                                label="عنوان کلاس"
                                                name="title"
                                                autoComplete="tiltle"
                                                autoFocus
                                                value={this.state.title}
                                                onChange={this.handleChange}
                                                InputLabelProps={{style:{fontFamily: 'Vazir'}}}
                                                InputProps={{
                                                    style:{fontFamily: 'Vazir'},
                                                    // endAdornment: (
                                                    //     <InputAdornment position="start">
                                                    //         <AccountCircle />
                                                    //     </InputAdornment>
                                                    // ),
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <FormControl variant="filled" style={{marginLeft: '10%',width: '45%',marginTop: '5%'}}>
                                    <InputLabel id="demo-simple-select-outlined-label">پایه</InputLabel>
                                    <Select
                                      labelId="demo-simple-select-outlined-label"
                                      id="demo-simple-select-outlined"
                                      value={paye}
                                      onChange={handleChangePaye}
                                      label="پایه"
                                      name="paye"
                                      InputLabelProps={{style:{fontFamily: 'Vazir'}}}
                                    >
                                      <MenuItem value="">
                                        <em>None</em>
                                      </MenuItem>
                                      <MenuItem value={10} InputProps={{style:{fontFamily: 'Vazir'}}}>دهم</MenuItem>
                                      <MenuItem value={11}>یازدهم</MenuItem>
                                      <MenuItem value={12}>دوازدهم</MenuItem>
                                    </Select>
                                    <br/>
                                    </FormControl>
                                    <FormControl variant="filled" style={{width: '45%',marginTop: '5%'}}>
                                    <InputLabel id="demo-simple-select-outlined-label">درس</InputLabel>
                                    <Select
                                      labelId="demo-simple-select-outlined-label"
                                      id="demo-simple-select-outlined"
                                      value={lesson}
                                      name="lesson"
                                      onChange={handleChangeLesson}
                                      label="درس"
                                    >
                                      <MenuItem value="">
                                        <em>None</em>
                                      </MenuItem>
                                      <MenuItem value={100}>ریاضی</MenuItem>
                                      <MenuItem value={101}>شیمی</MenuItem>
                                      <MenuItem value={102}>ادبیات</MenuItem>
                                      <MenuItem value={103}>دین و زندگی</MenuItem>
                                      <MenuItem value={104}>زیست شناسی</MenuItem>
                                      <MenuItem value={105}>زبان انگلیسی</MenuItem>
                                      <MenuItem value={106}>فیزیک</MenuItem>
                                      <MenuItem value={107}>عربی</MenuItem>
                                      <MenuItem value={108}>هندسه</MenuItem>
                                      <MenuItem value={109}>حسابان</MenuItem>
                                      <MenuItem value={110}>ریاضیات گسسته</MenuItem>
                                      <MenuItem value={111}>آمار و احتمال</MenuItem>
                                      <MenuItem value={112}>ریاضی و آمار</MenuItem>
                                    </Select>
                                    </FormControl>
                                    <Grid container spacing={2} component="h6">
                                        <Grid item xs={12} style={{fontFamily: 'Vazir'}}>
                                        <TextareaAutosize
                                            style={{width: '100%',fontFamily: 'Vazir',fontSize: '14px'}}
                                            aria-label="minimum height"
                                            minRows={5}
                                            onChange={this.handleChange}
                                            name="description"
                                            value={this.state.descriptionz}
                                            placeholder="توضیحات کلاس"
                                            InputLabelProps={{style:{fontFamily: 'Vazir'}}}
                                        />
                                        </Grid>
                                    </Grid>
                                    <br/>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Grid  >                                                
                                                    <LoadingButton onClick={handleClick} pendingPosition="center" pending={pending} variant="contained"  style={{backgrounColor: '#3d5a80',color: 'white',fontFamily: 'Vazir'}} fullWidth>
                                                    ایجاد کلاس جدید
                                                    </LoadingButton>                                                
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <br/>
                    </ValidatorForm>
                    </div>
                    </M_RTL>
                </Material_RTL>
                
            </Container>
        );
    }
}

const useStyles = makeStyles((theme) => ({
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
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
        color: 'black',
    },

}));

export default () => {
    const classes = useStyles();
    const a = React.useState('');
    const l = React.useState('');
    const p = React.useState(false);
    return (        
        <NewClassPage classes={classes} a={a} l={l} p={p}/>    
    )
}