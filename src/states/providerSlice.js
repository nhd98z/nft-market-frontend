import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  provider: undefined,
  account: undefined,
  chainId: 0,
}

export const fetchDataWithProvider = createAsyncThunk('provider/updateProvider', async (newProvider, { dispatch }) => {
  dispatch(updateProvider(newProvider))
})

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
    updateProvider(state, action) {
      state.provider = action.payload
    },
    updateAccount(state, action) {
      state.account = action.payload
    },
    updateChainId(state, action) {
      state.chainId = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataWithProvider.fulfilled, (state, action) => {})
      .addCase(fetchDataWithChainId.fulfilled, (state, action) => {})
  },
})

export const { updateProvider, updateAccount, updateBalance, updateChainId } = providerSlice.actions

export default providerSlice.reducer
