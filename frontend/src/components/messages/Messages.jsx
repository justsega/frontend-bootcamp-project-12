import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Col } from 'react-bootstrap';
import filter from 'leo-profanity';
import { selectors as messagesSelectors } from '../../slices/messagesSlice';
import { selectors as channelsSelectors } from '../../slices/channelsSlice';
import useSocket from '../../hooks/SocketHook';
import useAuth from '../../hooks/AuthHook';
import MessagesHeader from './MessagesHeader';
import MessagesBox from './MessagesBox';
import MessagesInput from './MessagesInput';

const Messages = () => {
  useEffect(() => {
    const messagesBox = document.getElementById('messages-box');
    messagesBox.scrollTop = messagesBox.scrollHeight;
  });
  const { t } = useTranslation();
  filter.loadDictionary('ru');
  filter.loadDictionary('en');
  const username = useAuth().getUserName();

  const { activeChannelId } = useSelector((state) => state.channels);
  const activeChannel = useSelector(
    (state) => channelsSelectors.selectById(state, activeChannelId),
  );
  const activeChannelName = activeChannel ? activeChannel.name : '';
  const messages = useSelector(messagesSelectors.selectAll)
    .filter((m) => m.channelId === activeChannelId);
  const socket = useSocket();
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      socket.addMessage(filter.clean(values.message), activeChannelId, username);
      formik.resetForm();
    },
  });
  return (
    <Col className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <MessagesHeader messages={messages} t={t} activeChannelName={activeChannelName} />
        <MessagesBox messages={messages} />
        <MessagesInput formik={formik} t={t} />
      </div>
    </Col>
  );
};

export default Messages;
