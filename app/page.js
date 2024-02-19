"use client";
import React,{useEffect, useState} from "react";
import {app, firestore} from "../lib/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";
import Nav from "./components/nav/Nav";
import Contactos from "./components/contactos/Contactos";
import Chat from "./components/chat/Chat";

export default function Home() {

  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null)
  const router = useRouter();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(user) => {
      if (user) {
        const userRef = doc(firestore, "usuarios", user.uid);
        const userSnap = await getDoc(userRef);
        const userData = ({id: userSnap.id, ...userSnap.data()})
        setUser(userData);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [auth, router]);


  return (
   <div>
    <section className={styles.topnav}><Nav/></section>
    <section className={styles.contactos}><Contactos userData={user} setSelectedChat={setSelectedChat}/></section>
    <section className={styles.chat}><Chat user={user} selectedChat={selectedChat}/></section>
   </div>
  );
}
