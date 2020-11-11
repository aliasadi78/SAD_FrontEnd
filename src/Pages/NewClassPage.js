import React, { Component } from 'react';
import Container from "@material-ui/core/Container";
import Button from '@material-ui/core/Button';
import CssBaseline from "@material-ui/core/CssBaseline";
import Material_RTL from "../Component/Material_RTL";
import M_RTL from "../Component/M_RTL";
import Grid from "@material-ui/core/Grid";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from '@material-ui/core/InputLabel';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, DialogContent } from '@material-ui/core';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

// import NewClassDialog from '../Pages/ClassesPage' ;
class NewClassPage extends Component{
    constructor() {
        super();
        this.state = {
            title: '',
            paye: '',
            lesson: '',
            description: '',
            fullWidth : true , 
            maxWidth : 'sm' ,
            open : true , 
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state);
    }
    
    handleClose = () => {
      this.setState(prevstate => {
        return {
          open : false , 
        }
      })
    };
    
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
          <React.Fragment>
            <Dialog
            fullWidth={this.state.fullWidth}
            maxWidth={this.state.maxWidth}
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="max-width-dialog-title" >
              <Container component="main" maxWidth="xs">
                  <CssBaseline />
                  <Material_RTL>
                      <M_RTL>
                        <DialogTitle style={{fontFamily: 'Vazir' , color : 'white' , backgroundColor : '#3D5A80'}}>
                          ایجاد کلاس جدید
                        </DialogTitle>
                        <div className={classes.paper}>
                        <br/>
                        <DialogContentText>
                          
                        </DialogContentText>                          
                        <DialogContent>
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
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                          انصراف
                        </Button>
                      </DialogActions>
                        </div>
                      </M_RTL>
                  </Material_RTL>                  
              </Container>
            </Dialog>                                                    
          </React.Fragment>
      );
    }
}

const drawerWidth = 220;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',      
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
      backgroundColor : '#f5f5f5',
      padding: '20px',
      borderRadius: '0px',
      opacity: '95%'
  },
}));

export default function NewClassDialog () {
    const classes = useStyles();
    const a = React.useState('');
    const l = React.useState('');
    const p = React.useState(false);
    const o = React.useState(false)
    return (        
        <NewClassPage classes={classes} a={a} l={l} p={p} o={o}/>    
    )
}