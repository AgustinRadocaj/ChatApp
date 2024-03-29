import React,{useState, useEffect} from "react";
import Card from "../card/Card";
import { firestore } from "../../../lib/firebase"
import { collection, onSnapshot, query, addDoc, serverTimestamp, where, getDocs } from "firebase/firestore";
import styles from "./Contactos.module.css"
import moment from 'moment'


const Contactos= ({userData, setSelectedChat}) => {

    const[activeTab, setActiveTab] = useState("Contactos");
    const[users, setUsers] = useState([]);
    const[userChat, setUserChat] = useState([]);
    

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    }

    useEffect(()=> {
        const task = query(collection(firestore, "usuarios"));

        const unsub = onSnapshot(task, (querySnapshot) => {
            const usuarios = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setUsers(usuarios);
        })
        return unsub
    }, [])

    const createChat = async(user) => {
        const existe = query(collection(firestore, "chats"),where("users", "==", [user.id, userData.id]))

        try {
            const existeChat = await getDocs(existe)
            if(existeChat.docs.length > 0){
                alert("chat ya existe")
                return;
            }

            const usersData = {
                [userData.id]: userData,
                [user.id]: user
            }

            const chatData = {
                users:[user.id, userData.id],
                usersData,
                timestamp: serverTimestamp(),
                lastMessage: null
            }

            const crearChat = await addDoc(collection(firestore, "chats"), chatData);
            setActiveTab("Chats")
        } catch (error) {
            console.log(error)
        }}

        useEffect(() => {
            if(!userData){
                return;
            }
            const chatQuery = query(collection(firestore, "chats"), where("users", "array-contains", userData.id))

            const unsubscribe = onSnapshot(chatQuery, (querySnapshot) => {
                const chatroom = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
                console.log(chatroom)
                setUserChat(chatroom);
            })
            return unsubscribe;
        },[userData])
        
        const openChat = async (chatroom) => {
            const data = {
              id: chatroom.id,
              myData: userData,
              otherData: chatroom.usersData[chatroom.users.find((id) => id !== userData.id)],
            }
            setSelectedChat(data);
        }

        const formatTime = (timestamp) => {
            const date = timestamp?.toDate();
            const momentDate = moment(date);
            return momentDate.fromNow();
          };

    return(
        <div className={styles.sidebar}>
            <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={()=> handleTabClick("Contactos")}><b>Contactos</b></button>
                <button className={styles.button} onClick={()=> handleTabClick("Chats")}><b>Chats</b></button>
            </div>
        
            <div>
                {activeTab === "Chats" && (<>
                    <h1 className={styles.tab}>Chats</h1>
                    <div className={styles.listacontactos}>
                    {userChat.map((chatroom) => (
                        <div key={chatroom.id} onClick={() => { openChat(chatroom) }}>
                            <Card
                            name={chatroom.usersData[chatroom.users.find((id) => id !== userData?.id)].name}
                            image={chatroom.usersData[chatroom.users.find((id) => id !== userData?.id)].profilePicture}
                            lastMessage={chatroom.lastMessage}
                            time={formatTime(chatroom.timestamp)}
                            type={"chat"} />
                        </div>
                    ))}                    
                    </div>
                </>  
                )}
            </div>
            <div>
                {activeTab === "Contactos" && (<>
                    <h1 className={styles.tab}>Contactos</h1>
                    <div className={styles.listacontactos}>
                    { users.map((user) => {
                        
                        if(user.id !== userData?.id){
                            return(
                                <div key={user.id} onClick={()=>createChat(user)}>
                                <Card
                                key={user.id}
                                name={user.name}
                                image={user.profilePicture}
                                type={"contacto"} />
                                </div>
                            )}
                             
                    })}
                </div>
                </>
            )}
        </div>
    </div>

)
}

export default Contactos;
                        
                    
                    