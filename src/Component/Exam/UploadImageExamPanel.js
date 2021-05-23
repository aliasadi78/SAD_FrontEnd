import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    input :{
        display : 'none' ,
    },
}))

export default function UploadImageQuestionPanel(props){

    const classes = useStyles();            

    const [ImageBase64 , setImageBase64] = React.useState("");
    const [isImage , setIsImage] = React.useState(false);  
    
    const uploadImage = async (e) => {        
        const file = e.target.files[0];          
        const base64 = await convertBase64(file);         
        setImageBase64(base64);
        props.getImage(btoa(base64));
        setIsImage(true);        
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
            {isImage == true &&
                <Grid item xs={12}>
                    <img src={ImageBase64} 
                    //   onClick={handleClickOpenImage} 
                    width="50%" height="80%" style={{cursor: 'pointer' , margin : '2px'}}/>  
                    <IconButton onClick={()=>{
                        setImageBase64(null);
                        setIsImage(false);
                    }}>
                        <CloseIcon style={{color:'#EE6C4D'}} />
                    </IconButton>
                </Grid>
            }     
        </Grid  >
    );
}