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
      bool : false , 
      editQuestionIndex : -1 ,
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

    axios.get(serverURL() + "question?limit=10" , tokenConfig() )    
      .then( res =>{          
        userQuestions.push(...res.data.questions);        
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

    let editQuestionIndex = -1 ;

    const edit = (i) => {            
      editQuestionIndex = i ;      
      console.log(i);
      this.setState(prevstate => {
        return{
          editQuestionIndex : i 
        }})      
    }

    return (
      <div className={classes.root}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}  lg={6} className = {classes.grid} spacing= {2}>
            {/* <h3 style={{fontFamily: 'Vazir', color : '#3D5A80'}} > */}
            
            <Grid item xs={12}>
              <Paper elevation={3} className={classes.editprofilePaper}style={{backgroundColor: '#1CA0A0',color: 'white',padding: '2%',borderRadius: '5px',height: '40px'}}>
              سوال هایی که تا کنون طرح کرده اید
              </Paper>
            </Grid>
            {/* <Grid item xs={12}> */}
            <Grid item xs={12}>  
                {
                  this.state.bool == true ?
                    <div>
                    {                              
                        this.state.questions.map((m , index) =>
                        <UserDesignedQuestion  
                          backColor = '#f2f2f2'   
                          index = {index}
                          questionId = {m._id}
                          type={m.type}
                          answers = {m.answers}
                          question = {m.question}
                          options = {m.options}
                          onclick = {() => {edit(index)}}                          
                          />)
                    }
                    </div>            
                :                            
                  <div> 
                  </div>              
                }
              </Grid>
            </Grid>                 
            <Grid item xs={12} sm = {12}  lg={6} className = {classes.grid}>          
              <Grid item xs={12}>
                <Paper elevation={3} className={classes.editprofilePaper}style={{backgroundColor: '#1CA0A0',color: 'white',padding: '2%',borderRadius: '5px',height: '40px'}}>
                  طرح سوال جدید
                </Paper>
              </Grid>

              <Grid item xs={12}>
                {this.state.editQuestionIndex == -1 ?                                     
                  <Question                                          
                      submitButton="طرح"
                      backColor = '#f2f2f2'
                      // questionIndex={editQuestionIndex}
                      questions = {this.state.questions}
                      grades = {this.state.grades}
                      courses = {this.state.courses}
                      chapters = {this.state.chapters}
                      types = {this.state.types}
                  />                                 
                  :
                  <p>
                    edit
                  </p>
                }
                {/* <Question                                 
                    submitButton="ویرایش"
                    backColor = '#1CA0A0'    
                    questionIndex={4}                            
                /> 
                                                                        */}
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
  return (        
      <Questions 
        classes={classes}
        />    
  )
}