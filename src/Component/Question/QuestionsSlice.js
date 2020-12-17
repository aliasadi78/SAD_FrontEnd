import { createSlice } from '@reduxjs/toolkit'

export const QuestionsSlice = createSlice({
  name: 'editting question',
  initialState: {    
    options : [] ,
    questionOptions : [] ,
    questionAnswers : [] ,
    imageAnswer : null ,
    imageQuestion : null ,
    edittingQuestionIndex : -1 ,    
    edittedQuestion : {
      "_id": "",
      "type": null,
      "base": '',
      "hardness": "LOW",
      "course": null,
      "chapter": null ,
      "public": false,
      "imageQuestion": null,
      "imageAnswer": null,
      "question": null,
      "answers": [],
      "options": []
    } ,
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
    selectQuestion (state , action){
      state.edittedQuestion = action.payload 
    },
    savePublicApis (state , action) {
      // state.base = action.payload ;      
      state.base = [...Object.entries(action.payload.base)] ;
      state.chapter = [...Object.entries(action.payload.chapter)] ;
      state.course = [...Object.entries(action.payload.course)] ;
      state.hardness = [...Object.entries(action.payload.hardness)] ;
      state.type = [...Object.entries(action.payload.type)];
    },
    question(state , action){
      state.edittedQuestion.question = action.payload ;
    },
    answer(state , action){
      state.edittedQuestion.answers = action.payload ;
    },
    base(state , action){
      state.edittedQuestion.base = action.payload ;
    },
    type(state , action){
      state.edittedQuestion.type = action.payload ;
    },
    hardness(state , action){
      state.edittedQuestion.hardness = action.payload ;
    },
    course(state , action){
      state.edittedQuestion.course = action.payload ;
    },
    chapter(state , action){
      state.edittedQuestion.chapter = action.payload ;
    },
    addOption(state){
      state.edittedQuestion.options.push({"option" : null});      
      state.options.push({"answer" : false });      
    },
    removeOption(state , action){
      delete state.edittedQuestion.options[action.payload] ;
      delete state.options[action.payload] ;
    },
    editOption(state , action){
      state.edittedQuestion.options[action.payload.index].option = action.payload.option ;
    },
    imageAnswer(state , action){
      state.edittedQuestion.imageAnswer = action.payload ;      
    },
    imageQuestion(state , action){
      state.edittedQuestion.imageQuestion = action.payload ;
    },
    MultiChoiseCheck(state , action){
      // state.edittedQuestion.answers.push({"answer" : action.payload + 1})
      state.options[action.payload.index].answer = action.payload.answer ;
    },
    setPublic (state , action){
      state.edittedQuestion.public = action.payload ;
    }
  }
})

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
// export const selectQuestion = state => state.loadEdittingQuestion.value

export const { loadEdittingQuestion } = QuestionsSlice.actions

export const { savePublicApis , 
               selectQuestion ,
               question , 
               answer ,
               base , 
               type , 
               hardness , 
               course , 
               chapter ,
               addOption , 
               imageAnswer ,
               imageQuestion ,
               setPublic ,
               editOption ,
               removeOption , 
               MultiChoiseCheck
             } = QuestionsSlice.actions

export default QuestionsSlice.reducer