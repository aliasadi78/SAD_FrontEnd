import { createSlice } from '@reduxjs/toolkit'

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {    
    isDrawerOpen : false 
  },
  reducers: {        
    hanldeDrawerOpen : state => {
      
    },
  }
})

export const { incrementByAmount } = dashboardSlice.actions

export default dashboardSlice.reducer