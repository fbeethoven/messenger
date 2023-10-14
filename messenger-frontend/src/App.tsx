import React from 'react';
import  { useState } from "react"
import { NewMessage } from './components/NewMessage';
import { OldMessages } from './components/OldMessages';
import { Message } from "./models/message"
import './App.css';


function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  return (
    <div className="App">
      <div className='app-header'>
        <h1> Messanger </h1>
      </div>
      <div className='app-body'>
        <NewMessage
          addMessageHandler={(message: Message) => {setMessages([...messages, message])}}
        />
        <OldMessages
          messages={messages}
        />
      </div>
    </div>
  );
}

export default App;
