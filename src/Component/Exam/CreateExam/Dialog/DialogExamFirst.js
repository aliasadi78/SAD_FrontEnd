import 'date-fns';  
import '@date-io/date-fns';
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Material_RTL from "../../../Material_RTL";
import M_RTL from "../../../M_RTL";
import axios from 'axios';
import serverURL from '../../../../utils/serverURL' ;
import tokenConfig from  '../../../../utils/tokenConfig' ;
import { makeStyles } from '@material-ui/core/styles';
import { LightenDarkenColor } from 'lighten-darken-color'; 
import DateFnsUtils from '@date-io/date-fns';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Grid from "@material-ui/core/Grid";
import { CircularProgress } from '@material-ui/core';
import { Form , Col , Row} from 'react-bootstrap';
import LoadingButton from '@material-ui/lab/LoadingButton';
import {connect} from 'react-redux' ;
import {setTitle ,
        setStartDate , 
        setEndDate ,
        setExamLength } from './../../ExamSlice' ;
        
import {MuiPickersUtilsProvider } from '@material-ui/pickers';

function onChange(value, dateString) {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
}

function onOk(value) {
  console.log('onOk: ', value);
}

class DialogExamFirst extends Component {

  constructor() {
    super();
    this.state = {
          name: '',
          description: '',
          generateNewClassId: true,
          success: false,
          startDate : "2020-12-14T10:30" ,
          endDate :   "2020-12-14T10:30"
        }
        
  }
  
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }
  render(){
  const [open, setOpen] = this.props.open;
  const classes = this.props.classes;
  const [checked, setChecked] = this.props.check;  
  const [pending, setPending] = this.props.pending;
  const [pendi, setPendi] = this.props.pendi;
  const handleChange = (event) => {
    setChecked(event.target.checked);
    this.setState({ 
        generateNewClassId : checked ,        
     });
    };  

  const handleClose = () => {
    setOpen(false);
    
  };
  const handleSubmit = () =>{    
    this.props.setTitle(this.state.name);
    this.props.setStartDate(this.state.startDate);    
    this.props.setEndDate(this.state.endDate);    
    this.props.setLength(this.state.examLength);    
    setOpen(false);
  }    

  return (
    <div>      
      <Dialog fullWidth style={{fontFamily: 'Vazir'}} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">      
      <DialogTitle style={{fontFamily: 'Vazir' , backgroundColor : '#3D5A80',textAlign: 'center'}}>
      <span style={{fontFamily: 'Vazir' , color : 'white'}}>اضافه کردن آزمون جدید</span>
      </DialogTitle>        
        {pendi ? (<div style={{margin: '3% 0% 3% 46%'}}><CircularProgress style={{color: '#0e918c'}}/></div> ) :
                  <div>
                    <div className={classes.paper}> 
        
        <DialogContent>          
        <MuiPickersUtilsProvider utils={DateFnsUtils}>          
        <Material_RTL>
          <M_RTL>
            <Grid container spacing={2} >
        <Grid item xs={12} id="dialog">        
        <ValidatorForm noValidate style={{fontFamily: 'Vazir' , dir : 'rtl'}}>
          <TextField
            // autoFocus
            margin="dense"
            id="name"
            dir="rtl"
            variant="outlined"
            label="عنوان آزمون"
            type="text"
            name="name"
            fullWidth
            // autoFocus
            value={this.state.name}
            onChange={(e)=>{
              this.setState(prevstate=>{
                  return{
                      name : e.target.value
                  }
              })
            }}
            InputLabelProps={{style:{fontFamily: 'Vazir'}}}
            InputProps={{
              style:{fontFamily: 'Vazir'}
          }}            
          />          
          
          </ValidatorForm >
          </Grid>
          <Grid id="examDate" container xs={12} justifyContent='center'>                                             
          </Grid>
          <Grid item xs={6}>
            <form className={classes.container} noValidate>
              <TextField
                id="datetime-local"
                variant = "outlined"
                label={<div style={{fontFamily: 'Vazir'}} > شروع آزمون </div>}
                type="datetime-local"
                defaultValue="2021-02-04T15:00"
                // value={this.state.date}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {                  
                  this.setState(prevstate => {
                    return {
                      startDate : e.target.value ,
                    };
                  })
                }}
              />
            </form>
          </Grid>
          <Grid item xs={6}>                           
            <form className={classes.container} noValidate>
              <TextField
                id="datetime-local"
                variant="outlined"
                label={<div style={{fontFamily: 'Vazir'}} > پایان آزمون </div>}
                type="datetime-local"
                // defaultValue={this.state.startDate}
                defaultValue="2021-02-04T15:00"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  this.setState(prevstate => {
                    return {
                      endDate : e.target.value ,
                    };
                  })
                }}
              />
            </form>        
          </Grid>
          <Grid container xs={12} justifyContent='center'>
          </Grid>
          <Grid container xs={12} justifyContent='center'>
            <Form.Group as={Row} style={{marginTop : '16px'}} controlId="formPlaintextEmail">
                <Col sm="1" ></Col>
                <Form.Label column sm="5">
                زمان آزمون به دقیقه :
                </Form.Label>
                <Col sm="4">
                    <Form.Control type="text" defaultValue="0" 
                    onChange={(e) => {
                        this.setState(prevstate => {
                          return {
                            examLength : e.target.value
                          }
                        });                        
                    }} />
                </Col>
            </Form.Group> 
          </Grid>
        </Grid>        
        </M_RTL>
        </Material_RTL>
        </MuiPickersUtilsProvider>
        </DialogContent>
          
        <DialogActions>
        <Grid style={{textAlign: 'right',width: '100%'}} >          
        <LoadingButton onClick={handleSubmit}  variant="contained" color="#EE6C4D" pending={pending} style={{backgroundColor: '#EE6C4D',color: 'white',fontFamily: 'Vazir',margin: '0% 22% 0% 5%',width: '50%'}}>
          ادامه
          </LoadingButton>                                 
                </Grid>        
        </DialogActions>
        </div>
        </div>}        
      </Dialog>          
          {this.state.success ? (
            setOpen(false)
          ) : null}
      
    </div>
  );
}
}
const useStyles = makeStyles((theme) => ({
  groupbutton :{
    backgroundColor : '#EE6C4D' , 
    color : "white" ,
    "&:hover": {
      backgroundColor: LightenDarkenColor('#EE6C4D', -40) ,        
      color :'white'
    },
  },
  button : {
    marginRight : theme.spacing(2) ,       
    backgroundColor : '#98C1D9' ,
    "&:hover": {
      backgroundColor: '#EE6C4D' ,
      color : 'white' , 
    },                
  },
  paper: {    
    flexDirection: 'column',
    alignItems: 'center',
    color: 'black',    
    padding: '20px',
    borderRadius: '0px',
    opacity: '95%'
},
}));
function FirstDialogExam (props){
  const classes = useStyles();
  const open = React.useState(true);
  const check = React.useState(false);
  const classId= props.classId;
  const pending = React.useState(false);
  const pendi = React.useState(false);
  return (        
      <DialogExamFirst
      setTitle ={props.setTitle}
      setEndDate = {props.setEndDate}
      setStartDate = {props.setStartDate}      
      setLength = {props.setLength}
      classes={classes} open={open} check={check} classId={classId} pending={pending} pendi={pendi}/>    
  )
}

const mapDispatchToProps = (dispatch) => {
  return{
    setTitle : (t) => dispatch(setTitle(t)) , 
    setStartDate : (t) => dispatch(setStartDate(t)),
    setEndDate : (t) => dispatch(setEndDate(t)),    
    setLength : (t) => dispatch(setExamLength(t)) ,
  }
}

export default connect(null , mapDispatchToProps)(FirstDialogExam)

