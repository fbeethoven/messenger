import  { FC } from "react"
import { Message } from "../models/message"


type MessageProps = {
  message: Message
}

export const MessageCard: FC<MessageProps> = ({ message }) => {
  return (
    <>
      <p style={ {fontSize: '30px'} }> { message.title } </p>
      <p style={ {fontSize: '20px', color:'#aaa'}}> { message.message } </p>
    </>
  );
};
