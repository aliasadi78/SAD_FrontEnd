import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import RTL from './M_RTL';
import Material_RTL from './Material_RTL';

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Material_RTL>
          <RTL>
        {/* <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{fontFamily: 'Vazir'}} >
            <h5 style={{fontFamily: 'Vazir'}}>
              {props.text}
            </h5>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" style={{fontFamily: 'Vazir'}} >                      
            <span style={{fontFamily: 'Vazir'}}>ادامه ... </span>
          </Button>          
        </DialogActions>
        </RTL>
        </Material_RTL>
      </Dialog>
    </div>
  );
}
