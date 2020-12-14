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
                state.examQuestions.push({"question" : action.payload , "grade" : 0 });   
        },
        removeQuestion(state , action){
            state.examQuestions = state.examQuestions.filter((item)=>item.question._id !== action.payload)
        },
        addGrade(state , action){
            state.examQuestions.find(item => item.question._id == action.payload[0]).grade = parseInt(action.payload[1]) ;
        },
        setQuestions(state , action){
            state.examQuestions = action.payload ;
        },
        moveUp(state , action){
            console.log("shit clicked:" + action.payload);
            if(action.payload >= 1){
                let temp = state.examQuestions[action.payload];
                state.examQuestions[action.payload] = state.examQuestions[action.payload-1];
                state.examQuestions[action.payload-1] = temp ;
            }   
        }        
    }
})

export const {setTitle , 
              setDate , 
              setEndHour ,
              setStartHour ,  
              setExamLength , 
              addQuestion ,
              removeQuestion , 
              addGrade,
              setQuestions , 
              moveUp} = ExamSlice.actions

export default ExamSlice.reducer    