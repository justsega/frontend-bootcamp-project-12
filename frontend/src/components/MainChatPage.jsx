import React, { useEffect } from 'react';
import axios from 'axios';
import { Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { getAuthHeader } from '../providers/AuthProvider';
import routes from '../routes/routes';
import Channels from './Channels';
import Messages from './Messages';
// eslint-disable-next-line import/extensions
import { actions as channelsActions } from '../slices/channelsSlice.js';
// eslint-disable-next-line import/extensions
import { actions as messagesActions } from '../slices/messagesSlice.js';

const MainChatPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(routes.getData(), { headers: getAuthHeader() });
      dispatch(channelsActions.addChannels(data.channels));
      dispatch(channelsActions.activeChannelId(data.currentChannelId));
      dispatch(messagesActions.addMessages(data.messages));
    })();
  }, [dispatch]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
        <ToastContainer />
      </Row>
    </Container>

  );
};

export default MainChatPage;
