import React from 'react';
import clsx from 'clsx';
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
import Button from '@material-ui/core/Button';

import NewClassDialog from '../Class/NewClassPage' ;
import ClassesPage from '../Class/ClassesPage' ;
import JoinClassDialog from '../Class/JoinClass' ;
// ------------------------
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ClassIcon from '@material-ui/icons/Class';

import LogOutDialog from '../User/LogoutDialog';
import QuestionBank from '../Question/QuestionBank';
import Collapse from '@material-ui/core/Collapse';
import Questions from '../Question/Questions';
//----------------
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import BallotIcon from '@material-ui/icons/Ballot';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonalForms from '../User/EditProfile';

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
    notDialog : {      
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
    const [component , setComponent] = React.useState('classesPage');
    const [open, setOpen] = React.useState(false);
    const [currentComponent , setCurrentComponent] = React.useState(false);

    const [openUserDrawerMethod , setopenUserDrawerMethod ] = React.useState(false);
    const handleUserDrawerMenuClick = () => {
      setopenUserDrawerMethod(!openUserDrawerMethod);
    };
    const handleDrawerOpen = () => {
      setOpen(true);      
    };

    const handleDrawerClose = () => {
      setOpen(!open);
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

            <Button variant="contained" color="white"
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
                // setCurrentComponent(component);
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

              <ListItem button className={classes.nested}  onClick={() => setComponent('classesPage')}>
                <ListItemIcon>
                <ClassIcon style={{ color: "#3D5A80" }} />
                </ListItemIcon>
                <ListItemText  style={{fontFamily: 'Vazir'}} >
                  <Typography variant="button" style={{ color: "#3D5A80"  ,fontFamily: 'Vazir' }}>
                    کلاس ها
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
        <main className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            {/* <Grid container spacing={3}>              
              <Grid item xs={12}>                                */}
              {
                component === 'editProfile' ?
                // <VerticalTabs />                
                      <PersonalForms />                    
                :
                component === 'QuestionBank' ?
                <QuestionBank />
                :
                // component == 'logout' ?                
                component === 'questions' ?                
                <Questions />   
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
                component == 'logout' &&
                <LogOutDialog/> // logout dialog                                
                // <VerticalTabs />
                // question Bank
              }                                                           
              {/* </Grid>              
            </Grid> */}            
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
        <PersonalForms />                    
        :
        component === 'questionBank' ?
        <PersonalForms /> // replace it with question bank
        :
        component === 'classesPage' &&
        <ClassesPage />
      }   
    </div>
  );
}
