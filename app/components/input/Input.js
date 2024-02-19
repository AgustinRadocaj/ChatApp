import React from 'react';
import styles from "./Input.module.css"


const Input = ({ sendMessage, message, setMessage }) => {

  return (
    <div className={styles.container}>
        <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        type='text'
        className={styles.input}
      />
        <button className={styles.button} onClick={()=>{sendMessage()}} onKeyDown={"Enter"}>ENVIAR</button>
    </div>
  )
}

export default Input