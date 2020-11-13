import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LightenDarkenColor } from 'lighten-darken-color'; 
import Paper from '@material-ui/core/Paper';
import Material_RTL from "../Material_RTL";
import RTL from '../M_RTL';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button' ;
import axios from 'axios' ;
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { createMuiTheme } from '@material-ui/core/styles';
import serverURL from '../../utils/serverURL';
import tokenConfig from '../../utils/tokenConfig';
const theme = createMuiTheme({
  palette: {
    primary:{
        main :  '#3D5A80',
    }, 
    secondary :{
        main: '#EE6C4D' ,
    }, 
  },  
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,    
    width : '100%'
  },
  paper: {
    padding: theme.spacing(1),    
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius : '0px' ,
  },
  expandGrid :{               
      align : 'center'
  },
  grid :{
    alignItems : 'flex-end' ,
  },
  input: {
    display: 'none',
  },
  accordion:{
      paddingBottom : theme.spacing(0) ,
  },  
  EditButton :{
      backgroundColor :'#EE6C4D' ,
      "&:hover": {
        backgroundColor: LightenDarkenColor('#EE6C4D', -40) ,
        color :'white'
      },
  },
  DeleteButton :{
    backgroundColor :'#E63946' ,
    "&:hover": {
      backgroundColor: LightenDarkenColor('#E63946', -40) ,
      color :'white'
  },
},
}));


// function deleteQuestion(questionID){

//     const a = {
//         "questionId" : {questionID}
//     };

//     const ajson = JSON.stringify(a);
//     console.log(questionID);
//     axios.delete( serverURL() + "question/" + questionID  , tokenConfig() );
// }

function editQuestion (){
    // localStorage.setItem()
}


export default function UserDesignedQuestion(props) {

    const classes = useStyles();

    const handleDeleteQuestion = () => {
        console.log(this.props.questionId);
        axios.delete( serverURL() + "question/" + this.props.questionId  , tokenConfig() );
    };

    return (
        <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg" className = {classes.root}>            
            <Material_RTL>
                <RTL>
                    <Accordion   square              
                    className = {classes.accordion}    
                    style={{backgroundColor: props.backColor }}
                    expanded = {props.alwaysExpand}
                    >
                        <AccordionSummary
                            // expandIcon={<ExpandMoreIcon style={{ color: "white" }}/>}
                            aria-controls="panel1c-content"
                            id="panel1c-header"
                            className = {classes.accordion}                            
                            >                            
                            <Grid container spacing={0}  >                                
                                <Grid item xs={12}>
                                    <Paper className={classes.paper}>
                                        <TextField                    
                                            id="outlined-multiline-static"
                                            defaultValue = {props.question}                                  
                                            multiline
                                            rows={4}
                                            fullWidth = 'true'
                                            className = {classes.BigForm}                                            
                                            variant="outlined"
                                        />
                                    </Paper>
                                </Grid>                
                                <Grid className={classes.expandGrid} item xs={12} >
                                    <ExpandMoreIcon style={{ color: "white" , align: 'center'}}/>
                                </Grid>            
                            </Grid>                            
                        </AccordionSummary>
                        <AccordionDetails className = {classes.details}>
                            {/* <Paper className={classes.dropdownpaper}> */}
                                <Grid container justifyContent='center' spacing={3} >                 

                                    <Grid item xs={2}>
                                        <Button variant="contained" onClick ={props.buttonClick} className={classes.EditButton} href="#contained-buttons">
                                            <Typography variant='button' style = {{fontFamily: 'Vazir'}} >
                                                ویرایش
                                            </Typography>
                                        </Button>                                       
                                    </Grid>
                                    <Grid item xs={2}>                                        
                                        <Button variant="contained" onCLick={() => {handleDeleteQuestion()}} className={classes.DeleteButton}>
                                            <Typography variant='button' style = {{fontFamily: 'Vazir'}} >
                                                حذف
                                            </Typography>
                                        </Button>                                                                         
                                    </Grid>                                    
                                </Grid>                             
                            {/* </Paper>                             */}
                        </AccordionDetails>                        
                    </Accordion> 
                    </RTL>
                </Material_RTL>                
            </Container>
        </React.Fragment>
    );  
}