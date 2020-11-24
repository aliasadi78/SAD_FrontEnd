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

class DialogEditClass extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      generateNewClassId: true,
    }
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }
  render(){
  const [open, setOpen] = this.props.open;
  const classes = this.props.classes;
  const [checked, setChecked] = this.props.check;

  const handleChange = (event) => {
    setChecked(event.target.checked);
    this.setState({ generateNewClassId : checked });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () =>{
    console.log(this.props);
    console.log(this.props.classId);
    console.log(this.state);
    axios.put(serverURL() + "class/" + this.props.classId , 
    this.state,tokenConfig())
    .then(res => {
      console.log(res);
      console.log(res.data.editedClass.classId);
      console.log(tokenConfig);
      axios.get(serverURL() + "class/" + res.data.editedClass.classId , 
      tokenConfig())
      .then(res => {
      console.log(res);
      })
    .catch(e =>{
      console.log("ridi");
    });
    })
    .catch(e =>{
      console.log("error");
      console.log(tokenConfig);
    });
  }
  return (
    <div>
        <Material_RTL><M_RTL>
      <Button type="submit"
              variant="contained"
              className = {classes.groupbutton}
              style={{backgroundColor : '#EE6C4D',fontFamily: 'Vazir'}}
              onClick={handleClickOpen}>
        ویرایش
      </Button>
      <Dialog style={{fontFamily: 'Vazir'}} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle  id="form-dialog-title"><span style={{direction: 'rtl',fontFamily: 'Vazir',position: 'absolute',right: '36%',top: '10%'}}>ویرایش کلاس</span></DialogTitle>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            variant="outlined"
            label="اسم کلاس"
            type="text"
            name="name"
            fullWidth
            variant="standard"
            value={this.state.name}
            onChange={this.handleChange}
            InputLabelProps={{style:{fontFamily: 'Vazir'}}}
            InputProps={{
              style:{fontFamily: 'Vazir'}
          }}
            
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="توضیحات کلاس"
            type="text"
            fullWidth
            variant="standard"
            value={this.state.description}
            name="description"
            onChange={this.handleChange}
            InputLabelProps={{style:{fontFamily: 'Vazir'}}}
            InputProps={{
              style:{fontFamily: 'Vazir'}
          }}
          />
          <div style={{margin: '4% -3% 0% 0%',textAlign: 'right',direction: 'rtl'}}><Checkbox
              defaultChecked
              color="primary"
              onChange={handleChange}
              inputProps={{ 'aria-label': 'secondary checkbox' }}
          />تغییر رمز کلاس
          </div>
          
        </DialogContent>

        <DialogActions>
          <Button style={{fontFamily: 'Vazir'}} onClick={handleClose}>انصراف</Button>
          <Button style={{fontFamily: 'Vazir'}} onClick={handleSubmit}>ویرایش</Button>
        </DialogActions>
      </Dialog>
      </M_RTL>
      </Material_RTL>
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
  }
}));
export default (props) => {
  const classes = useStyles();
  const open = React.useState(false);
  const check = React.useState(false);
  const classId= props.classId;
  return (        
      <DialogEditClass classes={classes} open={open} check={check} classId={classId}/>    
  )
}