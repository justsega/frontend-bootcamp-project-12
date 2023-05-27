import React, { useEffect } from 'react';

const MessagesBox = ({ messages }) => {
  useEffect(() => {
    const messagesBox = document.getElementById('messages-box');
    messagesBox.scrollTop = messagesBox.scrollHeight;
  });
  return (
    <div id="messages-box" className="chat-messages scroll-down px-5 ">
      {messages.map((message) => (
        <div key={message.id} className="text-break mb-2">
          <b>{message.username}</b>
          :
          {' '}
          {message.body}
        </div>
      ))}
    </div>
  );
};

export default MessagesBox;
