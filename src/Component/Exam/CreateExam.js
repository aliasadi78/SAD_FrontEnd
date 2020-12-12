import React from 'react' ;
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import serverURL from '../../utils/serverURL' ;
import tokenConfig from  '../../utils/tokenConfig' ;
import Button from '@material-ui/core/Button';
import QuestionHolder_Create from './QuestionHolder_CreateExam' ;
import { BrowserRouter as Router } from "react-router-dom";
import Material_RTL from '../Material_RTL';
import axios from 'axios' ;
import { connect } from 'react-redux' ;
import { useHistory } from "react-router-dom";
import AddQuestionExam from './AddQuestion' ;

import QuestionBank from './ExamQuestionBank';

import { Dialog, Paper } from '@material-ui/core';
import FirstDialogExam from './DialogExamFirst';
import {mainListItems} from '../Class/InsideClass/insideClassDrawerList' ;
import List from '@material-ui/core/List';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
  const drawerWidth = 220 ;
  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      // width: 500,
      display : 'flex' , 
    },
    toolbar: {
        paddingRight: 7,
         // keep right padding when drawer closed            
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
        marginLeft : theme.spacing(0) ,     
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
      paper : {
        paddingBottom : theme.spacing(3),
        paddingTop : theme.spacing(3),
        backgroundColor : '#f2f2f2'
      },
  }));
  
const defaultProps = {
  bgcolor: 'background.paper',
  m: 1,
  border: 1,
  style: { width: '100%', height: '100%' },
};

function CreateExam(props){

    const [open, setOpen] = React.useState(false);    

    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const [userQuestions , setUserQuestions] = React.useState([]);
    const [questionsFound,setQuestionsFound] = React.useState(false);
    const [editMode , isEditMode] = React.useState(props.location.pathname.includes("EditExam"));
    
    const examId = props.match.params.examId ;    
    const classId = props.match.params.classId ;  
    const history = useHistory() ;      

    console.log(props.index);

    const handleDrawerOpen = () => {
        setOpen(true);      
    };

    const handleDrawerClose = () => {
        setOpen(!open);        
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    //get user questions ------------------------------------------------------
    if(questionsFound == false)
      axios.get(serverURL() + 'question?limit=10' , tokenConfig())
      .then(res=>{
        console.log(res.data.questions);
        setUserQuestions([...res.data.questions]);
        setQuestionsFound (true);
      })
      .catch(err=>{

      });

    return (
    <div className = {classes.root}>
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
                       
            {editMode == true &&  <Button variant="contained" color="#98C1D9" 
              style={{fontFamily: 'Vazir'}}
              className = {classes.button}
              onClick={()=>{                  
              }}
              >
              ذخیره
            </Button>    }

            {editMode == false && 
            <Button variant="contained" color="#98C1D9" 
              style={{fontFamily: 'Vazir'}}
              className = {classes.button}
              onClick={()=>{    
                
                const arr = [] ;
                props.questions.forEach(q => {
                    arr.push({"question" : q.question._id , "grade" : q.grade });
                });

                const a = {
                  "name" : props.title , 
                  "startDate" : "2020-12-14T23:28:26.607Z" , // props.startDate , 
                  "endDate" :  "2020-12-15T23:28:26.607Z" ,//props.endDate ,
                  "questions" :  arr ,
                  "examLength" :  props.examLength ,
                  "useInClass" : classId                  
                };
                
                const ajson = JSON.stringify(a);
                console.log(ajson);
                axios.post(serverURL() + "exam" , ajson , tokenConfig() )
                .then(res => {
                  console.log("success");
                  history.push("/class/" + classId);
                })
                .catch(err => {
                  console.log(err.message);
                });
              }}
              >
              ایحاد آزمون
            </Button>
            }   

            <Button variant="contained" color="#98C1D9" 
              style={{fontFamily: 'Vazir'}}
              className = {classes.button}
              onClick={()=>{                  
              }}
              >
              تغییر مشخصات 
            </Button>            

            {editMode == true && 
            <Button variant="contained" color="#98C1D9" 
              style={{fontFamily: 'Vazir'}}
              className = {classes.button}
              onClick={()=>{   
                axios.delete(serverURL() + "exam/" + examId , tokenConfig())
                .then(res => {
                  history.push("/class/" + classId);
                });                              
              }}
              >
              حذف آزمون
            </Button>    
            }

            <Typography style={{fontFamily: 'Vazir' , marginRight : '16px'}} >
              {props.title}
            </Typography>

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

          <List>{mainListItems}</List>
        </Drawer>
        
        <main className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>            
            <FirstDialogExam />
           {/* ------------------------------------------------------------------------ */}
            <Material_RTL >
           <Grid container spacing ={2} style={{width:'100%'}}>
            <Grid item xs={12} sm={12} lg={6} >
                <AppBar position="static" color="default">
                    <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="primary"
                    variant="fullWidth"                    
                    aria-label="full width tabs example"
                    >
                    <Tab style={{fontFamily: 'Vazir' , backgroundColor : '#1CA0A0' , color:'white'}} label="طرح سوال جدید" {...a11yProps(0)} />
                    <Tab style={{fontFamily: 'Vazir' , backgroundColor : '#1CA0A0' , color:'white'}} label="سوال های طرح شده " {...a11yProps(1)} />
                    <Tab style={{fontFamily: 'Vazir' , backgroundColor : '#1CA0A0' , color:'white'}} label="بانک" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                    style={{overflowX: 'visible'}}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>                      
                      <AddQuestionExam
                        backColor = '#f2f2f2'   
                        grades = {props.grade}
                        courses = {props.course}
                        chapters = {props.chapter}
                        types = {props.type}                          
                      />
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                      {questionsFound == true &&
                        userQuestions.map((m , index) => 
                          <QuestionHolder_Create                             
                            backColor = '#f2f2f2'   
                            mode = "select question"                            
                            index = {index}                            
                            question = {m}
                          />
                        )
                      }                      
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                      <QuestionBank/>
                    </TabPanel>
                </SwipeableViews>
            </Grid>
            <Grid item xs={12} sm={12} lg={6} height="100%" >
              <Paper className={classes.paper} >
                {
                  props.questions.map(q => q.question).map((p , index)=> 
                    <QuestionHolder_Create
                      backColor="#98C1D9"
                      mode = "preview"
                      question={p} />
                  )
                }   
                {props.questions.length == 0 &&
                  <Typography style={{fontFamily: 'Vazir' , color : '#8c8c8c'}} >
                      سوالات امتحان اینجا نمایش داده میشوند . 
                  </Typography>
                } 
              </Paper>                        
            </Grid>
        </Grid>
        </Material_RTL>
{/* ------------------------------------------------------------ */}
          </Container>
        </main>

        </Router>        
    </div>
    );
}

const mapStateToProps = (state) => {    
  return {    
    grade : state.edittingQuestion.base ,
    chapter : state.edittingQuestion.chapter ,
    course : state.edittingQuestion.course , 
    hardness : state.edittingQuestion.hardness , 
    type : state.edittingQuestion.type , 
    index : state.edittingQuestion.edittingQuestionIndex ,
    // --------------------------------
    title : state.exam.name ,
    questions : state.exam.examQuestions ,  
    startDate : state.exam.startDate , 
    endDate : state.exam.endDate ,     
    examLength : state.exam.examLength
  }
}

export default connect(mapStateToProps)(CreateExam)