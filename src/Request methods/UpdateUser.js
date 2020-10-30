import React from 'react' ;
import axios from 'axios' ;
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function UpdateUser (props){
    console.log("entered to function"); 
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjk5NTY4ZDZiMjA0ODAwMTdmYjIwOTgiLCJpYXQiOjE2MDM4ODQ2ODV9.2iONCmNdzoYTnaHgGMcStSX6ceWrcvxzi1_vnkoAUek';
    //localStorage.getItem('token');    

    axios.put('https://parham-backend.herokuapp.com/user/update' 
    , {
      password : props.password ,
      firstname : props.firstname ,
      lastname : props.lastname ,
      email : props.email        
    }
    , {headers:
        { 'Authorization': 'Bearer ' + token  } 
    })
    .then(res => {
        console.log('done');
        return(
            <AlertDialog />
        )
    });
  
}

function updateUserAvatar (){
    
}

export default function AlertDialog() {
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>        
        <Dialog
          open={true}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }