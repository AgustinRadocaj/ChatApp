import React,{useState, useEffect} from "react";
import Card from "../card/Card";
import { Firestore, app, firestore } from "../../../lib/firebase"
import { collection, onSnapshot, query, addDoc, serverTimestamp, where, getDocs } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import styles from "./Contactos.module.css"


const Contactos= ({userData}) => {

    const[activeTab, setActiveTab] = useState("");
    const[users, setUsers] = useState([]);
    const[userChat, setUserChat] = useState([]);
    const[loading, setLoading] = useState(false);
    const[loading2, setLoading2] = useState(false);
    const auth = getAuth(app);
    const router = useRouter();

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    }

    useEffect(()=> {
        setLoading(true);
        const task = query(collection(firestore, "usuarios"));

        const unsub = onSnapshot(task, (querySnapshot) => {
            const usuarios = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setUsers(usuarios);
            setLoading(false);
        })
        return unsub
    }, [])

    console.log(users)

    return(
        <div className={styles.sidebar}>
            <div>
                <button onClick={()=> handleTabClick("Contactos")}>Contactos</button>
                <button onClick={()=> handleTabClick("Chats")}>Chats</button>
            </div>
        
            <div>
                {activeTab === "Chats" && (<>
                    <h1>Chats</h1>
                    <div className={styles.listacontactos}>
                    <Card
                    name="Agustin"
                    image="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg"
                    lastMessage="Hola"
                    time="una hora"
                    type={"chat"} />
                    </div>
                    </>  
                )}
            </div>
            <div>
                {activeTab === "Contactos" && (<>
                    <h1>Contactos</h1>
                    <Card
                    name="Agustin Radocaj"
                    image="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg"
                    type={"contacto"} />
                    </>
                )}
            </div>
        </div>

    )
}

export default Contactos;