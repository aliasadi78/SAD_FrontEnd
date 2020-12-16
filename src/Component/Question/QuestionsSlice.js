import { createSlice } from '@reduxjs/toolkit'

export const QuestionsSlice = createSlice({
  name: 'editting question',
  initialState: {    
    edittingQuestionIndex : -1 ,    
    base : [] ,
    chapter : [] ,
    course : [] ,
    hardness : [] ,
    type : []
  },
  reducers: {    
    loadEdittingQuestion  (state , action) {        
      state.edittingQuestionIndex = action.payload // action.payload      
    } ,
    savePublicApis (state , action) {
      // state.base = action.payload ;      
      state.base = [...Object.entries(action.payload.base)] ;
      state.chapter = [...Object.entries(action.payload.chapter)] ;
      state.course = [...Object.entries(action.payload.course)] ;
      state.hardness = [...Object.entries(action.payload.hardness)] ;
      state.type = [...Object.entries(action.payload.type)];
    }
  }
})

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectQuestion = state => state.loadEdittingQuestion.value

export const { loadEdittingQuestion } = QuestionsSlice.actions

export const { savePublicApis } = QuestionsSlice.actions

export default QuestionsSlice.reducer