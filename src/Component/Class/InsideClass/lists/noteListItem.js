import { makeStyles } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Material_RTL from "../../../Material_RTL";
import axios from 'axios' ;
import serverURL from '../../../../utils/serverURL' ;
import tokenConfig from  '../../../../utils/tokenConfig' ;
import Button from '@material-ui/core/Button';
import  LoadingButton from '@material-ui/lab/LoadingButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Grid from "@material-ui/core/Grid";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import M_RTL from '../../../M_RTL';
import IconButton from '@material-ui/core/IconButton';
import AlertDialog from "../../../Dialog";
import { ValidatorForm,TextValidator } from 'react-material-ui-form-validator';
import CreateIcon from '@material-ui/icons/Create';
import DialogDeleteNote from '../Dialogs/DialogDeleteNote';
const useStyles = makeStyles((theme) => ({    
    Toast:{
        margin : theme.spacing(3) ,
        width : 'inherit'
    },
    paper : {
        paddingTop : theme.spacing(1) ,         
        margin : theme.spacing(2) , 
    },
}));

export default function PostListItem (props){

    const [show, setShow] = React.useState(true);
    const [showEditNote , setShowEditNote] = React.useState(false);
    const [title , setTitle] = React.useState(props.title);
    const [body , setBody] = React.useState(props.content);
    const [successState , setSuccessState] = React.useState(0);
    const [noteListLoad,setNoteListLoad] = props.noteListLoad;
    const [pending,setPending] = React.useState(false);
    const classes = useStyles();    

    const handleClose = () => {
        setShowEditNote(false);
        setPending(false);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        setPending(false);
    };

    const handleBodyChange = (e) => {
        setBody(e.target.value);
        setPending(false);
    };

    const hazf = () => {
        axios.delete(serverURL() + "class/" + props.classId + "/notes/" + props.noteId , tokenConfig())
        .then(res =>{
            console.log('done');            
            setShowEditNote(false);
            setNoteListLoad(true)
        })
        .catch(err =>{
            console.log(err);
        });
    }
    //ویرایش اعلان و کنترل
    const handleSubmit = () => {      
        if(body.length >= 5 && title.length >=5 && body.length <= 120 && title.length <=120 ) {
            setPending(true);
            axios.put(serverURL() + "class/" + props.classId + "/notes/" + props.noteId , {
                "title" : title ,
                "body" : body
            } , tokenConfig())
            .then(res=>{
                console.log("done");
                setShowEditNote(false);
                setNoteListLoad(true)
                setPending(false);
            })
            .catch(err =>{
                console.log(err);
                setPending(false);
            });
        }
        else{
            alert("عنوان باید بیشتر از ۵ حرف و متن اعلان باید بین ۵ تا ۱۲۰ حرف باشد")
            setPending(false);
        }
    };

    return(
        <div>

            <Paper elevation={props.elevation} className={classes.paper}>
                    <Grid container spacing={1}
                    direction="column"
                    justify="center"
                    alignItems="center"
                    style={{paddingTop : '5px'}}
                    >
                        <Grid container xs = {12} className={classes.grid}>                            
                            <Grid item xs={2} alignItems="left">
                                {props.isAdmin == true &&
                                <IconButton variant="outlined" size='small' className = {classes.button}
                                    onClick={()=>{
                                        setShowEditNote(true);
                                    }}>          
                                    <CreateIcon />                    
                                </IconButton>
                                }
                            </Grid>
                            <Grid item xs={8} ></Grid>
                            <Grid item xs={2} >
                                {props.title}
                            </Grid>

                        </Grid>
                        <Grid item xs = {12} className={classes.grid}>
                            {/* <hr /> */}
                            <h6 dir="rtl" component="h1" variant="h6" noWrap className={classes.title} style={{fontFamily: 'Vazir', textAlign : 'right' , marginBottom : 0 }}>                                                                      
                            {props.content}
                            </h6>                
                        </Grid>            
                    </Grid>
                </Paper>  

            <Dialog fullWidth style={{fontFamily: 'Vazir'}} open={showEditNote} onClose={handleClose} aria-labelledby="form-dialog-title">
                <Material_RTL><M_RTL>
                <DialogTitle style={{fontFamily: 'Vazir' , color : 'white' , backgroundColor : '#3D5A80',textAlign: 'center'}}>
                <span style={{fontFamily: 'Vazir' ,}}>ویرایش اعلان </span>
                </DialogTitle>
                    {/* <DialogTitle  id="form-dialog-title"><span style={{direction: 'rtl',fontFamily: 'Vazir',position: 'absolute',right: '36%',top: '10%'}}>ویرایش کلاس</span></DialogTitle> */}
                    <div className={classes.paper}> 
                    <DialogContent>
                    <ValidatorForm noValidate style={{fontFamily: 'Vazir'}}>
                    <TextValidator
                        autoFocus
                        margin="dense"
                        id="title"
                        variant="outlined"
                        label="عنوان"
                        defaultValue = {props.title}
                        type="text"
                        name="title"
                        fullWidth
                        autoFocus
                        value={title}
                        validators={['required', 'minStringLength:' + 5]}
                        errorMessages={['لطفا یک عنوان مناسب وارد کنید', 'عنوان باید بیشتر از ۵ حرف باشد']}
                        onChange={(e) => {handleTitleChange(e)}}
                        InputLabelProps={{style:{fontFamily: 'Vazir'}}}
                        InputProps={{
                        style:{fontFamily: 'Vazir'}
                    }}
                        
                    />
                    <TextareaAutosize
                        style={{width: '100%',fontFamily: 'Vazir',fontSize: '14px'}}
                        aria-label="minimum height"
                        minRows={5}
                        defaultValue = {props.content}
                        onChange={(e) => {handleBodyChange(e)}}
                        name="body"
                        value={body}
                        placeholder="ویرایش اعلان"
                        InputLabelProps={{style:{fontFamily: 'Vazir'}}}
                    />
                    
                    </ValidatorForm >                    
                    {body.length < 5 && body.length > 0 ? (
                      <span style={{color: 'red',textAlign: 'right',direction: 'rtl',position: 'relative',left: '64%'}}>متن اعلان باید بیشتر از ۵ حرف باشد</span>
                    ) : null}
                    {body.length > 120  ? (
                      <span style={{color: 'red',textAlign: 'right',direction: 'rtl',position: 'relative',left: '64%'}}>متن اعلان باید کمتر از ۱۲۰ حرف باشد</span>
                    ) : null}
                    </DialogContent>

                    <DialogActions>
                    <Grid style={{textAlign: 'right',width: '100%'}} container >                        
                        <LoadingButton onClick={()=> handleSubmit() } pendingPosition="center" pending={pending}  variant="contained" color="#EE6C4D" style={{backgroundColor: '#EE6C4D',color: 'white',fontFamily: 'Vazir',margin: '0% 21% 0% 5%',width: '25%', }}>
                            ویرایش
                        </LoadingButton>                                 
                        {/* <Button onClick={handleClose} color="primary" style={{backgroundColor: '#98C1D9',color: 'white',fontFamily: 'Vazir',width: '25%'}}>
                            انصراف
                        </Button>                         */}
                        {/* <Button onClick={() => hazf() } color="primary" style={{backgroundColor: '#E63946',color: 'white',fontFamily: 'Vazir',width: '25%'}}>
                            حذف 
                        </Button>  */}
                        {/* //مطمئنی که میخوایی اعلان رو پاک کنی؟ */}
                        <DialogDeleteNote classId={props.classId} noteId={props.noteId} noteListLoad={[noteListLoad,setNoteListLoad]} showEditNote={[showEditNote,setShowEditNote]}/>                       
                    </Grid>
                    </DialogActions>
                    </div>
                    </M_RTL>
                </Material_RTL>
            </Dialog>
                    {successState != 0 && (setShowEditNote(false))}
        </div>        
    );
}