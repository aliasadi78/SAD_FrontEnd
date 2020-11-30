import { makeStyles } from "@material-ui/core";
import React from 'react';
import Toast from 'react-bootstrap/Toast';
import Material_RTL from "../../Material_RTL";
import axios from 'axios' ;
import serverURL from '../../../utils/serverURL' ;
import tokenConfig from '../../../utils/tokenConfig' ;
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Grid from "@material-ui/core/Grid";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import M_RTL from '../../M_RTL';
import AlertDialog from "../../Dialog";
import { ValidatorForm } from 'react-material-ui-form-validator';

const useStyles = makeStyles((theme) => ({    
    Toast:{
        margin : theme.spacing(3) ,
        width : 'inherit'
    },
}));

export default function PostListItem (props){

    const [show, setShow] = React.useState(true);
    const [showEditNote , setShowEditNote] = React.useState(false);
    const [title , setTitle] = React.useState(props.title);
    const [body , setBody] = React.useState(props.content);
    const [successState , setSuccessState] = React.useState(0);
    const classes = useStyles();    

    const handleClose = () => {
        setShowEditNote(false);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleBodyChange = (e) => {
        setBody(e.target.value);
    };

    const hazf = () => {
        axios.delete(serverURL() + "class/" + props.classId + "/notes/" + props.noteId , tokenConfig())
        .then(res =>{
            console.log('done');
            setSuccessState(2)
        })
        .catch(err =>{
            console.log(err);
        });
    }

    const handleSubmit = () => {        
        axios.put(serverURL() + "class/" + props.classId + "/notes/" + props.noteId , {
            "title" : title ,
            "body" : body
        } , tokenConfig())
        .then(res=>{
            console.log("done");
            setSuccessState(1);
        })
        .catch(err =>{
            console.log(err);
        });

    };

    return(
        <div>
            <Toast className = {classes.Toast} closeButton = {false} show={show} autohide delay = {3000} onClick ={() => {
                if(props.isAdmin==true)
                    setShowEditNote(true);
            }}>
                <Toast.Header>                
                    <small>2 روز پیش</small>
                    <strong className="ml-auto">{props.title} </strong>                
                </Toast.Header>
                <Toast.Body>
                    {props.content}
                </Toast.Body>

            </Toast>

            <Dialog fullWidth style={{fontFamily: 'Vazir'}} open={showEditNote} onClose={handleClose} aria-labelledby="form-dialog-title">
                <Material_RTL><M_RTL>
                <DialogTitle style={{fontFamily: 'Vazir' , color : 'white' , backgroundColor : '#3D5A80',textAlign: 'center'}}>
                <span style={{fontFamily: 'Vazir' ,}}>ویرایش اعا</span>
                </DialogTitle>
                    {/* <DialogTitle  id="form-dialog-title"><span style={{direction: 'rtl',fontFamily: 'Vazir',position: 'absolute',right: '36%',top: '10%'}}>ویرایش کلاس</span></DialogTitle> */}
                    <div className={classes.paper}> 
                    <DialogContent>
                    <ValidatorForm noValidate style={{fontFamily: 'Vazir'}}>
                    <TextField
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
                    </DialogContent>

                    <DialogActions>
                    <Grid style={{textAlign: 'right',width: '100%'}} container >                        
                        <Button onClick={()=> handleSubmit() }  variant="contained" color="#EE6C4D" style={{backgroundColor: '#EE6C4D',color: 'white',fontFamily: 'Vazir',margin: '0% 21% 0% 5%',width: '25%'}}>
                            ویرایش
                        </Button>                                 
                        {/* <Button onClick={handleClose} color="primary" style={{backgroundColor: '#98C1D9',color: 'white',fontFamily: 'Vazir',width: '25%'}}>
                            انصراف
                        </Button>                         */}
                        <Button onClick={() => hazf() } color="primary" style={{backgroundColor: '#E63946',color: 'white',fontFamily: 'Vazir',width: '25%'}}>
                            حذف 
                        </Button>                        
                    </Grid>
                    </DialogActions>
                    </div>
                    </M_RTL>
                </Material_RTL>
            </Dialog>
                    {successState == 1 ? 
                    (<AlertDialog text = "اعلان ویرایش شد . " />)
                    :
                    successState == 2 &&
                    <AlertDialog text="اعلان با موفقیت پاک شد ." />
                    }
                    {successState != 0 && (setShowEditNote(false))}
        </div>        
    );
}