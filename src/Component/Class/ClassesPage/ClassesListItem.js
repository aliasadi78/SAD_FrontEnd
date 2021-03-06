import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import React from 'react';

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
        width : 'inherit'
    },    
}));

export default function ClassListItem (props){

    const classes = useStyles();
    // console.log(props);

    return(
        <Card className={classes.card} variant="outlined">
            <CardContent>
                <Typography
                variant="h5" 
                component="h4"
                className={classes.title}
                color="black"
                gutterBottom
                >
                {props.title}
                </Typography>
                <Typography 
                className={classes.pos} 
                color="black">
                {props.TeacherName}
                </Typography>
            </CardContent>
            <CardActions>
                <Button square variant="contained" s onClick={()=>{
                    const url = "/class/" + props.classId ;
                    window.location.href = url ;
                }} className={classes.btn}
                style={{width : '100%'}}>ورود به کلاس</Button>
            </CardActions>
        </Card>
    );
}