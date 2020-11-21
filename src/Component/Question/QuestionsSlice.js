import { createSlice } from '@reduxjs/toolkit'

export const QuestionsSlice = createSlice({
  name: 'editting question',
  initialState: {    
    edittingQuestionIndex : -1 ,    
  },
  reducers: {    
    loadEdittingQuestion  (state , action) {        
      state.edittingQuestionIndex = action.payload // action.payload      
    }
  }
})

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectQuestion = state => state.loadEdittingQuestion.value

export const { loadEdittingQuestion } = QuestionsSlice.actions

export default QuestionsSlice.reducer