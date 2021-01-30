import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InfoIcon from '@material-ui/icons/Info';
import { LightenDarkenColor } from 'lighten-darken-color'; 
import { mainListItems , secondaryListItems} from './insideClassDrawerList';
import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Examslist from './lists/examlist' ;
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import axios from 'axios' ;
import serverURL from '../../../utils/serverURL' ;
import tokenConfig from '../../../utils/tokenConfig' ;
import Notelist from './lists/notelist';
import DialogEditClass from './DialogEditClass';

const drawerWidth = 220;
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',              
      backgroundColor : 'white'
    },
    toolbar: {
      paddingRight: 7, // keep right padding when drawer closed            
    },
    grid:{
      padding : theme.spacing(3),
      marginBottom: theme.spacing(2) , 
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      height: '54px' ,      
      backgroundColor : '#3D5A80' ,      
    },
    classCode: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingBottom  : theme.spacing(1) ,
      paddingTop : theme.spacing(1) ,
      height: '40px' ,      
      backgroundColor : '#98C1D9' ,      
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
    groupbutton :{
      backgroundColor : '#EE6C4D' , 
      color : "white" ,
      "&:hover": {
        backgroundColor: LightenDarkenColor('#EE6C4D', -40) ,        
        color :'white'
      },
    },
    content :{      
      flexGrow: 1,
      // padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: 0,
    },  
    classContent :{
      marginTop : theme.spacing(2)
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
      width : 'inherit' ,
      height : 'inherit'  , 
      // backgroundColor : '#f6f6f6'
      // width : '100%' ,                     
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
      backgroundColor : '#1CA0A0' , 
      color : 'white'         
    },
    fixedHeight: {
      height: 240,
    },
    breadcrumbs :{
      padding : theme.spacing(1)
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

export default function InsideClass(props) {

    const elevation = 2 ;     
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [className , setClassName] = React.useState("نام کلاس");
    const [description , setDescription] = React.useState("توضیحات");
    const [adminName , setAdminName] = React.useState("نام معلم");   
    const [isAdmin , setIsAdmin] = React.useState(false);         
        
    const classId = props.match.params.classId ;    

    const handleDrawer = () => {
      setOpen(!open);
    };

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);        
  
    // get class information---------------------------------------------------------
    axios.get(serverURL() + "class/" + classId , 
    tokenConfig())
    .then(res => {            
      setClassName(res.data.Class.name);
      setDescription(res.data.Class.description);
      setAdminName(res.data.Class.admin.firstname + " " + res.data.Class.admin.lastname);
    })
    .catch(e =>{      
    });    

    //get user information ------------------------------------------------------------
    axios.get(serverURL() + "user" , tokenConfig())
    .then(res =>{
        if(res.data.user.firstname + " " + res.data.user.lastname == adminName)
          setIsAdmin(true);
    })

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

          <Typography dir="rtl" component="h1" variant="h6" noWrap style={{fontFamily: 'Vazir' , color : 'white', textAlign : 'right'}}>                          
              {className}
          </Typography>
            <IconButton onClick={handleDrawer} style={{color : 'white'}} >
              <ChevronLeftIcon style={{marginRight : "2px"}}/>
            </IconButton>
          </div>          

          <div className={classes.classCode} >              
            <IconButton onClick={handleDrawer} style={{color : 'white'}} >
              <InfoIcon style={{marginLeft : '2px' , marginRight : '8px'}} />
            </IconButton>      
            <h4 dir="rtl" noWrap style={{ fontFamily: 'Vazir' , textAlign : 'right', color : 'white' , marginTop : '0px'}}>                          
                کد کلاس : {classId}
            </h4>                              
          </div>             

          <List>{mainListItems}</List>   
          
          <Divider />
            <div>
            <Link color="inherit" href={"/members/" + classId} >
                <ListItem button  >
                  <ListItemIcon>
                  <PeopleAltIcon style={{ color: "#3D5A80" }} />            
                    </ListItemIcon>
                    <ListItemText  style={{ textAlign : 'right'}} >
                      <Typography variant="button" style={{ color: "#3D5A80"  ,fontFamily: 'Vazir' }}> 
                        اعضا
                      </Typography>
                    </ListItemText>              
                    
                </ListItem> 
              </Link>  
            </div>
          
        </Drawer>
        <main className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}  
        >                            
          <Container maxWidth="lg" className={classes.container}        
        // style={{backgroundImage : 'url(' + require ('./back.jpg') + ')' , backgroundSize : 'cover'}}     
          >  
            {/* <Grid container xs = {12} dir = "rtl">             */}
              {/* <Paper elevation={2} className={classes.breadcrumbs}>               */}
                <Breadcrumbs separator="|" aria-label="breadcrumb" dir="rtl" >
                  {/* <Link color="inherit" href="/user/classes" >
                  <Typography dir="rtl" variant="h6" noWrap className={classes.title} style={{fontFamily: 'Vazir'}}>                          
                      خانه
                  </Typography>
                  </Link> */}
                  <Link color="inherit" href="/user/classes" >
                    <Typography dir="rtl" variant="h6" noWrap className={classes.title} style={{fontFamily: 'Vazir' , color: '#3D5A80'}}>                          
                        کلاس ها
                    </Typography>
                  </Link>
                  {/* {props.title} */}
                  <Typography dir="rtl" variant="h6" noWrap className={classes.title} style={{fontFamily: 'Vazir', color: '#3D5A80'}}>                          
                    {className}
                  </Typography>
                </Breadcrumbs>              
              <hr />              
            <Grid container spacing={3} className={classes.classContent}>
              <Grid item xs={12} sm={12}  lg={12} className = {classes.grid}>
                <Paper elevation = {elevation} className={classes.paper}>
                <Grid
                  container                  
                  spacing = {2}>                           
                  <Grid item xs={6}>
                    <Typography dir="rtl" align="center"  variant="body1" paragraph gutterBottom  className={classes.title} style={{fontFamily: 'Vazir' , color : 'white', textAlign : 'right'}}>                      
                      {description}
                    </Typography>
                  </Grid>
                  <Grid xs={6}  disableElevation  container spacing={1} style={{marginBottom : "2px"}}
                    direction="column"
                    justify="center"
                    alignItems="center">   
                    <Grid item>
                      <Typography dir="rtl" component="h1" variant="h2" noWrap className={classes.title} style={{fontFamily: 'Vazir' , color : 'white', textAlign : 'right'}}>                          
                          {className} 
                      </Typography>                                  
                    </Grid>
                    <Grid item>
                    <Typography dir="rtl" component="h1" variant="h6" noWrap className={classes.title} style={{fontFamily: 'Vazir' , color : 'white', textAlign : 'right'}}>                          
                        {adminName}
                    </Typography>                                      
                    </Grid>
                    {isAdmin==true &&
                      <Grid item>                    
                        {/* <Button className = {classes.groupbutton}> */}
                          <h5 style={{fontFamily: 'Vazir'}}>
                            <DialogEditClass 
                              classId = {classId}  
                            />
                          </h5>
                        {/* </Button>                        */}
                      </Grid>
                    }
                  </Grid>                         
                </Grid>
                </Paper>
              </Grid> 

              <Examslist 
                classId = {classId}
                isAdmin = {isAdmin}
              />

              <Notelist 
                classId = {classId}
                isAdmin = {isAdmin}                
                />
            
            </Grid>
          </Container>
        </main>
      </div>
    );
  }
