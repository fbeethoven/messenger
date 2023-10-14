import React from 'react';
import  { useState, useMemo } from "react"
import { NewMessage } from './components/NewMessage';
import { OldMessages } from './components/OldMessages';
import { Message } from "./models/message"
import { getMessages, addMessage } from "./utils/api"
import './App.css';


function App() {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessageHandler = (message: Message) => {
    addMessage(message).then(()=> {
      getMessages().then((data) => {
        setMessages(data);
      });
    });

  };

  useMemo( () => {
    getMessages().then((data) => {
      setMessages(data);
    });
  }, [getMessages]);

  return (
    <div className="App">
      <div className='app-header'>
        <h1> Messanger </h1>
      </div>
      <div className='app-body'>
        <NewMessage
          addMessageHandler={addMessageHandler}
        />
        <OldMessages
          messages={messages}
        />
      </div>
    </div>
  );
}

export default App;
