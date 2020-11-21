import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import {Typography} from 'material-ui/styles/typography';
import UserDesignedQuestion from './userDesignedQuestions' ;
import axios from 'axios' ;
import tokenConfig from '../../utils/tokenConfig';
import serverURL from '../../utils/serverURL';
import Question from './Question' ;
import {
  selectQuestion ,
} from './QuestionsSlice' ;

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

class Questions extends Component {

  constructor (props){
    super(props);

    this.state = {
      bool : false , 
    };    

    var userQuestions = [];

    axios.get(serverURL() + "question?limit=10" , tokenConfig() )    
      .then( res =>{          
        userQuestions.push(...res.data.questions);
        console.log(userQuestions);
        var list = userQuestions.map((p) => p);                
        this.setState(prevstate => {        
          return { 
            questions : list , 
            bool : true
          }
        })        
      })
      .catch(e =>{
        console.log(e);
        console.log("you have no question");
      }); 

  }

  render(){
    const classes = this.props.classes;        

    return (
      <div className={classes.root}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}  lg={6} className = {classes.grid}>
            <h3 style={{fontFamily: 'Vazir', color : '#3D5A80'}} >سوال هایی که تا کنون طرح کرده اید</h3>
                            <hr/>
                {
                  this.state.bool == true ?
                    <div>
                    {                              
                        this.state.questions.map((m , index) =>
                        <UserDesignedQuestion  
                          backColor = '#98C1D9'   
                          index = {index}
                          questionId = {m._id}
                          question = {m.question}
                          />)
                    }
                    </div>            
                :                            
                  <div> 
                  </div>              
                }
            </Grid>      
            <Grid item xs={12}  lg={6} className = {classes.grid}>          
            <h3 style={{fontFamily: 'Vazir' , color : '#3D5A80'}} >طرح سوال جدید</h3>
                            <hr/>              
              <Question 
                  questions = {this.state.questions}
                  submitButton="طرح"
                  backColor = '#1CA0A0'
              />
            </Grid>                      
          </Grid>
        </Container>
      </div>
    );
  }

}
export default () => {
  const classes = useStyles();  
  return (        
      <Questions 
        classes={classes}
        />    
  )
}