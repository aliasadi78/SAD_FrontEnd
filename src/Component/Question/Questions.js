import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import NewQuestion from './NewQuestion' ;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function Questions() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>          
            <NewQuestion />          
        </Grid>
        <Grid item xs={12} sm={12}>
            {/* get user questions and show it by question component here */}
          <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid>        
      </Grid>
    </div>
  );
}
