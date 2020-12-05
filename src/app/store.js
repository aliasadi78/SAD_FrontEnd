import { configureStore } from '@reduxjs/toolkit'
import questionReducer from '../Component/Question/QuestionsSlice' ;
import dashboardReducer from '../Component/Dashboard/DashboardSlice' ;

export default configureStore({
  reducer: {
    edittingQuestion: questionReducer ,
    dashboard: dashboardReducer ,    
  }
})