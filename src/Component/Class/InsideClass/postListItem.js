import { makeStyles } from "@material-ui/core";
import React from 'react';
import Toast from 'react-bootstrap/Toast';
import Material_RTL from "../../Material_RTL";
import RTL from '../../M_RTL';

const useStyles = makeStyles((theme) => ({
    title: {
        // fontSize: 22,
        fontFamily: 'Vazir',
    },
    pos: {
    marginBottom: 12,
    fontFamily: 'Vazir',
    },
    card:{
        fontFamily: 'Vazir',
        width: '25%',        
        display: 'inline-block',
        margin: '2%',                
        boxShadow: '0 2px 1px 1px rgba(204, 204, 204, .6)',
        "&:hover": {          
          boxShadow: '0 5px 3px 3px rgba(204, 204, 204, .6)',
        },       
        // backgroundColor : '#E0FBFC',
    },
    btn:{
        fontFamily: 'Vazir',
        backgroundColor : '#0e918c' ,
        "&:hover": {
          backgroundColor: '#EE6C4D' ,
          color : 'white' , 
        },          
    },    
    Toast:{
        margin : theme.spacing(3) ,
        width : '600px'
    },
}));

export default function PostListItem (props){

    const classes = useStyles();
    console.log(props);

    return(
        // <Grid item >
        //     <Paper elevation = {2}  className = {classes.paperList}>
                                
        //     </Paper>
        // </Grid>   
        <Toast className = {classes.Toast}>
            <Toast.Header>
                <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                <small>11 mins ago</small>
                <strong className="ml-auto">کوییز 58 ام </strong>                
            </Toast.Header>
            <Toast.Body>
                کوییز 58 ام از فصل 23 فردا گرفته خواهد شد . 
                کوییز 58 ام از فصل 23 فردا گرفته خواهد شد . 
                کوییز 58 ام از فصل 23 فردا گرفته خواهد شد . 
                کوییز 58 ام از فصل 23 فردا گرفته خواهد شد . 
                کوییز 58 ام از فصل 23 فردا گرفته خواهد شد . 
            </Toast.Body>

        </Toast>
    );
}