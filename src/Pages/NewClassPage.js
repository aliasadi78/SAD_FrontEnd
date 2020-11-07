import React, { Component } from 'react';
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Material_RTL from "../Component/Material_RTL";
import M_RTL from "../Component/M_RTL";
import Grid from "@material-ui/core/Grid";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from "@material-ui/core/Button";
import LoadingButton from '@material-ui/lab/LoadingButton';
import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems, secondaryListItems } from '../AppBar/listItems';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
class NewClassPage extends Component{
    constructor() {
        super();
        this.state = {
            title: '',
            paye: '',
            lesson: '',
            description: '',
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state);
    }
    

    
    render(){
        const classes = this.props.classes;
        const [paye, setPaye] = this.props.a;
        const [lesson, setLesson] = this.props.l;
        const [open, setOpen] = this.props.o;
      const handleDrawerOpen = () => {
        setOpen(true);
      };
      const handleDrawerClose = () => {
        setOpen(false);
      };
      const btnCreateClass = () => {
        return window.location.href = "/NewClassPage" ;
  };
  const btnJoinClass = () => {
    //jaye Dialog box 
        // return window.location.href = "/ClassesPage" ;
  };
        const handleChangePaye = (event) => {
            setPaye(event.target.value);
            alert(event.target.value);
            // console.log(event);
            this.setState({ [event.target.name]: event.target.value });
            console.log(this.state);
        };
        const handleChangeLesson = (event) => {
            setLesson(event.target.value);
            // console.log(lesson.value);
            // console.log(lesson.name);
            // console.log(event);
            alert(event.target.value);
            this.setState({ [event.target.name]: event.target.value });
            console.log(this.state);
        };
        const [pending, setPending] = this.props.p;
        const handleClick = e => {
            setPending(true);
            e.preventDefault();
            alert("OK");
        }
            
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
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>                          
            </Typography>

            {/* <Button variant="contained" color="#98C1D9"
              style={{fontFamily: 'Vazir'}}
              className = {classes.button}
              onClick={btnCreateClass}>
              ایجاد کلاس
            </Button> */}
            
            <Button variant="contained" color="#98C1D9"
              style={{fontFamily: 'Vazir',right: '88%'}}
              className = {classes.button}
              onClick={btnJoinClass}>
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
            <Container component="main" maxWidth="xs" style={{marginTop: '7%'}}>
                <CssBaseline />
                <Material_RTL>
                    <M_RTL>
                        <div className={classes.paper}>
                        <br/>
                        <div><h3 style={{fontFamily: 'Vazir',}}>ایجاد کلاس جدید</h3></div>
                        
                        <ValidatorForm className={classes.form} noValidate style={{fontFamily: 'Vazir'}}>
                                    <Grid container spacing={2} component="h6">
                                        <Grid item xs={12} style={{fontFamily: 'Vazir'}}>
                                            <TextValidator
                                            style={{fontFamily: 'Vazir'}}
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="title"
                                                label="عنوان کلاس"
                                                name="title"
                                                autoComplete="tiltle"
                                                autoFocus
                                                value={this.state.title}
                                                onChange={this.handleChange}
                                                InputLabelProps={{style:{fontFamily: 'Vazir'}}}
                                                InputProps={{
                                                    style:{fontFamily: 'Vazir'},
                                                    // endAdornment: (
                                                    //     <InputAdornment position="start">
                                                    //         <AccountCircle />
                                                    //     </InputAdornment>
                                                    // ),
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <FormControl variant="filled" style={{marginLeft: '10%',width: '45%',marginTop: '5%'}}>
                                    <InputLabel id="demo-simple-select-outlined-label">پایه</InputLabel>
                                    <Select
                                      labelId="demo-simple-select-outlined-label"
                                      id="demo-simple-select-outlined"
                                      value={paye}
                                      onChange={handleChangePaye}
                                      label="پایه"
                                      name="paye"
                                      InputLabelProps={{style:{fontFamily: 'Vazir'}}}
                                    >
                                      <MenuItem value="">
                                        <em>None</em>
                                      </MenuItem>
                                      <MenuItem value={10} InputProps={{style:{fontFamily: 'Vazir'}}}>دهم</MenuItem>
                                      <MenuItem value={11}>یازدهم</MenuItem>
                                      <MenuItem value={12}>دوازدهم</MenuItem>
                                    </Select>
                                    <br/>
                                    </FormControl>
                                    <FormControl variant="filled" style={{width: '45%',marginTop: '5%'}}>
                                    <InputLabel id="demo-simple-select-outlined-label">درس</InputLabel>
                                    <Select
                                      labelId="demo-simple-select-outlined-label"
                                      id="demo-simple-select-outlined"
                                      value={lesson}
                                      name="lesson"
                                      onChange={handleChangeLesson}
                                      label="درس"
                                    >
                                      <MenuItem value="">
                                        <em>None</em>
                                      </MenuItem>
                                      <MenuItem value={'ریاضی'}>ریاضی</MenuItem>
                                      <MenuItem value={'شیمی'}>شیمی</MenuItem>
                                      <MenuItem value={'ادبیات'}>ادبیات</MenuItem>
                                      <MenuItem value={'دین و زندگی'}>دین و زندگی</MenuItem>
                                      <MenuItem value={'زیست شناسی'}>زیست شناسی</MenuItem>
                                      <MenuItem value={'زبان انگلیسی'}>زبان انگلیسی</MenuItem>
                                      <MenuItem value={'فیزیک'}>فیزیک</MenuItem>
                                      <MenuItem value={'عربی'}>عربی</MenuItem>
                                      <MenuItem value={'هندسه'}>هندسه</MenuItem>
                                      <MenuItem value={'حسابان'}>حسابان</MenuItem>
                                      <MenuItem value={'ریاضیات گسسته'}>ریاضیات گسسته</MenuItem>
                                      <MenuItem value={'آمار و احتمال'}>آمار و احتمال</MenuItem>
                                      <MenuItem value={'ریاضی و آمار'}>ریاضی و آمار</MenuItem>
                                    </Select>
                                    </FormControl>
                                    <Grid container spacing={2} component="h6">
                                        <Grid item xs={12} style={{fontFamily: 'Vazir'}}>
                                        <TextareaAutosize
                                            style={{width: '100%',fontFamily: 'Vazir',fontSize: '14px'}}
                                            aria-label="minimum height"
                                            minRows={5}
                                            onChange={this.handleChange}
                                            name="description"
                                            value={this.state.description}
                                            placeholder="توضیحات کلاس"
                                            InputLabelProps={{style:{fontFamily: 'Vazir'}}}
                                        />
                                        </Grid>
                                    </Grid>
                                    <br/>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Grid  >                                                
                                                    <LoadingButton onClick={handleClick} pendingPosition="center" pending={pending} variant="contained" color="#EE6C4D" style={{backgroundColor: '#EE6C4D',color: 'white',fontFamily: 'Vazir'}} fullWidth>
                                                    ایجاد کلاس جدید
                                                    </LoadingButton>                                                
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <br/>
                    </ValidatorForm>
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
      color: 'black',
      backgroundColor: '#f5f5f5',
      padding: '20px',
      borderRadius: '10px',
      opacity: '95%'
  },
}));
export default () => {
    const classes = useStyles();
    const a = React.useState('');
    const l = React.useState('');
    const p = React.useState(false);
    const o = React.useState(false)
    return (        
        <NewClassPage classes={classes} a={a} l={l} p={p} o={o}/>    
    )
}