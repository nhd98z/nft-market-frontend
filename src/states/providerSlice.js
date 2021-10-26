import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  provider: null
}

export const providerSlice = createSlice({
  name: 'provider',
  initialState,
  reducers: {
    updateProvider: (state, action) => {
      state.provider = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateProvider } = providerSlice.actions

export default providerSlice.reducer