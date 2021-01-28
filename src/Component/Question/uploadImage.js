import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux' ;
import { imageAnswer ,
    imageQuestion } from './QuestionsSlice' ;
const useStyles = makeStyles((theme) => ({
    input :{
        display : 'none' ,
    },
}))

function UploadImage(props){

    const classes = useStyles();            
    
    // const [ImageBase64 , setImageBase64] = React.useState(props.id == 'soal' ? 
    //     (props.imageQuestion) : props.id == 'javab' && props.imageAnswer);
    
    // const [isImage , setIsImage] = React.useState((props.id=='soal' && props.imageQuestion != null) || 
    //     (props.id == 'javab' && props.imageAnswer != null));  

    const uploadImage = async (e) => {        
        const file = e.target.files[0];          
        const base64 = await convertBase64(file);         
        // setImageBase64(base64);
        if(props.id == 'soal')
            props.addImageQuestion(btoa(base64))
        if(props.id == 'javab')
            props.addImageAnswer(btoa(base64))
        // setIsImage(true);        
    }


    const convertBase64 = (file) => {
        return new Promise((resolve , reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
  
            fileReader.onload = () => {
              resolve(fileReader.result);
            };
  
            fileReader.onerror = (err) => {
                reject(err);
            };
        })
    }

    return (
        <Grid container >
            <Grid item xs={12} >
                <input accept="image/*" name={props.id} id={props.id} type="file" 
                    className = {classes.input}
                    onChange={(e) => {
                        uploadImage(e);
                    }}/>
                <label htmlFor={props.id}>
                    <IconButton aria-label="upload picture" component="span">
                    <PhotoLibraryIcon style={{color:'#EE6C4D'}} />
                    </IconButton>
                </label>    
            </Grid>
            {(props.id=='soal' && props.imageQuestion != null) || 
                (props.id == 'javab' && props.imageAnswer != null) ?

                <Grid item xs={12}>
                    <img                     
                    src={props.id == 'soal' ? 
                    atob(props.imageQuestion) : props.id == 'javab' && atob(props.imageAnswer)}                    
                    width="50%" height="80%" style={{cursor: 'pointer' , margin : '2px'}}/>  
                    <IconButton onClick={()=>{
                        // setImageBase64(null);
                        if(props.id=='soal')
                            props.addImageQuestion(null);
                        if(props.id=='javab')
                            props.addImageAnswer(null);
                        // setIsImage(false);
                    }}>
                        <CloseIcon style={{color:'#EE6C4D'}} />
                    </IconButton>
                </Grid>
                : null
            }     
        </Grid  >
    );
}

const mapStateToProps = state => {
    return {
        imageAnswer : state.edittingQuestion.edittedQuestion.imageAnswer , 
        imageQuestion : state.edittingQuestion.edittedQuestion.imageQuestion , 
    }
}

const mapDispatchToProps = dispatch => {
    return{
        addImageAnswer : (e) => dispatch(imageAnswer(e)) ,
        addImageQuestion : (e) => dispatch(imageQuestion(e)) ,
    }
}

export default connect (mapStateToProps , mapDispatchToProps )(UploadImage);