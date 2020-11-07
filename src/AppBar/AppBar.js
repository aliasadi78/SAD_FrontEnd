import React from 'react';
import clsx from 'clsx';
import Box from '@material-ui/core/Box' ;
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import VerticalTabs from './../Component/TabMenuEditProfile' ;
import Button from '@material-ui/core/Button';
import NewClassDialog from '../Pages/NewClassPage' ;
import ClassesPage from '../Pages/ClassesPage' ;
import JoinClassDialog from '../Pages/JoinClass' ;
// ------------------------
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ClassIcon from '@material-ui/icons/Class';

const drawerWidth = 220;
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',      
    },
    toolbar: {
      paddingRight: 7, // keep right padding when drawer closed            
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      height: '54px' ,      
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1 ,  //رو این کار کن 
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),      
      backgroundColor : '#3D5A80' ,      
    },
    appBarShift: {
      marginRight : drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,      
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),      
    },
    menuButton: {
      marginRight: 0,      
    },
    menuButtonHidden: {
      display: 'none',
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
    appBarSpacer: theme.mixins.toolbar,
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

export default function DashboardEditProfile() {

    const [component , setComponent] = React.useState('editProfile');
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [currentComponent , setCurrentComponent] = React.useState(false);

    const handleDrawerOpen = () => {
      setOpen(true);
    };

    const handleDrawerClose = () => {
      setOpen(false);
    };

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);    
  
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)} dir="rtl" >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>                          
            </Typography>

            <Button variant="contained" color="#98C1D9"
              style={{fontFamily: 'Vazir'}}
              className = {classes.button}
              onClick={() => {                
                setCurrentComponent(component);
                setComponent('newClassDialog');
              }} >
              ایجاد کلاس
            </Button>
            
            <Button variant="contained" color="#98C1D9"
              style={{fontFamily: 'Vazir'}}
              className = {classes.button}
              onClick={()=>{                
                setCurrentComponent(component);
                setComponent('joinClassDialog');
              }}
              >
              ورود به کلاس 
            </Button>

          </Toolbar>
        </AppBar> 
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

          <Typography dir="rtl" component="h1" variant="h6" color="inherit" noWrap className={classes.title} style={{fontFamily: 'Vazir' , color : '#3D5A80'}}>                          
              اسم سایت و لوگوش
          </Typography>
            <IconButton onClick={handleDrawerClose} >
              <ChevronLeftIcon/>
            </IconButton>
          </div>
          {/* <List>{mainListItems}</List>           */}
          <ListItem button onClick={() => setComponent('editProfile')}>
            <ListItemIcon>        
              <AccountBoxIcon style={{ color: "#3D5A80" }} />
            </ListItemIcon>
            <ListItemText  primary="حساب کاربری "  />
          </ListItem>
          <ListItem button  onClick={() => setComponent('questionBank')}>
            <ListItemIcon>
            <LibraryBooksIcon style={{ color: "#3D5A80" }} />
            </ListItemIcon>
            <ListItemText style={{fontFamily: 'Vazir'}} primary="بانک سوال" />
          </ListItem>
          <ListItem button  onClick={() => setComponent('classesPage')}>
            <ListItemIcon>
            <ClassIcon style={{ color: "#3D5A80" }} />
            </ListItemIcon>
            <ListItemText  style={{fontFamily: 'Vazir'}} primary="کلاس ها" />
          </ListItem>    
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            {
              component === 'editProfile' ?
              <VerticalTabs />
              :
              component === 'questionBank' ?
              <VerticalTabs /> // replace it with question bank
              :
              component === 'classesPage'?
              <ClassesPage />
              :
              component === 'newClassDialog' ?              
              <SetComponent component = {currentComponent} dialog = "newClass" />
              :
              component === 'joinClassDialog'?
              <JoinClassDialog />
              :
              <VerticalTabs />              
            }
            
          </Container>
        </main>
      </div>
    );
  }

function SetComponent  (props){
  const component = props.component ;    
  const dialog = props.dialog ;
  return (              
    <div>
      {
        dialog === "newClass" ?
        <NewClassDialog />
        :
        <JoinClassDialog />
      }      
      {
        component === 'editProfile' ?
        <VerticalTabs />
        :
        component === 'questionBank' ?
        <VerticalTabs /> // replace it with question bank
        :
        component === 'classesPage'?
        <ClassesPage />
        :
        <VerticalTabs />  
      }   
    </div>
  );
}
