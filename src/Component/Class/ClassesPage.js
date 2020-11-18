import React, {Component} from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import Material_RTL from "../Material_RTL";
import M_RTL from "../M_RTL";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

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
        //jaye Dialog box 
            // return window.location.href = "/ClassesPage" ;
          
      };
        return(
          <div> 
                <CssBaseline />
                <Material_RTL>
                    <M_RTL>
                      <div className={classes.paper}>                        
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
                                  <Button variant="contained" onClick={()=>{
                                    window.location.href = "/class" ;
                                  }} size="small" className={classes.btn}>ورود به کلاس</Button>
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
                                  <Button variant="contained" onClick={()=>{
                                    window.location.href = "/class" ;
                                  }} size="small" className={classes.btn}>ورود به کلاس</Button>
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
                                  <Button variant="contained" onClick={()=>{
                                    window.location.href = "/class" ;
                                  }}  size="small" className={classes.btn}>ورود به کلاس</Button>
                                </CardActions>
                            </Card>
                          </div>
                        </div>
                    </M_RTL>
                </Material_RTL>
            {/* </Container> */}
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