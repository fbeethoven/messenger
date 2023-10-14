import  { FC } from "react"
import { useState, FormEvent, ChangeEvent} from "react"
import { Message } from "../models/message"


type NewMessageProps = {
  addMessageHandler: (message: Message) => void
}

export const NewMessage: FC<NewMessageProps> = ({
  addMessageHandler
}) => {
  const [message, setMessage] = useState<Message>(
    {id: 0, title: "", message: ""});

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(message); 
    addMessageHandler(message);
    setMessage({id: 0, title: "", message: ""});
  }

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage({...message, title: e.target.value});
  }
  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage({...message, message: e.target.value});
  }

  return (
    <>
      <form className='message-form' onSubmit={handleSubmit}> 
          <input className='form-box' type="text" onChange={handleTitleChange} value={message?.title} placeholder="Title" />

          <br/>

          <textarea className='form-box' value={message?.message} onChange={handleMessageChange} placeholder="Message" >
          </textarea>

          <br/>
          <input className='form-box' type="submit" value="Submit" />
      </form>
      <style>{`
      .message-form {
        background-color: #181818;
        height: 100%;
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #aaa;
      }

      .form-box {
        width: 100%;
        background-color: #181818;
        color: #aaa;
      }
      `}</style>
    </>
  );
};
