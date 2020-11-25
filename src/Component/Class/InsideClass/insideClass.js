import React from 'react';
import CreateIcon from '@material-ui/icons/Create';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { LightenDarkenColor } from 'lighten-darken-color'; 
import { mainListItems , secondaryListItems} from './insideClassDrawerList';
import List from '@material-ui/core/List';
import IsoIcon from '@material-ui/icons/Iso';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import axios from 'axios' ;
import serverURL from '../../../utils/serverURL' ;
import tokenConfig from '../../../utils/tokenConfig' ;
import Box from '@material-ui/core/Box';

import Material_RTL from "../../Material_RTL";
import M_RTL from "../../M_RTL";
import PostListItem from './postListItem';
import ExamListItem from './examsListItem';
import { set } from 'date-fns';
import AlertDialog from '../../Dialog';

import DialogNote from './DialogNote';

const drawerWidth = 220;
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',       
    },
    toolbar: {
      paddingRight: 7, // keep right padding when drawer closed            
    },
    grid:{
      padding : theme.spacing(3),
      marginBottom: theme.spacing(2) , 
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
      padding : theme.spacing(1) , 
      marginBottom : theme.spacing(2) ,         
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
    ListTitle :{
      padding : theme.spacing(1) , 
      marginBottom : theme.spacing(1) ,  
      backgroundColor : '#3D5A80' ,
      color : 'white'
    },
    ElanPaper :{
      marginTop : theme.spacing(2) ,
      paddingTop : theme.spacing(1)
    },    
  }));

export default function InsideClass(props) {

    const elevation = 2 ; 
    const [component , setComponent] = React.useState('editProfile');
    const [ list , setList] = React.useState(0);
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [className , setClassName] = React.useState("نام کلاس");
    const [description , setDescription] = React.useState("توضیحات");
    const [adminName , setAdminName] = React.useState("نام معلم");
    const [noConnection , setNoConnection] = React.useState(false );
    const classId = props.match.params.classId ;    
    const handleDrawer = () => {
      setOpen(!open);
    };

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);    
  
    // axios.get(serverURL() + "class/" + classId + "/members", 
    axios.get(serverURL() + "class/" + classId , 
    tokenConfig())
    .then(res => {
      console.log(res.data);
      setClassName(res.data.Class.name);
      setDescription(res.data.Class.description);
      setAdminName(res.data.Class.admin.firstname + " " + res.data.Class.admin.lastname);
    })
    .catch(e =>{
      setNoConnection(true);
    });

    return (
      <div className={classes.root}>        
        <CssBaseline />

        {
          noConnection == true &&
          <AlertDialog text = 'اتصال ندارید .' />
        }

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
              {className}
          </Typography>
            <IconButton onClick={handleDrawer} style={{color : 'white'}} >
              <ChevronLeftIcon/>
            </IconButton>
          </div>
          <List>{mainListItems}</List>   
          
          <Divider />
                           
          <List>{secondaryListItems}</List>                    


        </Drawer>
        <main className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}>          
          <Container maxWidth="lg" className={classes.container}>  
            <Grid item xs = {12}>
            <Material_RTL>
                    <M_RTL>
              {/* <Paper elevation={2} > */}
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
                  {className}
                </Typography>
              </Breadcrumbs>
              <hr />
              {/* </Paper> */}
              </M_RTL>
            </Material_RTL>
            </Grid>            
            <Grid container spacing={3} className={classes.classContent}>
              <Grid item xs={12} sm={12}  lg={12} className = {classes.grid}>
                <Paper elevation = {elevation} className={classes.paper} >
                <Grid
                  container                  
                  spacing = {2}>         
                  {/* <Grid item xs={4} ></Grid>                     */}
                  <Grid item xs={6}>
                    <Typography dir="rtl" align="center"  variant="body1" paragraph gutterBottom  className={classes.title} style={{fontFamily: 'Vazir' , color : '#3D5A80', textAlign : 'right'}}>                      
                      {description}
                    </Typography>
                  </Grid>
                  <Grid xs={6}  disableElevation  container spacing={1} style={{marginBottom : "2px"}}
                    direction="column"
                    justify="center"
                    alignItems="center">   
                    <Grid item>
                      <Typography dir="rtl" component="h1" variant="h2" noWrap className={classes.title} style={{fontFamily: 'Vazir' , color : '#3D5A80', textAlign : 'right'}}>                          
                          {className} 
                      </Typography>                                  
                    </Grid>
                    <Grid item>
                    <Typography dir="rtl" component="h1" variant="h6" noWrap className={classes.title} style={{fontFamily: 'Vazir' , color : '#3D5A80', textAlign : 'right'}}>                          
                        {adminName}
                    </Typography>                                      
                    </Grid>
                    <Grid item>
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
                  </Grid>                         
                </Grid>
                </Paper>
              </Grid> 

              <Grid item  xs={4} sm={12}  lg={6} className = {classes.grid}>                                                                
                                                                                  
                        <Grid container xs={12} style={{marginBottom : '15px'}} >                      
                          <Grid item xs={4} ></Grid>
                          <Grid item xs={4} >

                            <Paper elevation = {elevation} className = {classes.ListTitle}>
                              <h5 style={{fontFamily: 'Vazir'}}>
                                امتحان ها 
                                <IsoIcon />
                              </h5>
                            </Paper>                          
                          </Grid>                              

                          <Grid item xs={4} ></Grid>
                        </Grid>
                      <Paper elevation = {elevation} >

                          <Grid item xs={12}>
                            <ExamListItem elevation = {elevation}/>
                            <ExamListItem elevation = {elevation}/>
                            <ExamListItem elevation = {elevation}/>
                            <ExamListItem elevation = {elevation}/>
                          </Grid>     
                        
                      </Paper>                    
              </Grid>                       

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
                                                                        
                    <Paper elevation = {elevation}  className = {classes.ElanPaper}>                      
                        <Grid item>                            
                            {/* <Button variant="contained" color="primary" style={{ backgroundColor : '#EE6C4D'}}> */}
                              <h5 style={{fontFamily: 'Vazir'}}>
                                
                                <DialogNote classId={classId}/>
                              </h5>
                            {/* </Button>                             */}
                        </Grid>     

                        <Grid item>                            
                            <div>
                              <PostListItem />
                              <PostListItem />
                              <PostListItem />
                            </div>                               
                        </Grid>                           
                    </Paper>
                  </Grid>
                </Grid>              
            </Grid>
          </Container>
        </main>
      </div>
    );
  }
