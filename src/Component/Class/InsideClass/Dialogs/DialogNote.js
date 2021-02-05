import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import  LoadingButton from '@material-ui/lab/LoadingButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Material_RTL from "../../../Material_RTL";
import M_RTL from "../../../M_RTL";
import { makeStyles } from '@material-ui/core/styles';
import { LightenDarkenColor } from 'lighten-darken-color'; 
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import serverURL from '../../../../utils/serverURL' ;
import tokenConfig from  '../../../../utils/tokenConfig' ;
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Grid from "@material-ui/core/Grid";
import CreateIcon from '@material-ui/icons/Create';
class DialogEditClass extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      body: '',
      success: false,
    }
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }
  render(){
  const [open, setOpen] = this.props.open;
  const classes = this.props.classes;
  const [noteListLoad,setNoteListLoad] = this.props.noteListLoad;
  const [pending,setPending] = this.props.pending;
  const handleClickOpen = () => {
    setOpen(true);
    this.setState({success: false})
    setPending(false)
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () =>{    
    if( this.state.title.length >= 5 && this.state.body.length >= 5){
    setPending(true)
    const a = {
      "title" : this.state.title ,
      "body" : this.state.body
    };

    const ajson = JSON.stringify(a);
    axios.post(serverURL() + "class/" + this.props.classId  + "/notes", ajson ,tokenConfig())
    .then(res => {
      console.log(res);
      this.setState({success: true,title:'',body: ''})
      setNoteListLoad(true)
      setPending(false)
    })
    .catch(e =>{
      console.log(e);
      setPending(false)
    }); 
  }else{
      alert("عنوان باید بیشتر از ۵ حرف و متن اعلان باید بین ۵ تا ۱۲۰ حرف باشد")
      setPending(false);
    }
  }
  return (
    <div>
      <Button type="submit"
              variant="contained"
              className = {classes.addButton}
              style={{fontFamily: 'Vazir'}}
              onClick={handleClickOpen}>
        
                                نوشتن<CreateIcon />
      </Button>
      <Dialog fullWidth style={{fontFamily: 'Vazir'}} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <Material_RTL><M_RTL>
      <DialogTitle style={{fontFamily: 'Vazir' , color : 'white' , backgroundColor : '#3D5A80',textAlign: 'center'}}>
      <span style={{fontFamily: 'Vazir' ,}}>اعلان جدید</span>
      </DialogTitle>
        {/* <DialogTitle  id="form-dialog-title"><span style={{direction: 'rtl',fontFamily: 'Vazir',position: 'absolute',right: '36%',top: '10%'}}>ویرایش کلاس</span></DialogTitle> */}
        <div className={classes.paper}> 
        <DialogContent>
        <ValidatorForm noValidate style={{fontFamily: 'Vazir'}}>
          <TextValidator
            autoFocus
            margin="dense"
            id="title"
            variant="outlined"
            label="عنوان"
            type="text"
            name="title"
            fullWidth
            autoFocus
            value={this.state.title}
            onChange={this.handleChange}
            validators={['required', 'minStringLength:' + 5]}
            errorMessages={['لطفا یک عنوان مناسب وارد کنید', 'عنوان باید بیشتر از ۵ حرف باشد']}
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
            name="body"
            value={this.state.body}
            placeholder="اعلان جدید"
            InputLabelProps={{style:{fontFamily: 'Vazir'}}}
          />
          
          </ValidatorForm >
          {/* کنترل اندازه حروف */}
          {this.state.body.length < 5 && this.state.body.length > 0 ? (
            <span style={{color: 'red',textAlign: 'right',direction: 'rtl',position: 'relative',left: '64%'}}>متن اعلان باید بیشتر از ۵ حرف باشد</span>
          ) : null}
        </DialogContent>

        <DialogActions>
        <Grid style={{textAlign: 'right',width: '100%'}} >  
        <LoadingButton onClick={handleSubmit} pendingPosition="center" pending={pending} variant="contained" color="#EE6C4D" style={{backgroundColor: '#EE6C4D',color: 'white',fontFamily: 'Vazir',margin: '0% 21% 0% 5%',width: '25%'}}>
                          افزودن
                          </LoadingButton>         
                        <Button onClick={handleClose} color="primary" style={{backgroundColor: '#98C1D9',color: 'white',fontFamily: 'Vazir',width: '25%'}}>
                          انصراف
                        </Button></Grid>          
        </DialogActions>
        </div>
        </M_RTL>
      </Material_RTL>
      </Dialog>          
          {this.state.success ? (setOpen(false)) : null}
    </div>
  );
}
}
const useStyles = makeStyles((theme) => ({
  //برای متن ارور
  '@global':{
    '.MuiFormHelperText-root.Mui-error' : {
    fontFamily: 'Vazir',
    },
  },
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
  addButton :{
    backgroundColor : '#EE6C4D' , 
    marginBottom : theme.spacing(1) ,
    "&:hover": {
      backgroundColor: LightenDarkenColor('#EE6C4D', -40) ,        
      color :'white'
    },
  },  
}));
export default (props) => {
  const classes = useStyles();
  const open = React.useState(false);
  const check = React.useState(false);
  const pending = React.useState(false);
  const classId= props.classId;
  const name= props.name;
  const noteListLoad = props.noteListLoad;
  return (        
      <DialogEditClass noteListLoad={noteListLoad} classes={classes} open={open} check={check} classId={classId} pending={pending}/>    
  )
}