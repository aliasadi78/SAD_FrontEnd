import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Material_RTL from "../Material_RTL";
import Typography from '@material-ui/core/Typography';
import RTL from '../M_RTL';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import Button from '@material-ui/core/Button';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop : theme.spacing(5) ,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  dropdowns :{
      height : 'inherit'
  },
  input: {
    display: 'none',
  },
  accordion :{
    backgroundColor : '#98C1D9' ,
  },
  BigForm :{},
  details :{

  },
  Button :{
      backgroundColor :'#EE6C4D' ,
      "&:hover": {
        backgroundColor: '#00C853' ,
        color :'white'
      },
  },
}));

export default function NewQuestion() {
    const classes = useStyles();
//   const 
    const grades = [
        { title: 'دوازدهم'},
         { title: 'یازدهم'},
            { title: 'دهم'},
            { title: 'نهم'},        
    ];

    const lessons = [
        { title: 'ریاضی'},
         { title: 'هندسه'},
            { title: 'گسسته'},
            { title: 'فیزیک'},        
            {title: 'شیمی'},
            {title: 'ادبیات'},
    ];

    return (
        <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm" className = {classes.root}>
            <Material_RTL>
                <RTL>
                    <Accordion className={classes.accordion}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1c-content"
                            id="panel1c-header">
                            <Grid container spacing={3}>                                
                                <Grid item xs={12}>
                                    {/* <Paper className={classes.paper}> */}
                                        <TextField                    
                                            id="outlined-multiline-static"
                                            label="سوال"
                                            multiline
                                            rows={4}
                                            fullWidth = 'true'
                                            className = {classes.BigForm}
                                            // defaultValue="Default Value"
                                            variant="outlined"
                                        />
                                    {/* </Paper> */}
                                </Grid>
                            </Grid>
                        </AccordionSummary>
                        <AccordionDetails className = {classes.details}>
                                <Grid container spacing={3}>                 
                                <Grid item xs={4}>
                                    <Paper className={classes.paper}> GRADE
                                    {/* <Autocomplete
                                        id="پایه"
                                        options={grades}
                                        getOptionLabel={(option) => option.title}
                                        className = {classes.dropdowns}                                    
                                        debug
                                        renderInput={(params) => <TextField {...params} label="پایه"    
                                        />}
                                    /> */}
                                    </Paper>
                                </Grid>
                                <Grid item xs={4}>
                                    <Paper className={classes.paper}>lesson</Paper>
                                </Grid>
                                <Grid item xs={4}>
                                    <Paper className={classes.paper}>chaptor</Paper>
                                </Grid>                                
                                <Grid item xs={4}>
                                    <Paper className={classes.paper}>Question Type</Paper>
                                </Grid>

                                <Grid item xs={4}>
                                    <Paper className={classes.paper}>Difficulty</Paper>
                                </Grid>                                

                                {/* <Grid item xs={1}>                            
                                        <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                                        <label htmlFor="icon-button-file">
                                            <Button variant ='outlined' color="primary" aria-label="upload picture" component="span">
                                                <CropOriginalIcon />
                                            </Button>
                                        </label>                            
                                </Grid> */}

                                <Grid item xs={12}>                                    
                                        <TextField                    
                                            id="outlined-multiline-static"
                                            label="جواب"
                                            multiline
                                            rows={4}
                                            fullWidth = 'true'
                                            className = {classes.BigForm}
                                            // defaultValue="Default Value"
                                            variant="outlined"
                                        />                                    
                                </Grid>

                                <Grid item xs={4} justify='flex-end'>                                    
                                    <Button variant="contained" className={classes.Button} href="#contained-buttons">
                                        <Typography variant='button' style = {{fontFamily: 'Vazir'}} >
                                            طرح 
                                        </Typography>
                                    </Button>                                    
                                </Grid>
                                <Grid item xs={4}>
                                    <Paper className={classes.paper}> public check</Paper>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion> 
                    </RTL>
                </Material_RTL>
            </Container>
        </React.Fragment>
    );  
}
