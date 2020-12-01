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
    const [examsListLoad , setExamsListLoad ] = React.useState(true);
    
    //get class exams list ----------------------------------------------------------         
    axios.get(serverURL() + "class/" + props.classId + "/exams" , tokenConfig())
    .then(res =>{      
      setExamList([...res.data.exams]); 
      setExamsListLoad(false);
      // console.ChevronLeftIcong(res);
    })
    .catch(err=> {
      console.log(err);
    });

    return (
        <Grid item  xs={4} sm={12}  lg={6} className = {classes.grid}>                                                                
                                                                                  
                  <Grid container xs={12} >                      
                          <Grid item xs={4} ></Grid>
                          <Grid item xs={4} >

                            <Paper elevation = {elevation} className = {classes.ListTitle}>
                              <h5 style={{fontFamily: 'Vazir'}}>
                                امتحان ها 
                                <IsoIcon />
                              </h5>
                            </Paper>                          
                          </Grid>                              

                          <Grid item xs={4} ></Grid>
                        </Grid>
                  <Grid
                    // item xs={12}                    
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing = {1}
                  >     
                                                                        
                    <Paper elevation = {elevation}  className = {classes.ElanPaper}>                      
                        { props.isAdmin == true &&
                          <Grid item>                            
                              <Button className={classes.groupbutton} variant="contained" color="primary"  >
                                <h5 style={{fontFamily: 'Vazir'}}>
                                  <AddIcon />
                                  آزمون جدید 
                                </h5>
                              </Button>                            
                          </Grid>                           
                        }
                          <Grid item xs={12}>
                            {
                              examsListLoad == true ?
                              <CircularProgress className = {classes.progressCircle} variant="static" value={100} />
                              :
                              examList.map( m => 
                                <ExamListItem 
                                  name = {m.name} 
                                  elevation = {elevation}                              
                                  start = {m.startDate}
                                  end = {m.endDate}
                                />
                              )
                            }                                                        
                          </Grid>     
                                                
                      </Paper>                    
                  </Grid>

              </Grid>   
    );
}