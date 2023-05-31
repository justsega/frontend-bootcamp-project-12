import React, { useMemo } from 'react';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import SocketContext from '../contexts/SocketContext';
import { actions as channelsActions } from '../slices/channelsSlice';
import { selectors as messagesSelectors, actions as messagesActions } from '../slices/messagesSlice';

const socket = io();

export const addChannel = (name) => {
  socket.emit('newChannel', { name });
};

export const removeChannel = (id) => {
  socket.emit('removeChannel', { id });
};

export const addMessage = (body, channelId, username) => {
  socket.emit('newMessage', { body, channelId, username });
};

export const renameChannel = (id, name) => {
  socket.emit('renameChannel', { id, name });
};

export const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const messages = useSelector(messagesSelectors.selectAll);

  socket.on('newChannel', (payload) => {
    const { id } = payload;
    dispatch(channelsActions.addChannel(payload));
    dispatch(channelsActions.activeChannelId(id));
  });

  socket.on('removeChannel', (payload) => {
    const { id } = payload;
    const messagesOfRemovedChannel = messages
      .filter((message) => message.channelId === id)
      .map((message) => message.id);
    dispatch(messagesActions.removeMessages(messagesOfRemovedChannel));
    dispatch(channelsActions.removeChannel(id));
  });

  socket.on('newMessage', (payload) => {
    dispatch(messagesActions.addMessage(payload));
  });

  socket.on('renameChannel', (payload) => {
    const { id, name } = payload;
    dispatch(channelsActions.updateChannel({ id, changes: { name } }));
  });

  const memo = useMemo(() => ({
    addChannel, removeChannel, addMessage, renameChannel,
  }));

  return (
    <SocketContext.Provider value={memo}>
      {children}
    </SocketContext.Provider>
  );
};
