import { makeStyles } from "@material-ui/core";
import React from 'react';
import Toast from 'react-bootstrap/Toast';
import Material_RTL from "../../Material_RTL";
import RTL from '../../M_RTL';

const useStyles = makeStyles((theme) => ({    
    Toast:{
        margin : theme.spacing(3) ,
        width : '1000px'
    },
}));

export default function PostListItem (props){

    const classes = useStyles();    

    return(
        <Toast className = {classes.Toast}>
            <Toast.Header>
                {/* <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" /> */}
                <small>2 روز پیش</small>
                <strong className="ml-auto">{props.title}کوییز 58 ام </strong>                
            </Toast.Header>
            <Toast.Body>
                {props.content}
                کوییز 58 ام از فصل 23 فردا گرفته خواهد شد . 
                کوییز 58 ام از فصل 23 فردا گرفته خواهد شد . 
                کوییز 58 ام از فصل 23 فردا گرفته خواهد شد . 
                کوییز 58 ام از فصل 23 فردا گرفته خواهد شد . 
                کوییز 58 ام از فصل 23 فردا گرفته خواهد شد . 
            </Toast.Body>

        </Toast>
    );
}