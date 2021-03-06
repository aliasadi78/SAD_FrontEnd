import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import axios from 'axios' ;
import serverURL from '../../utils/serverURL';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Avatar from '@material-ui/core/Avatar';
import tokenConfig from '../../utils/tokenConfig';
import Button from '@material-ui/core/Button';
import UserPage from '../User/UserPage' ;
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ClassesPage from '../Class/ClassesPage/ClassesPage' ;
import LogOutDialog from '../User/LogoutDialog';
import QuestionBank from '../Question/QuestionBank';
import Questions from '../Question/Questions';
import PersonalForms from '../User/EditProfile';
import DrawerList from './DrawerList';
import JoinClass from '../Class/JoinClass';
import NewClassDialog from '../Class/NewClassPage';
import { useDispatch } from 'react-redux' ;
import {handleMenuOpen} from './DashboardSlice' ;

const drawerWidth = 220;
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',              
      backgroundColor : 'white'        
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
      backgroundColor : 'white'   
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
    drawerPaper: {
      // position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),      
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: 0,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
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
      // color : 'white' , 
      "&:hover": {
        backgroundColor: '#EE6C4D' ,
        color : 'white' , 
      },                
    },
  }));

export default function Dashboard() {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);    
    const [openJoinClassDialog, setOpenJionClassDialog] = React.useState(false);
    const [openCreateClassDialog, setOpenCreateClassDialog] = React.useState(false);

    const [userFullName , setUserFullname] = React.useState(null);
    const [username , setUsername] = React.useState(null);
    const [avatar , setAvatar] = React.useState(null);

    axios.get(serverURL() + "user" , tokenConfig())
    .then((res) => {
        setUserFullname(res.data.user.firstname + " " + res.data.user.lastname);
        setUsername(res.data.username);
    })
    .catch(() => {

    });

    axios.get(serverURL() + "user/avatar" , tokenConfig())
    .then((res) => {
      setAvatar(res.data.avatar)
    })
    .catch(() => {

    });

    const [openUserDrawerMethod , setopenUserDrawerMethod ] = React.useState(false);

    const dispatch = useDispatch();

    const handleUserDrawerMenuClick = () => {
      setopenUserDrawerMethod(!openUserDrawerMethod);
    };
    const handleDrawerOpen = () => {
      setOpen(true);      
      dispatch(handleMenuOpen(true));
    };

    const handleDrawerClose = () => {
      setOpen(!open);
      dispatch(handleMenuOpen(false));
    };

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);    
  
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Router>
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


            <a href="/user/page/" >
              <Avatar alt={username} src={avatar} style={{width : '40px' , height : '40px' , margin : '17px' }} />
            </a>

          <p style={{margin : '5px'}} >        
          {userFullName}
          </p>

            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>                          
            </Typography>

            {/* <Button variant="contained" color="white"
              style={{fontFamily: 'Vazir'}}
              className = {classes.button}
              onClick={() => {  
                // setOpenCreateClassDialog(true);
                return (<NewClassDialog/>     )                      
              }} >
              ایجاد کلاس
            </Button>     */}            
            <NewClassDialog/>  
            <JoinClass />      
            {/* <Button variant="contained" color="#98C1D9" 
              style={{fontFamily: 'Vazir'}}
              className = {classes.button}
              onClick={()=>{  
                setOpenJionClassDialog(true);                              
              }}
              >
              ورود به کلاس 
            </Button> */}

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

            <DrawerList />
            {/* // isDrawerOpen = {open} />             */}
        </Drawer>
        
        <main className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            
            {/* {
              openJoinClassDialog == true &&
              <JoinClass />           
            }
              
            {
              openCreateClassDialog == true &&
              <NewClassDialog />
            } */}
            
            <Switch>
              <Route path="/profile/edit"  >
                <PersonalForms />
              </Route>
              <Route path="/questionBank">
                <QuestionBank />
              </Route>
              <Route path="logoutDialog" >
                <LogOutDialog />
              </Route>
              <Route path="/user/classes" >
                <ClassesPage />
              </Route>
              <Route path="/user/questions">
                <Questions />
              </Route>
              <Route path="/user/page/" >
                <UserPage />
              </Route>
            </Switch>        

          </Container>
        </main>

        </Router>
      </div>
    );

  }
