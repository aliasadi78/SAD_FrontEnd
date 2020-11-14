import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import tokenConfig from '../utils/tokenConfig';
import serverURL from '../utils/serverURL' ;
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios' ;

export default class LogOutDialog extends Component {

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
              <h5 dir="rtl" style={{fontFamily: 'Vazir'}}> می خواهید از سایت خارج شوید ؟ </h5>
          </DialogTitle>   
          <DialogActions>
            <Button style={{fontFamily: 'Vazir'}} onClick={() => Logout()} color="primary">
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

function Logout (){
    const token = localStorage.getItem('token');    
    console.log(token);
    axios.post( serverURL() + "user/logout" , 
          JSON.stringify({}) , tokenConfig() )
          .then(res =>{
            console.log(res);
            localStorage.removeItem('token');
            window.location.href = "/signIn" ;
          })
}
