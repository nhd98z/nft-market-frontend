import { configureStore } from '@reduxjs/toolkit'
import providerSlice from './providerSlice'
import tokenDataSlice from './tokenDataSlice'

export default configureStore({
  reducer: {
    provider: providerSlice,
    tokenData: tokenDataSlice,
  },
})
