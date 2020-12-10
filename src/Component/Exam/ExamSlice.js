import {createSlice} from '@reduxjs/toolkit';

export const ExamSlice = createSlice({
    name : 'exam' ,
    initialState : {
        examQuestions : [] , 
        title : null ,
        startDate : null ,
        endDate : null ,
        examLength : null 
    } ,
    reducers : {
        setTitle(state , action){
           state.title = action.payload  
        } ,
        setDate(state , action){
           state.startDate = action.payload  
        } ,
        setStartHour(state , action){
           state.endDate = action.payload  
        } ,
        setEndHour(state , action){
            state.endDate = action.payload  
         } ,
        setExamLength(state , action){
            state.examLength = action.payload  
        } ,
        addQuestion(state , action){
            if(state.examQuestions.includes(action.payload) == false)
                state.examQuestions.push(action.payload);   
        },
        removeQuestion(state , action){
            state.examQuestions = state.examQuestions.filter((item)=>item._id !== action.payload)
        },
    }
})

export const {setTitle , 
              setDate , 
              setEndHour ,
              setStartHour ,  
              setExamLength , 
              addQuestion ,
              removeQuestion} = ExamSlice.actions

export default ExamSlice.reducer    