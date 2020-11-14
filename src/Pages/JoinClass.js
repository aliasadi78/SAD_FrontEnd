import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import Material_RTL from "../Component/Material_RTL";
import RTL from '../Component/M_RTL';

export default function FormDialog() {
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Material_RTL>
        <RTL>
          <Dialog open={open} dir='rtl' onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" style={{fontFamily: 'Vazir' , color : 'white' , backgroundColor : '#3D5A80'}}>
              ورود به کلاس
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
                label="کد کلاس"
                type="email"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary" style={{fontFamily: 'Vazir'}}>
                انصراف
              </Button>
              <Button onClick={handleClose}onClick={(e)=> {JoinClass(e.target.value)}} color="primary" style={{fontFamily: 'Vazir'}}>
                ورود
              </Button>
            </DialogActions>
          </Dialog>
        </RTL>
      </Material_RTL>
    </div>
  );
}


function JoinClass (classId){
  const token = localStorage.getItem('token');
  axios.post('https://parham-backend.herokuapp.com/class/join',
      {
        "classId": {classId}
      },{
        headers: {
          'Authorization': token 
        }
      })
      .then(res => {
        window.location.href = "/class" ;
      });
}