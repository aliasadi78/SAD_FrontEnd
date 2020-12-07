import { configureStore} from '@reduxjs/toolkit'
import questionReducer from '../Component/Question/QuestionsSlice' ;
import dashboardReducer from '../Component/Dashboard/DashboardSlice' ;
import {createStore , combineReducers} from 'redux' ;

export default () => {
  const store = createStore(
    combineReducers({
      edittingQuestion: questionReducer ,
      dashboard: dashboardReducer ,    
    })
    ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

  return store ;
}