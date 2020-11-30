import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios' ;
import serverURL from '../../../utils/serverURL' ;
import tokenConfig from '../../../utils/tokenConfig' ;
import { LightenDarkenColor } from 'lighten-darken-color'; 
import CircularProgress from '@material-ui/core/CircularProgress';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PostListItem from './postListItem';
import DialogNote from './DialogNote';

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
        paddingTop : theme.spacing(1)
    },    
}))

export default function Notelist (props){
    
    const elevation = 2 ;     
    const classes = useStyles();
    const [noteList , setNoteList] = React.useState([]);        
    const [noteListLoad , setNoteListLoad] = React.useState(true);
    
    //get class note list-----------------------------------------------------------
    axios.get(serverURL() + "class/" + props.classId + "/notes" , tokenConfig() )
    .then(res => {
      setNoteList([...res.data.classNotes]);      
      setNoteListLoad(false);          
    })
    .catch(err => {
      console.log("Not Found");   
      console.log(err)     
    });

    return (
        <Grid item xs={12} sm={12}  lg={6} className = {classes.grid}>

        <Grid container xs={12} >
            <Grid item xs={4} ></Grid>
                <Grid item xs={4} >

                <Paper elevation = {elevation} className = {classes.ListTitle}>                          
                    <h5 style={{fontFamily: 'Vazir' }}>                                                      
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
                                                                
            <Paper elevation = {elevation}  className = {classes.ElanPaper} style={{width : 'inherit'}}>                      
                <Grid item>                            
                    {/* <Button variant="contained" color="primary" className = {classes.addButton} > */}
                    <h5 style={{fontFamily: 'Vazir'}}>
                        
                        <DialogNote classId={props.classId}/>
                    </h5>   
                    {/* </Button>                             */}
                </Grid>     

                <Grid item>                            
                    <div>
                    {
                        noteListLoad == true ?
                        <CircularProgress className = {classes.progressCircle} variant="static" value={100} />
                        :                                
                        noteList.map((m) => 
                        <PostListItem 
                            isAdmin = {props.isAdmin}
                            title = {m.title}                                     
                            content = {m.body}
                            CreatorName = {m.creator.firstname + " " + m.creator.lastname}  
                            noteId = {m.classNoteId}  
                            classId = {props.classId}
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