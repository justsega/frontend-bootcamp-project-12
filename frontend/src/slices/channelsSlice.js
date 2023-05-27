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
    removeChannel: (state, { payload }) => {
      channelsAdapter.removeOne(state, payload);
      if (state.activeChannelId === payload) {
        // eslint-disable-next-line no-param-reassign
        state.activeChannelId = 1;
      }
    },
    updateChannel: channelsAdapter.updateOne,
    activeChannelId: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.activeChannelId = payload;
    },
    getActiveChannelName: channelsAdapter.selectId,

  },
});

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
