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

  localStorage.setItem('editable question' , 10000);

  return (
    <div className={classes.root}>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}  lg={6} className = {classes.grid}>
          <h3 style={{fontFamily: 'Vazir',backgroundColor: '#1CA0A0',color: 'white',height: '40px',borderRadius: '5px',padding: '2%'}} >سوال هایی که تا کنون طرح کرده اید</h3>
                          <hr/>
              {/* { questions } */}
              <GetUserQuestions />
          </Grid>      
          <Grid item xs={12}  lg={6} className = {classes.grid}>          
          <h3 style={{fontFamily: 'Vazir',backgroundColor: '#1CA0A0',color: 'white',height: '40px',borderRadius: '5px',padding: '2%'}} >طرح سوال جدید</h3>
                          <hr/>              
            <Question 
                submitButton="طرح"
                backColor = '#f2f2f2'
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

      axios.get(serverURL() + "question?limit=10" , tokenConfig() )    
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
                this.state.questions.map((m , index) =>
                <UserDesignedQuestion  
                  backColor = '#f2f2f2'   
                  index = {index}
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
