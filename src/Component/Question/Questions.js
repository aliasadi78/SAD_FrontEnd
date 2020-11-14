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

export default function Questions(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}  lg={6} className = {classes.grid}>
              {/* { questions } */}
              <GetUserQuestions />
          </Grid>      
          <Grid item xs={12}  lg={6} className = {classes.grid}>                        
            <Question 
                submitButton="طرح"
                backColor = '#087E8B'
            />
          </Grid>                      
        </Grid>
      </Container>
    </div>
  );
}

function loadQuestionToEditPannel (){
    
}

class GetUserQuestions extends Component{

    constructor(props){
      super(props);

      this.state = {
          bool : false
      };    

      var userQuestions = [];

      axios.get(serverURL() + "question" , tokenConfig() )    
      .then( res =>{      
        userQuestions.push(...res.data.questions);
        console.log(userQuestions);
        // const Qs = JSON.parse(res.data.questionfs);
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
    
    render (){      
      if(this.state.bool == true){
        return (        
            <div>
            {        
              // questionsArray.map((m) =>           
                this.state.questions.map((m) =>
                <UserDesignedQuestion  
                  backColor = '#98C1D9'   
                  buttonClick={loadQuestionToEditPannel} 
                  questionId = {m._id}
                  question = {m.question}
                  />)
            }
            </div>            
        );
      } else {
        return (
          <div></div>
        )
      }
    }
}
