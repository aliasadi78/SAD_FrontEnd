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
            // state.examQuestions = state.examQuestions.filter((item)=>(item.question._id != null && item.question._id !== action.payload) || 
            //                                                          (item.question.qId != null && item.question.qId !== action.payload))
            state.examQuestions = state.examQuestions.filter((item)=>!(item.question._id == action.payload || item.question.qId == action.payload));
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
              setStartDate , 
              setEndDate ,              
              setExamLength , 
              addQuestion ,
              removeQuestion , 
              addGrade,
              setQuestions , 
              moveUp} = ExamSlice.actions

export default ExamSlice.reducer    