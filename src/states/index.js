import { configureStore } from '@reduxjs/toolkit'
import providerSlice from './providerSlice'

export default configureStore({
  reducer: {
    provider: providerSlice,
  },
})