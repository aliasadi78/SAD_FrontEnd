import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import moment from "moment" ;
import ExamAttendees from '../../../Exam/ExamCorrection/ExamAttendees';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ; 
import {
  faHourglassEnd
} from "@fortawesome/free-solid-svg-icons";
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
              
               {moment(props.start).isAfter(moment(props.now)) && props.isAdmin == false ?
                  <Button variant="contained" className = {classes.button} onClick={()=>{                                      
                  }}> 
                    <FontAwesomeIcon icon={faHourglassEnd} />
                  </Button>                                
                  :!moment(props.end).isAfter(moment(props.now)) && props.isAdmin == true ?
                    <ExamAttendees
                      examId = {props.id}
                    />
                  :
                    <Button variant="contained" className = {classes.button} onClick={()=>{                  
                      history.push(moment(props.end).isAfter(moment(props.now)) && props.isAdmin == false ?
                        "/exam/" + props.id + "/questions"
                        : !moment(props.end).isAfter(moment(props.now)) && props.isAdmin == false ?
                        "/exam/review/" + props.id + "/questions"
                        : moment(props.end).isAfter(moment(props.now)) && props.isAdmin == true &&
                        "/EditExam/" + props.classId + "/" + props.id );                      
                    }}> 
                      <h5 style={{fontFamily: 'Vazir' , color : '#1CA0A0'}}>                                               
                        {moment(props.end).isAfter(moment(props.now)) && props.isAdmin == false ?
                          "شرکت "
                          : !moment(props.end).isAfter(moment(props.now)) && props.isAdmin == false ?
                          "مرور"
                          : moment(props.end).isAfter(moment(props.now)) && props.isAdmin == true &&
                          "ویرایش"
                        }                      
                      </h5>
                    </Button>                                                 
              }
            </Grid>
            <Grid item xs = {4} className={classes.grid}>
                در
                {moment(props.start).format("L")}
               ساعت  {moment(moment(props.start).format().replace("+03:30" , '')).format("LT") }
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
