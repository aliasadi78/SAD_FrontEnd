import {} from '@reduxjs/toolkit';

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
        setStartDate(state , action){
           state.startDate = action.payload  
        } ,
        setEndDate(state , action){
           state.endDate = action.payload  
        } ,
        setExamLength(state , action){
            state.examLength = action.payload  
        } ,
        setQuestions(state , action){
            state.examQuestions = action.payload  
        } ,
    }
})

export const {setTitle , 
              setStartDate , 
              setEndDate , 
              setExamLength , 
              setQuestions} = ExamSlice.actions

export default ExamSlice.reducer    