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
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import VerticalTabs from './../Component/TabMenuEditProfile' ;
import Button from '@material-ui/core/Button';
import LogOutDialog from '../Component/LogoutDialog';
import QuestionBank from '../Component/QuestionBank';
import Collapse from '@material-ui/core/Collapse';
import Questions from '../Component/Question/Questions';
//----------------
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import BallotIcon from '@material-ui/icons/Ballot';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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
      height : '52px' ,               
      justifyContent : 'center'
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
    title: {
      flexGrow: 1,
    },
    nested: {
      paddingRight: theme.spacing(5),
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
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(4),            
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
    const classes = useStyles();
    const [component , setComponent] = React.useState('editProfile');
    const [open, setOpen] = React.useState(false);
    const [openUserDrawerMethod , setopenUserDrawerMethod ] = React.useState(false);
    const handleUserDrawerMenuClick = () => {
      setopenUserDrawerMethod(!openUserDrawerMethod);
    };
    const handleDrawerOpen = () => {
      setOpen(true);      
    };
    const handleDrawerClose = () => {
      setOpen(false);
      setopenUserDrawerMethod(false);
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
              className = {classes.button}>
              ایجاد کلاس
            </Button>
            
            <Button variant="contained" color="#98C1D9"
              style={{fontFamily: 'Vazir'}}
              className = {classes.button}>
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
          <div className={classes.toolbarIcon}>  

          <Typography dir="rtl" component="h1" variant="h6" color="inherit" noWrap className={classes.title} style={{fontFamily: 'Vazir' , color : '#3D5A80'}}>                          
              اسم سایت و لوگوش
          </Typography>
            <IconButton onClick={handleDrawerClose} >
              <ChevronLeftIcon/>
            </IconButton>
          </div>          

          <ListItem button onClick={()=>{
            setComponent('editProfile');
            if(open == true)
              handleUserDrawerMenuClick();
            }}>
            <ListItemIcon>        
              <AccountBoxIcon style={{ color: "#3D5A80" }} />
            </ListItemIcon>
            <ListItemText>
            <Typography variant="button" style={{ color: "#3D5A80"  ,fontFamily: 'Vazir' }}>            
                حساب کاربری
            </Typography>
            </ListItemText>
            {openUserDrawerMethod ? <ExpandLess/> : <ExpandMore />}
          </ListItem>

          <Collapse in={openUserDrawerMethod} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button 
                onClick = {() => setComponent('questions')}
                className={classes.nested}>
                <ListItemIcon>
                  <BallotIcon style={{ color: "#3D5A80" }} />
                </ListItemIcon>
                <ListItemText >
                  <Typography variant="button" style={{ color: "#3D5A80"  ,fontFamily: 'Vazir' }}>            
                    سوالات 
                  </Typography>
                </ListItemText>
              </ListItem>
            </List>
          </Collapse>
          <ListItem button onClick ={()=> setComponent('QuestionBank')}>
            <ListItemIcon>
            <LibraryBooksIcon style={{ color: "#3D5A80" }} />
            </ListItemIcon>
            <ListItemText >
              <Typography variant="button" style={{ color: "#3D5A80"  ,fontFamily: 'Vazir' }}>            
                بانک سوال
              </Typography>
            </ListItemText>
          </ListItem>   

          <ListItem button onClick ={()=> setComponent('logout')} >
            <ListItemIcon>
              <ExitToAppIcon style={{ color: "#3D5A80" }} />        
            </ListItemIcon>  
            <ListItemText >
              <Typography variant="button" style={{ color: "#3D5A80"  ,fontFamily: 'Vazir' }}>            
                خروج
              </Typography>
            </ListItemText>
          </ListItem>           
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            {/* <Grid container spacing={3}>              
              <Grid item xs={12}>                                */}
              {
                component === 'editProfile' ?
                <VerticalTabs />
                :
                component === 'QuestionBank' ?
                <QuestionBank />
                :
                // component == 'logout' ?                
                component === 'questions' ?                
                <Questions />              
                :  
                component == 'logout' ?                
                <LogOutDialog/> // logout dialog                
                :
                <VerticalTabs />
                // question Bank
              }                                                           
              {/* </Grid>              
            </Grid> */}            
          </Container>
        </main>
      </div>
    );
  }