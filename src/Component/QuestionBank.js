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
import SearchIcon from '@material-ui/icons/Search';



class QuestionBank extends Component{
    constructor() {
        super();
        this.state = {
            base: [],
            course: [],
            hardness : [], 
            type : [],
            chapter: [],
        }
    }
    render(){
        const classes = this.props.classes;
        const [pending, setPending] = this.props.pending;
        const [long , setLong ] = this.props.long ;
        const [test , setTest ] = this.props.test ;
        const [short, setShort] = this.props.short;
        const [multi, setMulti] = this.props.multi;
        const [list, setList] = this.props.list;
        var res;
        const handleChange = e => {
          this.setState({ [e.target.name]: [e.target.value]});
            setPending(false);
            setList([]);
            setTest(false);
            setLong(false);
            setShort(false);
            setMulti(false);
          }
    
        const handleClick = e => {
            setPending(true);
            console.log("pending:" + pending);
            console.log("this.state.type[0]" + this.state.type[0]);
            e.preventDefault();
            const token = localStorage.getItem('token');
            res = [];
            if(this.state.type[0] === "TEST"){
              setTest(true);
              setLong(false);
              setShort(false);
              setMulti(false);
              console.log("istest:" + test);
            }
            if(this.state.type[0] === "LONGANSWER"){
              setTest(false);
              setLong(true);
              setShort(false);
              setMulti(false);
              console.log("islong:" + long);
            }
            if(this.state.type[0] === "SHORTANSWER"){
              setTest(false);
              setLong(false);
              setShort(true);
              setMulti(false);
              console.log("isshort:" + short);
            }
            if(this.state.type[0] === "MULTICHOISE"){
              setTest(false);
              setLong(false);
              setShort(false);
              setMulti(true);
              console.log("ismulti:" + multi);
            }
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
                    console.log(result);
                    
                    // console.log("good");  
                    // console.log(this.state);
                    var ll = res.map((q) => q);
                    this.setState({ listquestion : ll});
                    setList([...ll]);
                    console.log(list);
                    // setPending(true);
                }).catch(error => {
                    console.log(error.messege);
                    alert("error");
                    setPending(false); 
                    console.log("bad");
                })
        }
        
        return(
            <div>
                <Material_RTL>
                <M_RTL>
                <Container className={classes.paper} alignItems="center" component="main" style={{fontFamily: 'Vazir',position: 'relative',right: '5%',width:'75%',}}>
                    <CssBaseline/>
                <div style={{position: 'relative',}}>
                <ValidatorForm noValidate style={{fontFamily: 'Vazir'}}>
                <FormControl variant="filled" style={{width:'30%',margin: '1%'}}>
                    <InputLabel style={{fontFamily: 'Vazir'}} id="demo-simple-select-outlined-label">پایه</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={this.state.base}
                      onChange={handleChange}
                      label="پایه"
                      name="base"
                      style={{fontFamily: 'Vazir'}}
                    >
                      {/* <MenuItem value="">
                        <em>None</em>
                      </MenuItem> */}
                      <MenuItem value={10} style={{fontFamily: 'Vazir',direction: 'rtl'}}>دهم</MenuItem>
                      <MenuItem value={11} style={{fontFamily: 'Vazir',direction: 'rtl'}}>یازدهم</MenuItem>
                      <MenuItem value={12} style={{fontFamily: 'Vazir',direction: 'rtl'}}>دوازدهم</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="filled" style={{width:'30%',margin: '1%'}}>
                    <InputLabel style={{fontFamily: 'Vazir'}} id="demo-simple-select-outlined-label">کتاب</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={this.state.course}
                      onChange={handleChange}
                      label="کتاب"
                      name="course"
                      style={{fontFamily: 'Vazir'}}
                    >
                      {/* <MenuItem value="">
                        <em>None</em> */}
                      {/* </MenuItem> */}
                      <MenuItem value={'MATH'}       style={{fontFamily: 'Vazir',direction: 'rtl'}}>ریاضی</MenuItem>
                      <MenuItem value={'PHYSIC'}     style={{fontFamily: 'Vazir',direction: 'rtl'}}>فیزیک</MenuItem>
                      <MenuItem value={'CHEMISTRY'}  style={{fontFamily: 'Vazir',direction: 'rtl'}}>شیمی</MenuItem>
                      <MenuItem value={'BIOLOGY'}    style={{fontFamily: 'Vazir',direction: 'rtl'}}>زیست</MenuItem>
                    </Select>
                </FormControl>
                
                <FormControl  variant="filled" style={{width:'30%',margin: '1%'}}>
                    <InputLabel style={{fontFamily: 'Vazir'}} id="demo-simple-select-outlined-label">نوع سوال</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={this.state.type}
                      onChange={handleChange}
                      label="نوع سوال"
                      name="type"
                      style={{fontFamily: 'Vazir'}}
                    >
                      {/* <MenuItem value="">
                        <em>None</em>
                      </MenuItem> */}
                      <MenuItem value={'TEST'}         style={{fontFamily: 'Vazir',direction: 'rtl'}}>تستی</MenuItem>
                      <MenuItem value={'MULTICHOISE'}  style={{fontFamily: 'Vazir',direction: 'rtl'}}>چند گزینه ای</MenuItem>
                      <MenuItem value={'LONGANSWER'}   style={{fontFamily: 'Vazir',direction: 'rtl'}}>تشریحی</MenuItem>
                      <MenuItem value={'SHORTANSWER'}  style={{fontFamily: 'Vazir',direction: 'rtl'}}>جای خالی</MenuItem>
                    </Select>
                </FormControl>

                <FormControl variant="filled" style={{width:'30%',margin: '1%'}}>
                    <InputLabel style={{fontFamily: 'Vazir'}} id="demo-simple-select-outlined-label">سطح سوال</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={this.state.hardness}
                      onChange={handleChange}
                      label="سطح سوال"
                      name="hardness"
                      style={{fontFamily: 'Vazir'}}
                    >
                      {/* <MenuItem value="">
                        <em>None</em>
                      </MenuItem> */}
                      <MenuItem value={'LOW'}     style={{fontFamily: 'Vazir',direction: 'rtl'}}>ساده</MenuItem>
                      <MenuItem value={'MEDIUM'}  style={{fontFamily: 'Vazir',direction: 'rtl'}}>متوسط</MenuItem>
                      <MenuItem value={'HARD'}    style={{fontFamily: 'Vazir',direction: 'rtl'}}>سخت</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="filled" style={{width:'30%',margin: '1%'}}>
                    <InputLabel style={{fontFamily: 'Vazir'}} id="demo-simple-select-outlined-label">فصل</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={this.state.chapter}
                      onChange={handleChange}
                      label="فصل"
                      name="chapter"
                      style={{fontFamily: 'Vazir'}}
                    >
                      {/* <MenuItem value="">
                        <em>None</em>
                      </MenuItem> */}
                      <MenuItem value={1} style={{fontFamily: 'Vazir',direction: 'rtl'}}>1</MenuItem>
                      <MenuItem value={2} style={{fontFamily: 'Vazir',direction: 'rtl'}}>2</MenuItem>
                      <MenuItem value={3} style={{fontFamily: 'Vazir',direction: 'rtl'}}>3</MenuItem>
                      <MenuItem value={4} style={{fontFamily: 'Vazir',direction: 'rtl'}}>4</MenuItem>
                      <MenuItem value={5} style={{fontFamily: 'Vazir',direction: 'rtl'}}>5</MenuItem>
                      <MenuItem value={6} style={{fontFamily: 'Vazir',direction: 'rtl'}}>6</MenuItem>
                      <MenuItem value={7} style={{fontFamily: 'Vazir',direction: 'rtl'}}>7</MenuItem>
                      <MenuItem value={8} style={{fontFamily: 'Vazir',direction: 'rtl'}}>8</MenuItem>
                      <MenuItem value={9} style={{fontFamily: 'Vazir',direction: 'rtl'}}>9</MenuItem>
                      <MenuItem value={10} style={{fontFamily: 'Vazir',direction: 'rtl'}}>10</MenuItem>
                    </Select>
                </FormControl>
                <br/>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Grid classes={classes.root} >
                                            <LoadingButton onClick={handleClick} endIcon={<Icon>search</Icon>} pendingPosition="center" className={classes.topButton} pending={pending} variant="contained"  style={{fontFamily: 'Vazir',backgroundColor: '#0e918c',width: '94%',height: "53px"}}>
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
                      <ol >
                        {/* {pending ? list.map((question) => {
                          return(
                          <li key={question.question}><QC q={question.question} g={question.options} test={test} multi={multi}/><br/></li>
                          )}) : null} */}
                        {pending && test ? list.map((question) => {
                          return(
                          <li key={question.question}><QC q={question.question} g={question.options} a={question.answer} test={test} multi={multi} long={long} short={short}/><br/></li>
                          )}) : pending && long ? list.map((question) => {
                          return(
                          <li key={question.question}><QC q={question.question} a={question.answer} test={test} multi={multi} long={long} short={short}/><br/></li>
                          )}) : pending && short ? list.map((question) => {
                            return(
                            <li key={question.question}><QC q={question.question} a={question.answer} test={test} multi={multi} long={long} short={short}/><br/></li>
                            )}) : pending && multi ? list.map((question) => {
                              return(
                              <li key={question.question}><QC q={question.question} a={question.answer}  g={question.options} test={test} multi={multi} long={long} short={short}/><br/></li>
                              )}) : null}
                      </ol>
                    </div>    
                </Container>
                </M_RTL>
                </Material_RTL>
            </div>
        );
    }
}

function QC (props){
  
  // console.log(props);
  // console.log(props.q);
  const classes = useStyles();
  return (
  <div className={classes.root} style={{padding: "1% 0% 0% 3%"}}>
    <Accordion  style={{backgroundColor: '#e6e6e6',marginTop: '1%',}}>
         <AccordionSummary
           expandIcon={<ExpandMoreIcon />}
           aria-controls="panel1a-content"
           id="panel1a-header"
         >
           <Typography style={{fontFamily: 'Vazir',marginTop: '2%',direction: 'rtl',textAlign: 'right'}} className={classes.heading}>
             {props.q}

             {props.test ? (
             <div style={{position : 'relative',}}>
              <div>الف){props.g[0].option}</div>
              <div>  ب){props.g[1].option}</div>
              <div>  ج){props.g[2].option}</div>
              <div>  د){props.g[3].option}</div>
             </div>) : props.multi ? props.g.map((g) =>{
               return(<div>{props.g}</div>)
             }
               
             ) : null}
             
             </Typography>
         </AccordionSummary>
         <AccordionDetails>
           <Typography style={{fontFamily: 'Vazir',textAlign: 'right'}}>
             جواب:{props.a}
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
      // padding: '2% 4% 0% 7%',   
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
    const long = React.useState(false);
    const test = React.useState(false);
    const short = React.useState(false);
    const multi = React.useState(false);
    const lq = [];
    const list = React.useState([]);
    return (        
        <QuestionBank classes={classes} pending={pending} list={list} long={long} test={test} short={short} multi={multi}/>    
        
        )
}