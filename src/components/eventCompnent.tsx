import React, { useEffect, useState } from 'react';

export const EventComponent = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource('/api/events');

    eventSource.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      console.log('EventSource message:', newMessage);
    };

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="absolute right-0 z-10 ">
     <div className="p-8 rounded-16 bg-[#33383E] flex">
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.time} - {msg.msg}</li>
        ))}
      </ul>
    </div>
      </div>
  );
};

