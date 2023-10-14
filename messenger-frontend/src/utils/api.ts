import { Message } from "../models/message";
const BACKEND_URL = "http://localhost:8080";

export const getMessages = (): Promise<Message[]> => {
  let data: Promise<Message[]> = fetch(
    BACKEND_URL + "/messages",
    { method: 'GET', }
  ).then((res) => {
      return res.json();
  }).then((jsonData) => {
    let result: Message[] = [];

    jsonData.map((message: Record<string, string>) => {
      result.push({
        id: parseInt(message.id),
        title: message.title,
        message: message.message
      });
    });

    return result;
  }).catch((err) => {
      console.log(err)
      return [];
  });

  return data;
};

export const addMessage = (message: Message): Promise<void> => {
  let result: Promise<void> = fetch(
    BACKEND_URL + "/message",
    { method: 'POST',
      body: JSON.stringify(message)
    }
  ).then((res) => {
      console.log(res);
  }).catch((err)=> {
      console.log(err)
  });

  return result;
};
