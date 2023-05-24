import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line import/extensions
import channelsReducer from './channelsSlice.js';
// eslint-disable-next-line import/extensions
import messagesReducer from './messagesSlice.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
  },
});
