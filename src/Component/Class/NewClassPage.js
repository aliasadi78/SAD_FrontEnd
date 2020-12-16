import React, { Component } from 'react';
import Container from "@material-ui/core/Container";
import Button from '@material-ui/core/Button';
import CssBaseline from "@material-ui/core/CssBaseline";
import axios from 'axios' ;
import Material_RTL from "../Material_RTL";
import M_RTL from "../M_RTL";
import Grid from "@material-ui/core/Grid";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from '@material-ui/core/InputLabel';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import serverURL from '../../utils/serverURL' ;
import tokenConfig from '../../utils/tokenConfig' ;
import Select from '@material-ui/core/Select';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, DialogContent } from '@material-ui/core';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import AlertDialog from '../Dialog';

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
            classCreated : 0 ,
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });        
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
      // const [openCreateClassDialog, setOpenCreateClassDialog] = this.props.openCreateClassDialog;
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
          setOpen(true);
          e.preventDefault();

          const a = {
            "name" : this.state.title ,
            "description" : this.state.description
          }

          const ajson = JSON.stringify(a);

          axios.post(serverURL() + "class" , 
          ajson , 
          tokenConfig())
          .then(res => {
            setPending(false);
            setOpen(false);
            // setOpenCreateClassDialog(false)
            this.setState(prevstate => {
              return {
                classCreated : 1 ,
                open: false,
                title: '',
                description: '',
              }
            })
          })
          .catch(e =>{
            // setOpenCreateClassDialog(false)
            this.setState(prevstate => {
              return {
                classCreated : 2 ,
              }
            })
          });
      }
          
      return(
          <React.Fragment>
             //دکمه ایجاد کلاس اینجاست به جای داشبودر اونجا ایمپورتش کردم
            <Button onClick={()=>{setOpen(true)}} className = {classes.button}>
              ایجاد کلاس
            </Button>
            <Dialog
            fullWidth={this.state.fullWidth}
            maxWidth={this.state.maxWidth}
            open={open}
            
            onClose={()=>{setOpen(false)}}
            aria-labelledby="max-width-dialog-title" >
                  <Material_RTL>
                      <M_RTL>
                        <DialogTitle style={{fontFamily: 'Vazir' , color : 'white' , backgroundColor : '#3D5A80',textAlign: 'center'}}>
                          <span style={{fontFamily: 'Vazir' ,}}>ایجاد کلاس جدید</span>
                        </DialogTitle>
                        <div className={classes.paper}>                     
                        <DialogContent>
                          <ValidatorForm noValidate style={{fontFamily: 'Vazir'}}>
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
                                
                            <br/>
                                    
                            <br/>
                      </ValidatorForm>
                      </DialogContent>                      
                      <DialogActions>

                              
                      <Grid style={{textAlign: 'right',width: '100%'}} >                                                
                          <LoadingButton onClick={handleClick} pendingPosition="center" pending={pending} variant="contained" color="#EE6C4D" style={{backgroundColor: '#EE6C4D',color: 'white',fontFamily: 'Vazir',margin: '0% 20% 0% 5%',width: '25%'}}>
                          ایجاد کلاس جدید
                          </LoadingButton>         
                        <Button onClick={()=>{setOpen(false)}} color="primary" style={{backgroundColor: '#98C1D9',color: 'white',fontFamily: 'Vazir',width: '25%'}}>
                          انصراف
                        </Button>
                        </Grid>
                      </DialogActions>
                        </div>
                      </M_RTL>
                  </Material_RTL>
            </Dialog> {
                        this.state.classCreated == 1 ?
                        <AlertDialog text ="کلاس اضافه شد"/>
                        :
                        this.state.classCreated == 2 ?
                        <AlertDialog text = "خطا" />
                        :
                        <p></p> 
                      }                                                    
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
    fontFamily: 'Vazir',
    color: 'black',
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
      // marginTop: theme.spacing(1),
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

export default function NewClassDialog (props) {
    const classes = useStyles();
    const a = React.useState('');
    const l = React.useState('');
    const p = React.useState(false);
    const o = React.useState(false)
    const openCreateClassDialog = props.openCreateClassDialog;
    return (        
        <NewClassPage classes={classes} a={a} l={l} p={p} o={o} openCreateClassDialog={openCreateClassDialog}/>    
    )
}