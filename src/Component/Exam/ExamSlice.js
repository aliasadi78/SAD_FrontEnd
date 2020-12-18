import {createSlice} from '@reduxjs/toolkit';

export const ExamSlice = createSlice({
    name : 'exam' ,
    initialState : {
        examQuestions : [] , 
        name : null ,
        startDate : null ,
        endDate : null ,        
        examLength : null ,        
    } ,
    reducers : {
        setTitle(state , action){
           state.name = action.payload  
        } ,
        setStartDate(state , action){
           state.startDate = action.payload  
        } ,
        setEndDate(state , action){
            state.endDate = action.payload  
         } ,        
        setExamLength(state , action){
            state.examLength = action.payload  
        } ,
        addQuestion(state , action){
            if(state.examQuestions.includes(action.payload) == false)
                state.examQuestions.push({"question" : action.payload , "grade" : 0 });   
        },
        removeQuestion(state , action){            
            delete state.examQuestions[action.payload] ;
        },
        setQuestions(state , action){
            state.examQuestions = action.payload ;
        },
        addGrade(state , action){            
            state.examQuestions[action.payload.index].grade = parseInt(action.payload.grade);
        },        
        moveUp(state , action){            
            if(action.payload >= 1){
                let temp = state.examQuestions[action.payload];
                state.examQuestions[action.payload] = state.examQuestions[action.payload-1];
                state.examQuestions[action.payload-1] = temp ;
            }   
        },
        moveDown(state , action){            
            if(action.payload < state.examQuestions.length -1){
                let temp = state.examQuestions[action.payload];
                state.examQuestions[action.payload] = state.examQuestions[action.payload+1];
                state.examQuestions[action.payload+1] = temp ;
            }   
        }        
    }
})

export const {setTitle , 
              setStartDate , 
              setEndDate ,              
              setExamLength , 
              addQuestion ,
              removeQuestion , 
              addGrade,
              setQuestions , 
              moveUp , 
              moveDown} = ExamSlice.actions

export default ExamSlice.reducer    