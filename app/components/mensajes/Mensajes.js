import React from 'react'
import moment from 'moment'
import styles from "./Mensajes.module.css"

const Mensajes = ({message, usuario, otro}) => {

    const mensajeUsuario = message.sender == usuario.id;

    const formatTime = (timestamp) => {
        const date = timestamp?.toDate();
        const momentDate = moment(date);
        return momentDate.fromNow();
      };
    
      

  return (
    <div className={styles.container}>
    <div className={` ${mensajeUsuario ? styles.messageFromMe : styles.messageFromOthers}`}>
      <div className={styles.messageContent}>
        <p>{message.content}</p>
        <div className={styles.messageTime}>{formatTime(message.time)}</div>
      </div>
    </div>
    </div>
  )
}

export default Mensajes

    