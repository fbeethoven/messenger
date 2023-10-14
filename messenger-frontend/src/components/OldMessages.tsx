import  { FC } from "react"
import { Message } from "../models/message"
import { MessageCard } from "./MessageCard"



type OldMessagesProps = {
  messages: Message[]
}

export const OldMessages: FC<OldMessagesProps> = ({messages}) => {

    return (
      <>
        <div className='.message-container'>
          { messages? messages.map((message) => {
              return (
                <MessageCard message={message} />
              );
            }): 
            (<></>)
          }
        </div>
        <style>{`
          .message-container {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: #181818;
            color: #aaa;
          }

          .test-p {
            color: #aaa;
          }
        `}</style>
      </>
    );
};
