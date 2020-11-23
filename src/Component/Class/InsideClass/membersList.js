import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { LightenDarkenColor } from 'lighten-darken-color'; 
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems } from './insideClassDrawerList';
import List from '@material-ui/core/List';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import axios from 'axios' ;
import serverURL from '../../../utils/serverURL' ;
import tokenConfig from '../../../utils/tokenConfig' ;

import Material_RTL from "../../Material_RTL";
import M_RTL from "../../M_RTL";

const drawerWidth = 220;
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex', 
    },
    toolbar: {
      paddingRight: 7, // keep right padding when drawer closed            
    },
    grid:{
      padding : theme.spacing(3)
    },
    appBarSpacer: theme.mixins.toolbar,
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      height: '54px' ,      
      backgroundColor : '#3D5A80' ,
    },
    notDialog : {      
      display: 'none',
    },
    title: {
      flexGrow: 1,      
    },
    drawerPaper: {
      // position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),      
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),      
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(7),
      },
    },
    classListPaper :{

    },
    groupbutton :{
      backgroundColor : '#EE6C4D' , 
      color : "white" ,
      "&:hover": {
        backgroundColor: LightenDarkenColor('#EE6C4D', -40) ,        
        color :'white'
      },
    },
    content :{
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: 0,
        width : '100%' ,
        overflow : 'atuo' , 
        flexGrow : 1,
    },  
    classContent :{
      marginTop : theme.spacing(4)
    },  
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
    },
    container: {
      paddingTop: '18px',
      paddingBottom: theme.spacing(4),      
      width : '100%' ,               
    },
    paperList :{
      width : '100%'      
    },
    paper: {  
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',            
    },
    fixedHeight: {
      height: 240,
    },
    button : {
      marginRight : theme.spacing(2) ,       
      backgroundColor : '#98C1D9' ,
      "&:hover": {
        backgroundColor: '#EE6C4D' ,
        color : 'white' , 
      },                
    },
  }));

export default function MembersList(props) {
        
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const classId = props.match.params.classId ;    
    const handleDrawer = () => {
      setOpen(!open);
    };

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);    
  
    // axios.get(serverURL() + "class/" + classId + "/members", 
    axios.get(serverURL() + "class/" + classId + "/members" , 
    tokenConfig())
    .then(res => {
      console.log(res);
    })
    .catch(e =>{
      console.log("ridi");
    });

    return (
      <div className={classes.root}>
        <CssBaseline />

        <Drawer
          variant="permanent"
          anchor ="right"
          dir = "rtl"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon} >  

          <Typography dir="rtl" component="h1" variant="h6" noWrap className={classes.title} style={{fontFamily: 'Vazir' , color : 'white', textAlign : 'right'}}>                          
              اسم سایت و لوگوش
          </Typography>
            <IconButton onClick={handleDrawer} style={{color : 'white'}} >
              <ChevronLeftIcon/>
            </IconButton>
          </div>
          <List>{mainListItems}</List>                    
        </Drawer>
        <main className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}>          
          
        </main>
      </div>
    );
  }

  function redirectTo(){

  }