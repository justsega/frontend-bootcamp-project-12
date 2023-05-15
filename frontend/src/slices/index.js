import { configureStore } from '@reduxjs/toolkit';
import { fetchData, dataSlice } from './chatDataSlice';

export default configureStore({
  reducer: {
    data: dataReducer,
  },
});