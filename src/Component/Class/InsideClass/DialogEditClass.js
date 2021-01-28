import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Material_RTL from "../../Material_RTL";
import M_RTL from "../../M_RTL";
import { makeStyles } from '@material-ui/core/styles';
import { LightenDarkenColor } from 'lighten-darken-color'; 
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import serverURL from '../../../utils/serverURL' ;
import tokenConfig from '../../../utils/tokenConfig' ;
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Grid from "@material-ui/core/Grid";
import AlertDialog from '../../Dialog';
import { CircularProgress } from '@material-ui/core';
import LoadingButton from '@material-ui/lab/LoadingButton';
import DialogDeleteClass from './DialogDeleteClass';

class DialogEditClass extends Component {
  constructor() {
    super();
    this.state = {
          name: '',
          description: '',
          generateNewClassId: true,
          success: false,
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
    this.setState({ generateNewClassId : checked });
  };
  const handleClickOpen = () => {
    setPendi(true)
    this.setState({success: false})
    console.log(this.props.classId);
    axios.get(serverURL() + "class/" + this.props.classId , 
        tokenConfig())
        .then(res => {
          this.setState({ name :  res.data.Class.name});
          this.setState({ description :  res.data.Class.description});
          setPendi(false)
        })
        .catch(e =>{
          console.log("error");
        });
        setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    
  };
  const handleSubmit = () =>{
    setPending(true)    
    axios.put(serverURL() + "class/" + this.props.classId , 
    this.state,tokenConfig())
    .then(res => {   
        setPending(false);
        setOpen(false);   
        this.setState({success: true})  
        const url = "/class/" + res.data.editedClass.classId ;
        window.location.href = url ;    
    })
    .catch(e =>{
      console.log("error");
      console.log(tokenConfig);
    });
  }

  const handleDelete = () => {
    axios.delete(serverURL() + "class/" + this.props.classId ,tokenConfig())
    .then(res=>{
      window.location.href = "/user/classes" ;
    })
    .catch(err => {
      console.log(err);
    })
  };

  return (
    <div>
        
      <Button type="submit"
              variant="contained"
              className = {classes.groupbutton}
              style={{backgroundColor : '#EE6C4D',fontFamily: 'Vazir'}}
              onClick={handleClickOpen}>
        ویرایش
      </Button>
      <Dialog fullWidth style={{fontFamily: 'Vazir'}} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <Material_RTL><M_RTL>
      <DialogTitle style={{fontFamily: 'Vazir' , color : 'white' , backgroundColor : '#3D5A80',textAlign: 'center'}}>
      <span style={{fontFamily: 'Vazir' ,}}>ویرایش کلاس</span>
      </DialogTitle>
        {/* <DialogTitle  id="form-dialog-title"><span style={{direction: 'rtl',fontFamily: 'Vazir',position: 'absolute',right: '36%',top: '10%'}}>ویرایش کلاس</span></DialogTitle> */}
        {pendi ? (<div style={{margin: '3% 0% 3% 46%'}}><CircularProgress style={{color: '#0e918c'}}/></div> ) :
                  <div>
                    <div className={classes.paper}> 
        
        <DialogContent>
        <ValidatorForm noValidate style={{fontFamily: 'Vazir'}}>
          <TextField
            // autoFocus
            margin="dense"
            id="name"
            variant="outlined"
            label="اسم کلاس"
            type="text"
            name="name"
            fullWidth
            // autoFocus
            value={this.state.name}
            onChange={this.handleChange}
            InputLabelProps={{style:{fontFamily: 'Vazir'}}}
            InputProps={{
              style:{fontFamily: 'Vazir'}
          }}
            
          />
          <TextareaAutosize
            style={{width: '100%',fontFamily: 'Vazir',fontSize: '14px'}}
            aria-label="minimum height"
            minRows={5}
            onChange={this.handleChange}
            name="description"
            value={this.state.description}
            placeholder="توضیحات کلاس"
            InputLabelProps={{style:{fontFamily: 'Vazir'}}}
          />
          
          </ValidatorForm >
        <div style={{color: 'black',textAlign: 'center',width: '25%',position: 'relative',top: '70%',right: '37%',padding: '2%',}}>          
          <TextField
            // autoFocus
            margin="dense"
            id="classId"
            variant="outlined"
            label="کد کلاس"
            type="text"
            name="classId"
            // autoFocus
            // disabled
            value={this.props.classId}
            InputLabelProps={{style:{fontFamily: 'Vazir'}}}
            InputProps={{
              style:{fontFamily: 'Vazir',textAlign: 'center',direction: 'ltr'},
              readOnly: true,
          }}
            
          />
          </div>
          <div style={{margin: '1% -2% 1% 0%',textAlign: 'right',direction: 'rtl',}}><Checkbox
              defaultChecked
              style={{color: '#0e918c'}}
              onChange={handleChange}
              // inputProps={{ 'aria-label': 'secondary checkbox' }}
          />تغییر رمز کلاس
          </div>
          
        </DialogContent>
          
        <DialogActions>
        <Grid style={{textAlign: 'right',width: '100%'}} >  
        <LoadingButton onClick={handleSubmit}  variant="contained" color="#EE6C4D" pending={pending} style={{backgroundColor: '#EE6C4D',color: 'white',fontFamily: 'Vazir',position: 'absolute',margin: '-3% 19% 0% 0%',width: '25%'}}>
          ویرایش کلاس
          </LoadingButton>         
          {/* <LoadingButton onClick={handleDelete}  variant="contained" pending={pending} style={{backgroundColor: '#E63946' ,color: 'white',fontFamily: 'Vazir',width: '25%'}}>
          پاک کردن کلاس
          </LoadingButton>   */}
          {/* //مطمئنی که میخوای کلاس رو حذف کنی؟ و لودینگ باتن ویرایش کلاس */}
          <DialogDeleteClass classId={this.props.classId}/>       
        {/* <Button onClick={handleClose} color="primary" style={{backgroundColor: '#98C1D9',color: 'white',fontFamily: 'Vazir',width: '25%'}}>
          انصراف
        </Button> */}

                </Grid>        
        </DialogActions>
        </div>
        </div>}
        </M_RTL>
      </Material_RTL>
      </Dialog>
          {/* {this.state.success ? (
            <AlertDialog text="اطلاعات با موفقیت تغییر کرد"/>
          ) : null} */}
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
    // marginTop: theme.spacing(1),
    // display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'black',
    // backgroundColor : '#f5f5f5',
    padding: '20px',
    borderRadius: '0px',
    opacity: '95%'
},
}));
export default (props) => {
  const classes = useStyles();
  const open = React.useState(false);
  const check = React.useState(false);
  const classId= props.classId;
  const pending = React.useState(false);
  const pendi = React.useState(false);
  return (        
      <DialogEditClass classes={classes} open={open} check={check} classId={classId} pending={pending} pendi={pendi}/>    
  )
}