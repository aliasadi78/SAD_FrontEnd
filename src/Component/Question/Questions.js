import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Question from './Question' ;
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import NewQuestion from './NewQuestion' ;
import {Typography} from 'material-ui/styles/typography';
import UserDesignedQuestion from './userDesignedQuestions' ;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width : '100%' ,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  grid :{
    width : '70%' ,
  },
}));

export default function Questions() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}  lg={6} className = {classes.grid}>
              <UserDesignedQuestion
              backColor = '#98C1D9' />
          </Grid>      
          <Grid item xs={12}  lg={6} className = {classes.grid}>          
              <NewQuestion
                alwaysExpand = 'true'  />          
          </Grid>                      
        </Grid>
      </Container>
    </div>
  );
}
