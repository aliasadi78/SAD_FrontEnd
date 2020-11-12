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
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { createMuiTheme } from '@material-ui/core/styles';
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
    marginTop : theme.spacing(5) ,
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
  accordion:{},
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


export default function UserDesignedQuestion(props) {

    const classes = useStyles();

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
                            <Grid container spacing={1}  >                                
                                <Grid item xs={12}>
                                    <Paper className={classes.paper}>
                                        <TextField                    
                                            id="outlined-multiline-static"
                                            label="طرح سوال جدید"
                                            multiline
                                            rows={4}
                                            fullWidth = 'true'
                                            className = {classes.BigForm}
                                            // defaultValue="Default Value"
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
                                        <Button variant="contained" className={classes.EditButton} href="#contained-buttons">
                                            <Typography variant='button' style = {{fontFamily: 'Vazir'}} >
                                                ویرایش
                                            </Typography>
                                        </Button>                                       
                                    </Grid>
                                    <Grid item xs={2}>                                        
                                        <Button variant="contained" className={classes.DeleteButton} href="#contained-buttons">
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

function AddQuestion (){

}