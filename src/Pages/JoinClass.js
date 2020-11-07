import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios' ;

export default class JoinClassDialog extends Component {

  constructor(props){
    super(props);
    this.state = {
      open : true
    };    
  }

  handleClose = () => {
    this.setState(prevstate => {
      return {open : false}
    });
  }

  render(){
    return (
      <div>        
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" >
              <h5 dir="rtl" style={{fontFamily: 'Vazir'}}> اضافه شدن به کلاس جدید </h5>
          </DialogTitle>   
          <DialogContentText>
                <h6 dir="rtl" style={{fontFamily: 'Vazir'}}> با ورود نام کاربری و رمز عبور وارد کلاس شوید </h6>
          </DialogContentText>
          <DialogActions>
            <Button style={{fontFamily: 'Vazir'}} onClick={() => JoinClass()} color="primary">
              بله 
            </Button>
            <Button onClick={this.handleClose} style={{fontFamily: 'Vazir'}} color="primary" autoFocus>
              خیر
            </Button>
          </DialogActions>
        </Dialog>
      </div> 
    );
  }
}

function JoinClass (){

}