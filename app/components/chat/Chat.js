import React, {useState, useEffect, useRef} from "react";
import { firestore } from "@/lib/firebase";
import { addDoc, collection,doc, serverTimestamp,onSnapshot,query,where,orderBy,updateDoc } from 'firebase/firestore';
import Mensajes from "../mensajes/Mensajes";
import Input from "../input/Input";
import styles from "./Chat.module.css"


const Chat = ({selectedChat}) => {

    const usuario = selectedChat?.myData
    const otro = selectedChat?.otherData
    const chatId = selectedChat?.id

    const [message, setMessage] = useState([]);
    const [messages, setMessages] = useState([]);
    const messagesContainerRef = useRef(null);

    const sendMessage = async () => {
        const messagesCollection = collection(firestore, 'messages');
      if (message == '') {
        return;
      }
    
      try {
        const newMessage = {
          chatId:chatId,
          sender: usuario.id,
          content: message,
          time: serverTimestamp(),
          
        };
    
        await addDoc(messagesCollection, newMessage);
        setMessage('');
        

        const chatroomRef = doc(firestore, 'chats', chatId);
        await updateDoc(chatroomRef, { lastMessage: message });
            
      } catch (error) {
        console.error('Error sending message:', error.message);
      }
    
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    }

    useEffect(() => {
        if(!chatId) return;
        const unsubscribe = onSnapshot(
          query(collection(firestore, 'messages'),where("chatId","==",chatId),orderBy('time', 'asc')),
          (snapshot) => {
            const messages = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            
            setMessages(messages);
          }
        );
      
        return unsubscribe;
      }, [chatId]);

    return(
        <>
        <div className={styles.mensajes}>
            <div ref={messagesContainerRef}>
            {messages?.map((message) => (
                <Mensajes key={message.id} message={message} usuario={usuario} otro={otro}/>
            ))}
            </div>
            <div className={styles.inputContainer}>
            <Input className={styles.input} sendMessage={sendMessage} message={message} setMessage={setMessage}/>
            </div>
            </div>
        </>
    )
}

export default Chat;