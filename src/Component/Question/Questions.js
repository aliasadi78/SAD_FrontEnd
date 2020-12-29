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
import Paper from '@material-ui/core/Paper';
import {
  selectQuestion ,
} from './QuestionsSlice' ;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width : '100%' ,
    backgroundColor : 'white'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  grid :{
    width : '70%' ,
  },
  editprofilePaper :{
    marginBottom : theme.spacing(2) , 
  },
}));

class Questions extends Component {

  constructor (props){
    super(props);

    this.state = {      
      grades : [] ,       
      types : [] ,
      hardnesses : [] ,
      chapters : [] ,
      courses : []
    };          
    var userQuestions = [];  
    
    axios.get(serverURL() + "public/question/category" , tokenConfig())
    .then(res => {        
        console.log(res.data);      
        this.setState(prevstate =>{
          return{
            grades : [...Object.entries(res.data.base)] , 
            types : [...Object.entries(res.data.type)] , 
            hardnesses : [...Object.entries(res.data.hardness)] , 
            chapters : [...Object.entries(res.data.chapter)] ,             
            courses : [...Object.entries(res.data.course)] ,             
        }})                  
    })
    .catch(err=>{
        console.log(err);
    });


  }

  render(props){
    const classes = this.props.classes;                

    return (
      <div className={classes.root}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}  lg={6} className = {classes.grid} spacing= {2}>            
            
            <Grid item xs={12}>
              <Paper elevation={3} className={classes.editprofilePaper}style={{backgroundColor: '#1CA0A0',color: 'white',padding: '2%',borderRadius: '5px',height: '40px'}}>
              سوال هایی که تا کنون طرح کرده اید
              </Paper>
            </Grid>            
            <Grid item xs={12}>                  
                    <div>
                    {                                                      
                        this.props.questions.map((m , index) =>
                        <UserDesignedQuestion  
                          backColor = '#f2f2f2'   
                          question = {m}
                          index = {index}                          
                          type={m.type}
                          answers = {m.answers}                          
                          options = {m.options}
                          soalImage = {m.imageQuestion}
                          onRefresh = {this.props.onRefresh}
                          javabImage = {m.imageAnswer}
                          // onclick = {() => {edit(index)}}                          
                          />)
                    }
                    </div>                            
              </Grid>
            </Grid>                 
            <Grid item xs={12} sm = {12}  lg={6} className = {classes.grid}>          
              <Grid item xs={12}>
                <Paper elevation={3} className={classes.editprofilePaper}style={{backgroundColor: '#1CA0A0',color: 'white',padding: '2%',borderRadius: '5px',height: '40px'}}>
                  طرح سوال جدید
                </Paper>
              </Grid>

              <Grid item xs={12}>                
                  <Question                                          
                      submitButton="طرح"
                      onRefresh = {this.props.onRefresh}
                      backColor = '#f2f2f2'                                          
                      grades = {this.state.grades}
                      courses = {this.state.courses}
                      chapters = {this.state.chapters}
                      types = {this.state.types}
                  />                                                                                                                                                      
              </Grid>                             
            </Grid>                     
          </Grid>          
        </Container>
      </div>
    );
  }

}
export default () => {
  const classes = useStyles();  
  const [questionsFound , setQuestionsFound ]  = React.useState(false);
  const [questions , setQuestions] = React.useState([]);

  if(questionsFound == false)
    axios.get(serverURL() + "question?limit=10" , tokenConfig() )    
    .then(res =>{      
      setQuestions([...res.data.questions]);
      setQuestionsFound(true);
    })
    .catch(err=>{
      console.log(err.response);
    });
  
  return (        
    <div>
      {questionsFound == true &&
        <Questions 
          onRefresh = {() => {
            setQuestionsFound(false);
          }}
          questions = {questions}
          classes={classes}
          />    
      }
    </div>
  )
}