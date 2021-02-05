import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ExamAttendeesList from './ExamAttendeesList' ;
import { makeStyles } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  button : {
    backgroundColor : 'white' ,
    color : '#1CA0A0' ,
    "&:hover": {
        backgroundColor: '#EE6C4D' ,        
        color :'white'
      }
  }
}))

export default function ExamAttendees(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      
      <Button variant="contained" className = {classes.button}  onClick={handleClickOpen} > 
        <h5 style={{fontFamily: 'Vazir' , color : '#1CA0A0'}}>                                               
          تصحیح
        </h5>
      </Button> 

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"        
      >
        <DialogTitle id="alert-dialog-slide-title" >          
          <h3 style={{fontFamily: 'Vazir' , textAlign : 'center' , color : '#3D5A80'}} >
            شرکت کنندگان در آزمون            
          </h3>
        </DialogTitle>
        <DialogContent>          
          <ExamAttendeesList
            examId = {props.examId}
          />
        </DialogContent>        
      </Dialog>
    </div>
  );
}
