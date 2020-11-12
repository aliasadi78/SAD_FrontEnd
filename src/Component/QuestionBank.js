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
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';




class QuestionBank extends Component{
    constructor() {
        super();
        this.state = {
            base: [],
            course: [],
            hardness : [], 
            type : [],
            listquestion: [],
        }
    }
    handleChange = e => {
      this.setState({ [e.target.name]: [e.target.value]});
        // console.log(this.state);
        // setPending(false);
      };

      handleSubmit = e =>{
          console.log(this.state);
      }
      
    
    render(){
        const classes = this.props.classes;
        const [pending, setPending] = this.props.pending;
        const [list, setList] = this.props.list;
        var res;
        var listQ;
        var List1;
        List1 = [];
        var l = ["7","8","9"];
        const handleClick = e => {
            setPending(true);
            setList(["44","66"]);
            console.log(list);
            e.preventDefault();
            // console.log(this.state);
            const token = localStorage.getItem('token');
            res = [];
            listQ = [];
            List1 = [];
          
            // console.log(token);
            const headers={
              'Authorization': token
            }
            axios.post("https://parham-backend.herokuapp.com/bank?page=1&limit=10",
             this.state,{headers: headers})
                .then(result => {
                  res.push(...result.data.questions);
                  // console.log(result.data.questions.question);
                    // console.log(result);
                    // console.log(result.data.questions);
                    // console.log(res);
                    l = ["1","2","3"];
                    // console.log("good");  
                    // console.log(this.state);
                    var ll = res.map((q) => q);
                    this.setState({ listquestion : ll});
                    setList([...ll]);
                    console.log(list);
                    // setListquestion([...listQ]);
                    // setList([...list,listQ[0]]);
                    // this.state.listquestion.push(...listQ[0]);
                    // List1.push(listQ[0]);
                    // console.log(this.state.listquestion[0]);
                    // console.log(this.state.listquestion);
                //     List1 = listQ[0].map((q) => {
                //     console.log(q);
                //     return(
                //       <li><QuestionCard listQ={q}/></li>
                //     )}
                // )
                // console.log(list);
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
                // console.log(this.state.listquestion);
                l = ["4","5","6"]
                // List1 = listQ[0].map((q) => {
                //     console.log(q);
                //     return(
                //       <li>{QuestionCard(q)}</li>
                //     )
                // })
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
                      <ul >
                        {/* {pending ? List1 : null} */}
                        {pending ? list.map((question) => {
                          console.log("in ul");
                          console.log(question.question);
                          return(
                          <li key={question.question}><QC q={question.question}/></li>
                          )
                        }) : null}
                        {/* {pending ? <li><QC q="HELLLLLLLLOOOO" /></li> : null }
                        <br/>
                        {pending ? <li><QC q="BYYYYYYY" /></li> : null } */}
                        {/* <li><QuestionCard/></li>
                        <li><QuestionCard/></li>
                        <li><QuestionCard/></li> */}
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

function QC (props){
  
  console.log(props);
  console.log(props.q);
  const classes = useStyles();
  return (<div className={classes.root}>
    <Accordion>
         <AccordionSummary
           expandIcon={<ExpandMoreIcon />}
           aria-controls="panel1a-content"
           id="panel1a-header"
         >
           <Typography className={classes.heading}>{props.q}</Typography>
         </AccordionSummary>
         <AccordionDetails>
           <Typography>
             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
             malesuada lacus ex, sit amet blandit leo lobortis eget.
             {props.q}
           </Typography>
         </AccordionDetails>
       </Accordion>
 </div>)
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
    const lq = [];
    const list = React.useState([]);
    return (        
        <QuestionBank classes={classes} pending={pending} list={list} />    
        
        )
}