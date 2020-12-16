import React from 'react';
import tokenConfig from '../../utils/tokenConfig';
import serverURL from   '../../utils/serverURL';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import Material_RTL from "../Material_RTL";
import RTL from '../M_RTL';
import AlertDialog from '../Dialog' ;
import { makeStyles } from "@material-ui/core/styles";

export default function JoinClass(props) {

  const [open, setOpen] = React.useState(false);
  const [code , setCode] = React.useState(null);
  const [notFound , setNotfound] = React.useState(false);
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const JoinClass = (classId) => {
    
    const a = {
      "classId": classId
    };

    const ajson = JSON.stringify(a);
  
    axios.post(serverURL() + "class/join", ajson,  tokenConfig())
        .then(res => {
          window.location.href = "/user/classes" ;
        })
        .catch(e =>{  
              setNotfound(true);
        });
  }

  return (
    <div>
      //دکمه ورود به کلاس اینجاست به جای داشبودر اونجا ایمپورتش کردم
      <Button onClick={()=>{setOpen(true)}} className = {classes.button}>
        ورود به کلاس
      </Button>
      <Material_RTL>
        <RTL>
          <Dialog open={open} dir='rtl' onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle style={{ color : 'white' , backgroundColor : '#3D5A80' , textAlign : "center"}}>
              <span style={{fontFamily: 'Vazir' ,}}>
              ورود به کلاس
              </span>
            </DialogTitle>
            <DialogContent>
              <DialogContentText style={{fontFamily: 'Vazir' , color:'#4d4d4d'}} >
                با وارد کردن کد کلاس وارد شوید : 
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                style={{fontFamily: 'Vazir'}}
                id="name"
                variant = "outlined"
                onChange = {(e) => {
                  setCode(e.target.value);
                }}
                label="کد کلاس"
                type="text"
                InputLabelProps={{style:{fontFamily: 'Vazir'}}}
                InputProps={{
                  style:{fontFamily: 'Vazir'},
                }}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary" style={{fontFamily: 'Vazir'}}>
                انصراف
              </Button>
              <Button onClick={()=> {JoinClass(code)}} color="primary" style={{fontFamily: 'Vazir'}}>
                ورود
              </Button>

              {
                notFound == true ?
                <AlertDialog text = "کلاس یافت نشد." />
                :
                <p></p>
              }
            </DialogActions>
          </Dialog>
        </RTL>
      </Material_RTL>
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  button : {
  marginRight : theme.spacing(2) ,       
  backgroundColor : '#98C1D9' ,
  fontFamily: 'Vazir',
  color: 'black',
  "&:hover": {
    backgroundColor: '#EE6C4D' ,
    color : 'white' , 
    },                
  },
}))