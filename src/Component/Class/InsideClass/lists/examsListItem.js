import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
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
  const history = useHistory();

  return (
    <div className={classes.root}>
      <Paper elevation={props.elevation} className={classes.paper}>
        <Grid container spacing={2}
          direction="row"
          justify="center"
          alignItems="center"
        >
            <Grid item xs = {4} className={classes.grid}>
              {props.isAdmin == false ?
                <Button variant="contained" className = {classes.button}>          
                    <h5 style={{fontFamily: 'Vazir' , color : '#1CA0A0'}}>                        
                    مشاهده 
                    </h5>                    
                </Button>
                :
                <Button variant="contained" className = {classes.button} onClick={()=> {
                  // history.push("/EditExam/"+ props.classId + "/" + props.id);
                  window.location.href = "/EditExam/"+ props.classId + "/" + props.id ;
                }}>          
                    <h5 style={{fontFamily: 'Vazir' , color : '#1CA0A0'}}>                        
                    ویرایش
                    </h5>                    
                </Button>
              }
            </Grid>
            <Grid item xs = {4} className={classes.grid}>
                از 9/9/99 تا 10/9/99
            </Grid>
            <Grid item xs = {4} className={classes.grid}>
                <h6 dir="rtl" component="h1" variant="h6" noWrap className={classes.title} style={{fontFamily: 'Vazir', textAlign : 'right', color : 'white' , marginBottom : 0 }}>                                          
                {props.name}
                </h6>                
            </Grid>            
        </Grid>
      </Paper>      
    </div>
  );
}
