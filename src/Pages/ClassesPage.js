import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Material_RTL from "../Component/Material_RTL";
import M_RTL from "../Component/M_RTL";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems, secondaryListItems } from '../AppBar/listItems';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import { shadows } from '@material-ui/system';


class ClassesPage extends Component{
    render(){
      const [open, setOpen] = this.props.o;
      const handleDrawerOpen = () => {
        setOpen(true);
      };
      const handleDrawerClose = () => {
        setOpen(false);
      };
      const classes = this.props.classes;
      const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
        
      const btnCreateClass = () => {
            return window.location.href = "/NewClassPage" ;
      };
      const btnJoinClass = () => {
            return window.location.href = "/ClassesPage" ;
      };
        return(
          <div>
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
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.ToolbarSpace}>                          
            </Typography>

            <Button variant="contained" color="#98C1D9"
              style={{fontFamily: 'Vazir'}}
              className = {classes.button}
              onClick={btnCreateClass}>
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
          <div className={classes.toolbarIcon} >  

          <Typography dir="rtl" component="h1" variant="h6" color="inherit" noWrap className={classes.title} style={{fontFamily: 'Vazir' , color : '#3D5A80'}}>                          
              اسم سایت و لوگوش
          </Typography>
            <IconButton onClick={handleDrawerClose} >
              <ChevronLeftIcon/>
            </IconButton>
          </div>
          <List>{mainListItems}</List>          
          {/* <Divider /> */}
          {/* <List>{secondaryListItems}</List> */}
        </Drawer>
            <Container  component="main" maxWidth="md" style={{fontFamily: 'Vazir',marginTop: '7%'}}>
                <CssBaseline />
                <Material_RTL>
                    <M_RTL>
                      <div className={classes.paper}>
                        {/* <Button 
                        className={classes.button}
                        onClick={btnCreateClass}
                        variant="contained"
                        size="large"
                        style={{fontFamily: 'Vazir',margin: '0 0 0 0',width: '25%',height: '50px'}}>
                            ایجاد کلاس
                        </Button>
                        <Button 
                        className={classes.button}
                        onClick={btnJoinClass}
                        variant="contained"
                        size="large"
                        style={{fontFamily: 'Vazir',margin: '0 5% 0 0',width: '25%',height: '50px'}}>
                            ورود به کلاس
                        </Button>
                        <br/> */}
                        <h3 style={{fontFamily: 'Vazir'}} >لیست کلاس ها</h3>
                          <hr/>
                          <div style={{fontFamily: 'Vazir'}}>
                            <Card className={classes.card} variant="outlined" >
                                <CardContent>
                                  <Typography
                                    variant="h5" 
                                    component="h4"
                                    className={classes.title}
                                    color="black"
                                    gutterBottom
                                  > 
                                    ریاضی دهم
                                  </Typography>
                                  <Typography 
                                  className={classes.pos} 
                                  color="black">
                                    نام دبیر: صفاری
                                  </Typography>
                                </CardContent>
                                <CardActions>
                                  <Button variant="contained" size="small" className={classes.btn}>ورود به کلاس</Button>
                                </CardActions>
                            </Card>
                            <Card className={classes.card} variant="outlined">
                                <CardContent>
                                  <Typography
                                    variant="h5" 
                                    component="h4"
                                    className={classes.title}
                                    color="black"
                                    gutterBottom
                                  >
                                    فیزیک دهم
                                  </Typography>
                                  <Typography 
                                  className={classes.pos} 
                                  color="black">
                                    نام دبیر: امانی
                                  </Typography>
                                </CardContent>
                                <CardActions>
                                  <Button variant="contained" size="small" className={classes.btn}>ورود به کلاس</Button>
                                </CardActions>
                            </Card>
                            <Card className={classes.card} variant="outlined" >
                                <CardContent>
                                  <Typography
                                    variant="h5" 
                                    component="h4"
                                    className={classes.title}
                                    color="black"
                                    gutterBottom
                                  >
                                    شیمی دهم
                                  </Typography>
                                  <Typography 
                                  className={classes.pos} 
                                  color="black">
                                    نام دبیر: صنیعی
                                  </Typography>
                                </CardContent>
                                <CardActions>
                                  <Button variant="contained"  size="small" className={classes.btn}>ورود به کلاس</Button>
                                </CardActions>
                            </Card>
                          </div>
                        </div>
                    </M_RTL>
                </Material_RTL>
            </Container>
            </div>
        );
    }
}

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
  ToolbarSpace :{
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
  // paper: {
  //   padding: theme.spacing(2),
  //   display: 'flex',
  //   overflow: 'auto',
  //   flexDirection: 'column',            
  // },
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
    card:{
        fontFamily: 'Vazir',
        width: '25%',        
        display: 'inline-block',
        margin: '2%',                
        boxShadow: '0 2px 1px 1px rgba(204, 204, 204, .6)',
        "&:hover": {          
          boxShadow: '0 5px 3px 3px rgba(204, 204, 204, .6)',
        },       
        // backgroundColor : '#E0FBFC',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      // fontSize: 22,
      fontFamily: 'Vazir',
    },
    btn:{
        fontFamily: 'Vazir',
        backgroundColor : '#0e918c' ,
        "&:hover": {
          backgroundColor: '#EE6C4D' ,
          color : 'white' , 
        },          
    },
    pos: {
      marginBottom: 12,
      fontFamily: 'Vazir',
    },
    switch: {
        display: 'block',
    },
    paper: {
      marginTop: theme.spacing(1),
      // display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',      
      color : '#3D5A80' , 
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
        <ClassesPage classes={classes} o={o}/>    
    )
}