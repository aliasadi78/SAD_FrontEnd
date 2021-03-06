import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios' ;
import serverURL from '../../../../utils/serverURL' ;
import tokenConfig from  '../../../../utils/tokenConfig' ;
import AddIcon from '@material-ui/icons/Add';
import IsoIcon from '@material-ui/icons/Iso';
import CircularProgress from '@material-ui/core/CircularProgress';
import ExamListItem from './examsListItem';
import { LightenDarkenColor } from 'lighten-darken-color'; 
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ; 
import {
  faCommentSlash
} from "@fortawesome/free-solid-svg-icons" ;
const useStyles = makeStyles((theme) => ({
    grid:{
        padding : theme.spacing(3),
        marginBottom: theme.spacing(2) , 
    },  
    ListTitle :{
        padding : theme.spacing(1) , 
        marginBottom : theme.spacing(1) ,  
        backgroundColor : '#3D5A80' ,
        color : 'white'
    },
    ElanPaper :{
    marginTop : theme.spacing(2) , 
    backgroundColor : '#e6e6e6' , 
    paddingTop : theme.spacing(1) ,
    paddingBottom : theme.spacing(1)
    },        
    progressCircle :{
        margin : theme.spacing(2) ,
        color : '#1CA0A0'      
    },
    groupbutton :{
        backgroundColor : '#EE6C4D' , 
        color : "white" ,
        "&:hover": {
          backgroundColor: LightenDarkenColor('#EE6C4D', -40) ,        
          color :'white'
        },
      },
}));

export default function Examslist (props){

    const elevation = 2 ;     
    const classes = useStyles();
    const [examList , setExamList] = React.useState([]);
    const [now , setNow] = React.useState(null);
    const [examsListLoad , setExamsListLoad ] = React.useState(true);    

    //پشت سر هم ریکوئست میفرستاد
    componentWillMount:
    if(examsListLoad != false){
        axios.get(serverURL() + "class/" + props.classId + "/exams" , tokenConfig())
        .then(res =>{      
          setExamList([...res.data.exams]); 
          setExamsListLoad(false);                    
        })
        .catch(err=> {
          console.log(err);
        });}

    let history = useHistory();
    
    axios.get(serverURL() + "public/time")
    .then(res => {
      setNow(res.data.date)      
    })
    .catch(err => {

    });

    return (
        <Grid item  xs={4} sm={12}  lg={6} className = {classes.grid}>                                                                
                                                                                  
                  <Grid container xs={12} >                      
                          <Grid item xs={4} ></Grid>
                          <Grid item xs={4} >

                            <Paper elevation = {elevation} className = {classes.ListTitle}>
                              <h5 style={{fontFamily: 'Vazir' , color : 'white'}}>
                                امتحان ها 
                                <IsoIcon />
                              </h5>
                            </Paper>                          
                          </Grid>                              

                          <Grid item xs={4} ></Grid>
                        </Grid>
                  <Grid
                    // item xs={12}   
                    container                 
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing = {1}
                  >     
                                                                        
                    <Paper elevation = {elevation}  className = {classes.ElanPaper} style={{width : '90%'}}>                      
                        { props.isAdmin == true &&
                          <Grid item>                            

                            {/* <Link href="/CreateExam"> */}
                              <Button className={classes.groupbutton}                               
                              onClick={()=>{
                                window.location.href = "/CreateExam/" + props.classId ;
                                // history.push("/createExam/" + props.classId);
                              }}
                              variant="contained" color="primary"  >
                                <h5 style={{fontFamily: 'Vazir', color: 'white'}}>
                                  <AddIcon />
                                  آزمون جدید 
                                </h5>
                              </Button>                            
                            {/* </Link> */}
                          </Grid>                           
                        }
                          <Grid item xs={12}>



                            {
                              examsListLoad == true ?
                              <CircularProgress className = {classes.progressCircle} variant="static" value={100} />
                              :examList.length == 0 ?
                                <div>
                                  <FontAwesomeIcon color = '#BDBDBD' style={{margin : '8px'}} size = '3x' icon = {faCommentSlash} />
                                  <p style={{fontFamily: 'Vazir' , color : '#BDBDBD' }}>
                                      هیچ امتحانی تا الان نداشتیم .
                                  </p>
                                </div>
                              :
                              examList.map( m => 
                                <ExamListItem 
                                  name = {m.name} 
                                  elevation = {elevation}                              
                                  start = {m.startDate}
                                  end = {m.endDate}
                                  id = {m._id}
                                  now = {now}
                                  classId = {props.classId}
                                  isAdmin = {props.isAdmin}
                                />
                              )
                            }                                                        
                          </Grid>     
                                                
                      </Paper>                    
                  </Grid>

              </Grid>   
    );
}