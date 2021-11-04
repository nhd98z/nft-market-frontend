import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  metaData: {},
}

export const fetchMetadata = createAsyncThunk('tokenData/updateMetadata', async (nftContract, i, { dispatch }) => {
  console.log('aaaaaaaaaaaaaaaa')
  const tokenUri = await nftContract.tokenURI(i.tokenId)
  const meta = await axios.get(tokenUri)
  const data = {
    id: i.tokenId,
    meta: meta.data,
  }
  dispatch(updateMetadata(data))
})

export const tokenDataSlice = createSlice({
  name: 'tokenData',
  initialState,
  reducers: {
    updateMetadata(state, action) {
      console.log('111', action.payload)
      state.metaData = { ...state.metaData, ...action.payload }
      console.log('state.metaData', state.metaData)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMetadata.fulfilled, (state, action) => {})
  },
})

export const { updateMetadata } = tokenDataSlice.actions

export default tokenDataSlice.reducer
