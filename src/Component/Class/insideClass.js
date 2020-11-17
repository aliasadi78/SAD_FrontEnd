import React from 'react';
import clsx from 'clsx';
import Box from '@material-ui/core/Box' ;
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// ------------------------
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
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
    content :{
        width : '100%' ,
        overflow : 'atuo' , 
        flexGrow : 1,
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),      
      width : '100%' ,         
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

export default function InsideClass() {

    const [component , setComponent] = React.useState('editProfile');
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleDrawer = () => {
      setOpen(!open);
    };

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);    
  
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

          <Typography dir="rtl" component="h1" variant="h6" noWrap className={classes.title} style={{fontFamily: 'Vazir' , color : 'white'}}>                          
              اسم سایت و لوگوش
          </Typography>
            <IconButton onClick={handleDrawer} style={{color : 'white'}} >
              <ChevronLeftIcon/>
            </IconButton>
          </div>
          {/* <List>{mainListItems}</List>           */}
          <ListItem button onClick={() => redirectTo('editProfile')}>
            <ListItemIcon>        
              <AccountBoxIcon style={{ color: "#3D5A80" }} />
            </ListItemIcon>
            <ListItemText  primary="حساب کاربری "  />
          </ListItem>
          <ListItem button  onClick={() => redirectTo('questionBank')}>
            <ListItemIcon>
            <LibraryBooksIcon style={{ color: "#3D5A80" }} />
            </ListItemIcon>
            <ListItemText style={{fontFamily: 'Vazir'}} primary="بانک سوال" />
          </ListItem>
          <ListItem button  onClick={() => redirectTo('classesPage')}>
            <ListItemIcon>
            <ClassIcon style={{ color: "#3D5A80" }} />
            </ListItemIcon>
            <ListItemText  style={{fontFamily: 'Vazir'}} primary="کلاس ها" />
          </ListItem>    
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>  
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}  lg={4} className = {classes.grid}>
                  <Box pt={4} color="text.primary">
                  {/* <Typography variant="h5" align='center' component="h2" dir = 'rtl' style={{fontFamily: 'Vazir', color:'#595959'}}>
                      در اسپرینت بعدی پیاده سازی میشود .
                  </Typography> */}
                  </Box>
              </Grid>         
              <Grid item xs={12} sm={12}  lg={4} className = {classes.grid}>
              
              </Grid> 
              <Grid item xs={12} sm={12}  lg={4} className = {classes.grid}>

              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    );
  }

  function redirectTo(){

  }