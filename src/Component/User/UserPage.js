import React, {Component} from 'react';
import serverURL from '../../utils/serverURL';
import tokenConfig from '../../utils/tokenConfig' ;
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from "@material-ui/core/CssBaseline";
import Material_RTL from "../Material_RTL";
import axios from 'axios' ;
import M_RTL from "../M_RTL";
import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import SpeakerNotesOffIcon from '@material-ui/icons/SpeakerNotesOff';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import UserPageButton from './UserPageButton' ;

class UserPage extends Component{

    constructor(props){
      super(props);    
      this.state = {
        userClasses : [] ,
        dataFound : false
      };                
        
    }

    render(){                    
  
      const classes = this.props.classes;      
      const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);      
      console.log(this.state.userClasses);
      const btnCreateClass = () => {
            return window.location.href = "/NewClassPage" ;
      };
      const btnJoinClass = () => {
        //jaye Dialog box 
            // return window.location.href = "/ClassesPage" ;
          
      };
        return(
          <div> 
                <CssBaseline />
                <Material_RTL>
                    <M_RTL>
                      <div className={classes.paper}>                        
                        <h3 style={{fontFamily: 'Vazir' , textAlign : 'right' , color : '#3D5A80'}} > پنل کاربری </h3>
                          <hr/>
                          {/* <Grid
                            container
                            direction="row"
                            justify="flex-end"
                            alignItems="center"
                          > */}
                            <div style={{fontFamily: 'Vazir'}} className = {classes.classCards}>                                                        
                                <UserPageButton
                                  name = "ویرایش اطلاعات"                                   
                                  url = "/profile/edit" />

                            <UserPageButton
                                  name = "سوالات"                                   
                                  url = "/user/questions" />

                            <UserPageButton
                                  name = "کلاس ها"                                   
                                  url = "/user/classes" />
                                                              
                            </div>
                          {/* </Grid> */}
                        </div>
                    </M_RTL>
                </Material_RTL>
            </div>
        );
    }
}

const drawerWidth = 220;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',      
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',      
    backgroundColor : '#e6e6e6' ,
    justifyContent : 'center' ,

  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),            
  },
  fixedHeight: {
    height: 240,
  },
  button : {
    marginRight : theme.spacing(2) ,       
    backgroundColor : '#98C1D9' ,
    // backgroundColor : '#0e918c',
    "&:hover": {
      backgroundColor: '#EE6C4D' ,
      color : 'white' , 
    },                
  },    
  classCards :{
    justifyContent : 'flex-end' ,
  },
  progressCircle :{
    margin : theme.spacing(2) ,
    color : '#1CA0A0'      
  },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },        
    switch: {
        display: 'block',
    },
    paper: {
      marginTop: theme.spacing(1),
      // display: 'flex',
      direction: 'row',
      justify: 'flex-start',      
      alignItems : 'left' ,       
      backgroundColor: 'white',
      padding: '10px',
      borderRadius: '10px',      
      opacity: '95%' ,       
  },
}));
export default () => {    

    const classes = useStyles();
    const o = React.useState(false)
    return (        
        <UserPage classes={classes} o={o}/>    
    )
}