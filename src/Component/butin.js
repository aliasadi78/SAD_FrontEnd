import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LoadingButton from '@material-ui/lab/LoadingButton';
import Axios from 'axios';
import SignIn from './Signin'
const useStyles = makeStyles((theme) => ({
  root: {
    '& button': {
      margin: theme.spacing(1),
    },
  },


  switch: {
    display: 'block',
  },
}));

export default function LoadingButtonsTransition(props) {
  const classes = useStyles();
  const [pending, setPending] = React.useState(false);
  function handleClick() {
    setPending(true);
  }
  function handleSubmit(e){
    e.preventDefault();
    setPending(true);
    Axios.post("http://parham-backend.herokuapp.com/user/signup", props)
        .then(result => {
            console.log(result);
            console.log("good");
            const token = "Bearer" + result.data.token;
            localStorage.setItem('token', token);
            localStorage.getItem('token');
        }).catch(error => {
        console.log(error);
        console.log("bad");
    })
    
}
  return (
    <div className={classes.root}>
      <LoadingButton onClick={handleSubmit} pending={pending} variant="outlined">
        Submit
      </LoadingButton>
    </div>
  );
}
