import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
    activeChannelId: 1,
});

const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        addChannels: channelsAdapter.addMany,
        addChannel: channelsAdapter.addOne,
        removeChannel: channelsAdapter.removeOne,
        updateChannel: channelsAdapter.updateOne,
        activeChannelId: (state, { payload }) => {
            state.activeChannelId = payload;
        },
        
    }, 
})

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;