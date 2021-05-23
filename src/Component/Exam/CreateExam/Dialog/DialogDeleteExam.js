import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import { useHistory } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Material_RTL from "../../../Material_RTL";
import M_RTL from "../../../M_RTL";
import { makeStyles } from '@material-ui/core/styles';
import { LightenDarkenColor } from 'lighten-darken-color'; 
import axios from 'axios' ;
import serverURL from    '../../../../utils/serverURL' ;
import tokenConfig from  '../../../../utils/tokenConfig' ;

function DialogDeleteExam (props){
    const classes = useStyles();
    const[openDelete,setOpenDelete] = React.useState(false);
    // const [noteListLoad,setNoteListLoad] = props.noteListLoad;
    // const [showEditNote,setShowEditNote] = props.showEditNote;
    const history = useHistory() ;      
    const handleClickOpen = e => {
        setOpenDelete(true);
    }
    const handleClose = e => {        
        setOpenDelete(false);
    }

    const handleSubmit =e =>{        
        axios.delete(serverURL() + "exam/" + props.examId , tokenConfig())
        .then(res => {
          history.push("/class/" + props.classId);
        })
        .catch(err => {
        console.log(err.message);                    
        });   
    }
    return(
        <div>
            {/* <Button type="submit"
              variant="contained"
              className = {classes.addButton}
              style={{fontFamily: 'Vazir',width: '23%',position:'absolute',backgroundColor:'#E63946'}}
              onClick={handleClickOpen}>
                                حذف
            </Button> */}
            <Tooltip title={<span style={{fontFamily: 'Vazir',fontSize: '16px'}}>تغییر مشخصات</span>}title={<span style={{fontFamily: 'Vazir',fontSize: '12px'}}>حذف آزمون</span>} TransitionComponent={Zoom} style={{fontFamily: 'Vazir'}} >
              <Button variant="contained" color="#98C1D9" 
                style={{fontFamily: 'Vazir'}}
                className = {classes.button}
                onClick={()=>{   
                        setOpenDelete(true);                                             
                }}
                >
                  <DeleteIcon style={{color : '#3D5A80'}} />
                {/* حذف آزمون */}
              </Button>    
            </Tooltip>

            <Dialog style={{fontFamily: 'Vazir'}} open={openDelete} onClose={handleClose} aria-labelledby="form-dialog-title">
                <Material_RTL>
                <M_RTL>
                <DialogTitle style={{fontFamily: 'Vazir' , backgroundColor : '#3D5A80',textAlign: 'center'}}>
                <span style={{fontFamily: 'Vazir' ,color : 'white'}}>حذف امتحان ، آیا مطمئنید ؟ </span>
                </DialogTitle>
                  {/* <DialogTitle  id="form-dialog-title"><span style={{direction: 'rtl',fontFamily: 'Vazir',position: 'absolute',right: '36%',top: '10%'}}>ویرایش کلاس</span></DialogTitle> */}
                  <div className={classes.paper}> 
                <DialogContent>                
                        <Button onClick={handleClose} color="primary" style={{backgroundColor: '#98C1D9',color: 'white',fontFamily: 'Vazir',margin: '0% 0% 0% 2%',width: '49%'}}>
                          خیر
                        </Button>
                        <Button onClick={handleSubmit}  variant="contained" style={{backgroundColor: '#E63946',color: 'white',fontFamily: 'Vazir',width: '49%'}}>
                          بله
                          </Button>         
                </DialogContent>
                </div>
                </M_RTL>
                </Material_RTL>
            </Dialog>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({  
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
   groupbutton :{
    backgroundColor : '#EE6C4D' , 
    color : "white" ,
    "&:hover": {
      backgroundColor: LightenDarkenColor('#EE6C4D', -40) ,        
      color :'white'
    },
  },
  button : {
    marginRight : theme.spacing(2) ,       
    backgroundColor : '#98C1D9' ,
    "&:hover": {
      backgroundColor: '#EE6C4D' ,
      color : 'white' , 
    },                
  },
  addButton :{
    backgroundColor : '#EE6C4D' , 
    marginBottom : theme.spacing(1) ,
    "&:hover": {
      backgroundColor: LightenDarkenColor('#EE6C4D', -40) ,        
      color :'white'
    },
  }, 
}));

export default DialogDeleteExam;