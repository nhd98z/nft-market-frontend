import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  account: undefined,
  chainId: process.env.REACT_APP_DEFAULT_CHAIN_ID ?? 1,
}

export const fetchDataWithChainId = createAsyncThunk('provider/updateChainId', async (newChainId, { dispatch }) => {
  dispatch(updateChainId(newChainId))
})

export const fetchDataWithAccount = createAsyncThunk('provider/updateAccount', async (newAccount, { dispatch }) => {
  dispatch(updateAccount(newAccount))
})

export const providerSlice = createSlice({
  name: 'provider',
  initialState,
  reducers: {
    updateAccount(state, action) {
      state.account = action.payload
    },
    updateChainId(state, action) {
      state.chainId = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDataWithChainId.fulfilled, (state, action) => {})
  },
})

export const { updateAccount, updateChainId } = providerSlice.actions

export default providerSlice.reducer
