import { createSlice } from '@reduxjs/toolkit'

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {    
    isDrawerOpen : false 
  },
  reducers: {        
    handleMenuOpen  (state , action) {
      state.isDrawerOpen = action.payload
    },
  }
})

export const { incrementByAmount } = dashboardSlice.actions

export const {handleMenuOpen} = dashboardSlice.actions

export default dashboardSlice.reducer