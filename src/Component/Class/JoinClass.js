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

export default function FormDialog() {
  const [open, setOpen] = React.useState(true);
  const [code , setCode] = React.useState(null);
  const [notFound , setNotfound] = React.useState(false);

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
          window.location.href = "/class" ;
        })
        .catch(e =>{  
              setNotfound(true);
        });
  }

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
                onChange = {(e) => {
                  setCode(e.target.value);
                }}
                label="کد کلاس"
                type="email"
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