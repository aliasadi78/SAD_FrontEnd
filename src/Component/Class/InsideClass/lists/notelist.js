import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios' ;
import serverURL from '../../../../utils/serverURL' ;
import tokenConfig from  '../../../../utils/tokenConfig' ;
import { LightenDarkenColor } from 'lighten-darken-color'; 
import CircularProgress from '@material-ui/core/CircularProgress';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PostListItem from './noteListItem';
import DialogNote from './../Dialogs/DialogNote';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ; 
import {
  faBellSlash
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
    progressCircle :{
        margin : theme.spacing(2) ,
        color : '#1CA0A0'      
    },
    ElanPaper :{
        marginTop : theme.spacing(2) ,         
        paddingTop : theme.spacing(1) ,
        paddingBottom : theme.spacing(1) , 
        backgroundColor : '#e6e6e6'
    },    
}))

export default function Notelist (props){
    
    const elevation = 2 ;     
    const classes = useStyles();
    const [noteList , setNoteList] = React.useState([]);        
    const [noteListLoad , setNoteListLoad] = React.useState(true);
    //پشت سر هم ریکوئست میفرستاد
    componentWillMount:
        if(noteListLoad != false){
            axios.get(serverURL() + "class/" + props.classId + "/notes" , tokenConfig() )
            .then(res => {
                console.log("axios get notes!!!!!!!")
              setNoteList([...res.data.classNotes]);  
              console.log(noteList)    
              setNoteListLoad(false);          
            })
            .catch(err => {
              console.log("Not Found");   
              console.log(err)     
            });
        }
    return (
        <Grid item xs={4} sm={12}  lg={6} className = {classes.grid}>

        <Grid container xs={12} >
            <Grid item xs={4} ></Grid>
                <Grid item xs={4} >

                <Paper elevation = {elevation} className = {classes.ListTitle}>                          
                    <h5 style={{fontFamily: 'Vazir' , color : 'white'}}>                                                      
                    اعلان ها 
                    <NotificationsIcon />
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
                {props.isAdmin == true &&    
                    <Grid item>                                                
                        <h5 style={{fontFamily: 'Vazir'}}>
                            {/* //پراپس ها برای هندل کردن اپدیت شدن که یه راه بهتر وجود داشت:) */}
                            <DialogNote classId={props.classId} noteListLoad={[noteListLoad,setNoteListLoad]}/>
                        </h5>                       
                    </Grid>     
                }
                <Grid item xs={12}>                            
                    <div>
                    {
                        noteListLoad == true ?
                        <CircularProgress className = {classes.progressCircle} variant="static" value={100} />
                        :noteList.length == 0 ?
                            <div>
                              <FontAwesomeIcon color = '#BDBDBD' style={{margin : '8px'}} size = '3x' icon = {faBellSlash} />
                              <p style={{fontFamily: 'Vazir' , color : '#BDBDBD' }}>
                                  هیچ اعلانی تا الان نداشتیم .
                              </p>
                            </div>
                        :                             
                        noteList.map((m) => 
                        <PostListItem 
                            isAdmin = {props.isAdmin}
                            title = {m.title}                                     
                            content = {m.body}
                            CreatorName = {m.creator.firstname + " " + m.creator.lastname}  
                            noteId = {m.classNoteId}  
                            classId = {props.classId}
                            noteListLoad={[noteListLoad,setNoteListLoad]}
                            />
                        ) 
                    }                              
                    </div>                               
                </Grid>                           
            </Paper>
        </Grid>
        </Grid>
    );              

}