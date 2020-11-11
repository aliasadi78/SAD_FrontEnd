import React, {Component} from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Material_RTL from "../Component/Material_RTL";
import M_RTL from "../Component/M_RTL";
import Divider from '@material-ui/core/Divider';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Icon from "@material-ui/core/Icon";
import { Link } from "react-router-dom";
import LoadingButton from '@material-ui/lab/LoadingButton';
import axios from 'axios';
import QuestionCard from './QuestionCard';

class QuestionBank extends Component{
    constructor() {
        super();
        this.state = {
            base: [],
            course: [],
            hardness : [], 
            type : [],
            
        }
    }
    handleChange = e => {
      this.setState({ [e.target.name]: [e.target.value]});
        // console.log(this.state);
      };

      handleSubmit = e =>{
          console.log(this.state);
      }
      
    render(){
        const classes = this.props.classes;
        const [pending, setPending] = this.props.pending;
        var res;
        var listQ;
        const handleClick = e => {
            setPending(true);
            e.preventDefault();
            // console.log(this.state);
            const token = localStorage.getItem('token');
            res = [];
            listQ = [];
            // console.log(token);
            const headers={
              'Authorization': token
            }
            axios.post("https://parham-backend.herokuapp.com/bank?page=1&limit=10",
             this.state,{headers: headers})
                .then(result => {
                  res.push(result.data.questions);
                  // console.log(result.data.questions.question);
                    console.log(result);
                    console.log(res);
                    console.log("good");  
                    console.log(this.state);
                    listQ = res.map((q) => <li><QuestionCard q/></li>)
                    // document.getElementById('ress').innerHTML = <QuestionCard/>
                    // res[0].map(q =>{
                    //   return q.question;
                    //   console.log(q);
                    // });                                                       
                    // const token = "Bearer" + " " + result.data.token;
                    
                    // localStorage.setItem('token', token);                    
                    // console.log("first");

                    // //redirect to edit profile page                                        
                    // window.location.href = "/profile/edit" ;
                }).catch(error => {
                    console.log(error);
                    alert("error");
                    setPending(false); 
                    console.log("bad");

                })
                // const listQ = res.map((q) => <li><QuestionCard q/></li>)
            
        }
        return(
            <div>
                <Material_RTL>
                <M_RTL>
                <Container className={classes.paper} alignItems="center" component="main" style={{fontFamily: 'Vazir',position: 'relative',right: '5%',width:'75%',}}>
                    <CssBaseline/>
                <div style={{position: 'relative',}}>
                <ValidatorForm noValidate style={{fontFamily: 'Vazir'}}>
                <FormControl variant="filled" style={{width:'20%',margin: '1%'}}>
                    <InputLabel id="demo-simple-select-outlined-label">پایه</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={this.state.base}
                      onChange={this.handleChange}
                      label="پایه"
                      name="base"
                      InputLabelProps={{style:{fontFamily: 'Vazir'}}}
                    >
                      {/* <MenuItem value="">
                        <em>None</em>
                      </MenuItem> */}
                      <MenuItem value={10} InputProps={{style:{fontFamily: 'Vazir'}}}>دهم</MenuItem>
                      <MenuItem value={11}>یازدهم</MenuItem>
                      <MenuItem value={12}>دوازدهم</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="filled" style={{width:'20%',margin: '1%'}}>
                    <InputLabel id="demo-simple-select-outlined-label">کتاب</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={this.state.course}
                      onChange={this.handleChange}
                      label="کتاب"
                      name="course"
                      InputLabelProps={{style:{fontFamily: 'Vazir'}}}
                    >
                      {/* <MenuItem value="">
                        <em>None</em> */}
                      {/* </MenuItem> */}
                      <MenuItem value={'MATH'} InputProps={{style:{fontFamily: 'Vazir'}}}>ریاضی</MenuItem>
                      <MenuItem value={'PHYSIC'}>فیزیک</MenuItem>
                      <MenuItem value={'CHEMISTRY'}>شیمی</MenuItem>
                      <MenuItem value={'BIOLOGY'}>زیست</MenuItem>
                    </Select>
                </FormControl>
                
                <FormControl variant="filled" style={{width:'20%',margin: '1%'}}>
                    <InputLabel id="demo-simple-select-outlined-label">نوع سوال</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={this.state.type}
                      onChange={this.handleChange}
                      label="نوع سوال"
                      name="type"
                      InputLabelProps={{style:{fontFamily: 'Vazir'}}}
                    >
                      {/* <MenuItem value="">
                        <em>None</em>
                      </MenuItem> */}
                      <MenuItem value={'TEST'} InputProps={{style:{fontFamily: 'Vazir'}}}>تستی</MenuItem>
                      <MenuItem value={'MULTICHOISE'}>چند گزینه ای</MenuItem>
                      <MenuItem value={'LONGANSWER'}>تشریحی</MenuItem>
                      <MenuItem value={'SHORTANSWER'}>جای خالی</MenuItem>
                    </Select>
                </FormControl>

                <FormControl variant="filled" style={{width:'20%',margin: '1%'}}>
                    <InputLabel id="demo-simple-select-outlined-label">سطح سوال</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={this.state.hardness}
                      onChange={this.handleChange}
                      label="سطح سوال"
                      name="hardness"
                      InputLabelProps={{style:{fontFamily: 'Vazir'}}}
                    >
                      {/* <MenuItem value="">
                        <em>None</em>
                      </MenuItem> */}
                      <MenuItem value={'LOW'}>ساده</MenuItem>
                      <MenuItem value={'MEDIUM'}>متوسط</MenuItem>
                      <MenuItem value={'HARD'}>سخت</MenuItem>
                    </Select>
                </FormControl>
                <br/>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Grid classes={classes.root} >
                                            <LoadingButton onClick={handleClick} pendingPosition="center" className={classes.topButton} pending={pending} variant="contained"  style={{fontFamily: 'Vazir',backgroundColor: '#0e918c'}} fullWidth>
                                            جست و جو در بانک سوال
                                            </LoadingButton>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                  <br/>  
                </ValidatorForm >
                </div>
                </Container>
                <br/>
                <Container className={classes.paper} alignItems="center" component="main" style={{fontFamily: 'Vazir',position: 'relative',right: '5%',width:'75%',}}>
                <CssBaseline/>
                    <div id="ress">
                      <ul>
                        {listQ}
                      </ul>
                      {/* <QuestionCard res/> */}
                    </div>
                        
                </Container>
                </M_RTL>
                </Material_RTL>
            </div>
        );
    }
}
const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(1),
      display: 'inlineBlock',
      flexDirection: 'column',
      alignItems: 'center',      
      color : '#3D5A80' , 
      backgroundColor: 'white',
    //   padding: '10px',
      borderRadius: '5px',      
    //   opacity: '95%' ,       
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
}));

  
export default () => {
    const classes = useStyles();
    const pending = React.useState(false);
    return (        
        <QuestionBank classes={classes} pending={pending} />    
    )
}