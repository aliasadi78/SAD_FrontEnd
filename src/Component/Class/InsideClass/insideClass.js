import React from 'react';
import CreateIcon from '@material-ui/icons/Create';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import MailIcon from '@material-ui/icons/Mail'; 
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { LightenDarkenColor } from 'lighten-darken-color'; 
import { mainListItems , secondaryListItems} from './insideClassDrawerList';
import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import axios from 'axios' ;
import serverURL from '../../../utils/serverURL' ;
import tokenConfig from '../../../utils/tokenConfig' ;

import Material_RTL from "../../Material_RTL";
import M_RTL from "../../M_RTL";
import PostListItem from './postListItem';

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
    Tab:{
      backgroundColor : '#98C1D9' ,
      color : 'white' ,
      marginBottom : theme.spacing(2) ,
      "&:hover": {
        backgroundColor: '#3D5A80' ,
        color : 'white' , 
      },             
    },
    choosedTab :{
      marginBottom : theme.spacing(2) ,
      backgroundColor : '#3D5A80',
      color : 'white' ,       
    }
  }));

export default function InsideClass(props) {

    const [component , setComponent] = React.useState('editProfile');
    const [ list , setList] = React.useState(0);
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const classId = props.match.params.classId ;    
    const handleDrawer = () => {
      setOpen(!open);
    };

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);    
  
    // axios.get(serverURL() + "class/" + classId + "/members", 
    axios.get(serverURL() + "class/" + classId , 
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
          <List>{secondaryListItems}</List>                    


        </Drawer>
        <main className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}>          
          <Container maxWidth="lg" className={classes.container}>  
            <Grid item xs = {12}>
            <Material_RTL>
                    <M_RTL>
              <Paper elevation={2} >
              <Breadcrumbs separator="|" aria-label="breadcrumb">
                <Link color="inherit" href="/" >
                <Typography dir="rtl" variant="h6" noWrap className={classes.title} style={{fontFamily: 'Vazir'}}>                          
                    خانه
                </Typography>
                </Link>
                <Link color="inherit" href="/getting-started/installation/" >
                  <Typography dir="rtl" variant="h6" noWrap className={classes.title} style={{fontFamily: 'Vazir'}}>                          
                      کلاس ها
                  </Typography>
                </Link>
                {/* {props.title} */}
                <Typography dir="rtl" variant="h6" noWrap className={classes.title} style={{fontFamily: 'Vazir'}}>                          
                  ریاضی
                </Typography>
              </Breadcrumbs>
              </Paper>
              </M_RTL>
            </Material_RTL>
            </Grid>            
            <Grid container spacing={3} className={classes.classContent}>
              <Grid item xs={12} sm={12}  lg={6} className = {classes.grid}>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing = {2}
                  >                  
                    <Grid item xs={12} >
                    <ButtonGroup disableElevation square size="large" variant="contained" color='#EE6C4D' >

                      <Button 
                        className = {clsx(classes.Tab , {
                          [classes.choosedTab] : !list
                        })} 
                        onClick = {() => setList(0)}
                      >
                        <h5 style={{fontFamily: 'Vazir'}}>                          
                          اعلان ها 
                        </h5>
                      </Button> 

                      <Button 
                        className = {clsx(classes.Tab , {
                          [classes.choosedTab] : list
                        })}
                        onClick = {() => setList(1)}
                        >                          
                        <h5 style={{fontFamily: 'Vazir'}}>
                          امتحان
                        </h5>
                      </Button> 

                    </ButtonGroup>
                    </Grid>
                    {}
                    <Grid item>
                      <Paper elevation = {2}  className = {classes.paperList}>
                        <Grid
                          container
                          direction="column"
                          justify="center"
                          alignItems="center"
                          spacing = {2}
                        >

                          <Grid item>
                            { list == 0 &&
                              <Button variant="contained" color="primary" style={{ backgroundColor : '#EE6C4D'}}>
                                <h5 style={{fontFamily: 'Vazir'}}>
                                  <CreateIcon />
                                  نوشتن
                                </h5>
                              </Button>
                            }  
                          </Grid>     

                          <Grid item>
                            {list == 0 &&
                              <div>
                                <PostListItem />
                                <PostListItem />
                                <PostListItem />
                                </div>
                              // elan ha                             
                              //post ha
                            }  
                          </Grid>     

                        </Grid>
                      </Paper>
                    </Grid>

                  </Grid>
              </Grid>         
              <Grid item xs={12} sm={12}  lg={6} className = {classes.grid}>
                <Paper elevation = {2} >
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  spacing = {2}
                >                  
                  <Grid  disableElevation  item style={{marginBottom : "2px"}}>                                          
                      <Typography dir="rtl" component="h1" variant="h2" noWrap className={classes.title} style={{fontFamily: 'Vazir' , color : '#3D5A80', textAlign : 'right'}}>                          
                          ریاضی 
                      </Typography>                
                  </Grid>

                  <Grid item >
                    <Typography dir="rtl" component="h1" variant="h6" noWrap className={classes.title} style={{fontFamily: 'Vazir' , color : '#3D5A80', textAlign : 'right'}}>                          
                        مهراد غضنفر باشی
                    </Typography>
                  </Grid>

                  <Grid item >                  
                    {/* <ButtonGroup color="white" aria-label="outlined primary button group" square> */}
                    <ButtonGroup disableElevation  variant="contained" color='#EE6C4D' aria-label="contained primary button group">

                      <Button className = {classes.groupbutton}>
                        <h5 style={{fontFamily: 'Vazir'}}>
                          ویرایش
                        </h5>
                      </Button> 

                      <Button className = {classes.groupbutton}>
                        <h5 style={{fontFamily: 'Vazir'}}>
                          آزمون
                        </h5>
                      </Button> 

                    </ButtonGroup>
                  </Grid>

                  <Grid item >
                    <Typography dir="rtl" align="center"  variant="body1" paragraph gutterBottom  className={classes.title} style={{fontFamily: 'Vazir' , color : '#3D5A80', textAlign : 'right'}}>                      
                      ریاضیات غیر کاربردی 
                    </Typography>
                  </Grid>
                </Grid>
                </Paper>
              </Grid> 
            </Grid>
          </Container>
        </main>
      </div>
    );
  }
