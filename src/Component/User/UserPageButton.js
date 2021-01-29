import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import {useHistory} from 'react-router-dom' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ; 
import { 
    faChalkboard ,
    faUserEdit ,
    faPencilAlt
} from "@fortawesome/free-solid-svg-icons";
import styles from '../../App.css';

const useStyles = makeStyles((theme) => ({
    title: {
        // fontSize: 22,
        fontFamily: 'Vazir',
        color : '#3D5A80'
    },
    pos: {
    marginBottom: 12,
    fontFamily: 'Vazir',
    },
    card:{        
        fontFamily: 'Vazir',               
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
        width : 'inherit'
    },    
}));

export default function UserPageButton (props){

    const classes = useStyles();
        
    let history = useHistory() ;
    const [length , setLength] = React.useState(200);        

    return(
        <Card onClick = {() => {            
            history.push(props.url);
        }} className={classes.card} style = {{width : length + 'px' , height : length + "px"}} variant="outlined">
            <CardContent style={{textAlign : 'center'}}>                               

                <Typography
                variant="h5" 
                component="h6"
                className={classes.title}
                color="black"
                gutterBottom
                >
                    {props.name}
                </Typography>
                <div style={{marginTop : '30px' }}>
                    <FontAwesomeIcon icon={props.name == "ویرایش اطلاعات" ? faUserEdit :
                                            props.name == "کلاس ها" ? faChalkboard : faPencilAlt } color ="#3D5A80" size="6x" />                    
                </div>

            </CardContent>

            <CardActions>                
            </CardActions>
        </Card>
    );
}