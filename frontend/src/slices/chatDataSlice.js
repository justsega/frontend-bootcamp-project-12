import axios from 'axios';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes/routes.js';

export const fetchData = () => createAsyncThunk(
    'chatData/fetchData',
    async () => {
        const response = await axios.get(routes.getData(), { headers: getAuthHeader() })
        return response.data;
    }
)

const dataAdapter = createEntityAdapter();
const initialState = dataAdapter.getInitialState();

export const dataSlice = createSlice({
    name: 'data/fetchData',
    initialState,
    extraReducers: (builder) => {
      builder
        .addCase(fetchData.fulfilled, dataAdapter.addMany)
        
    },
  });
  export const selectors = dataAdapter.getSelectors((state) => state.tasks);
  
  export default dataSlice.reducer;