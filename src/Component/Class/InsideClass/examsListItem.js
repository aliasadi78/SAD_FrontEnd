import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  root: {
    // width: '70%',
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  grid:{          
      color : 'white' ,
  },
  paper:{
      padding : theme.spacing(1) ,     
      backgroundColor : '#1CA0A0' 
  },
  button : {
    //   backgroundColor : '#1CA0A0'
    backgroundColor : 'white' ,
    color : '#1CA0A0' ,
    "&:hover": {
        backgroundColor: '#EE6C4D' ,        
        color :'white'
      },
  },
}));

export default function ExamListItem(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={props.elevation} className={classes.paper}>
        <Grid container spacing={2}>
            <Grid item xs = {4} className={classes.grid}>
                <Button variant="contained" className = {classes.button}>
                    <h5 style={{fontFamily: 'Vazir'}}>                        
                    مشاهده 
                    </h5>
                </Button>
            </Grid>
            <Grid item xs = {4} className={classes.grid}>
                9/9/99
            </Grid>
            <Grid item xs = {4} className={classes.grid}>
                <h6 dir="rtl" component="h1" variant="h6" noWrap className={classes.title} style={{fontFamily: 'Vazir', textAlign : 'right'}}>                          
                کوییز 57 ام
                </h6>
            </Grid>            
        </Grid>
      </Paper>      
    </div>
  );
}
