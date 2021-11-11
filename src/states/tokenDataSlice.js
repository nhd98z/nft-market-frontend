import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  metaData: {},
}

export const fetchMetadata = createAsyncThunk('tokenData/updateMetadata', async (payload, { dispatch }) => {
  const {id, meta} = payload 
  const data = {
    id: id.toNumber(),
    meta: meta,
  }
  dispatch(updateMetadata(data))
})

export const tokenDataSlice = createSlice({
  name: 'tokenData',
  initialState,
  reducers: {
    updateMetadata(state, action) {
      const {id, meta} = action.payload
      state.metaData = { ...state.metaData, ...{[id]: meta} }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMetadata.fulfilled, (state, action) => {})
  },
})

export const { updateMetadata } = tokenDataSlice.actions

export default tokenDataSlice.reducer
