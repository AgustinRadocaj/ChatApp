import React from 'react'
import styles from "./Card.module.css"
const Card = ({name, image, lastMessage, time, type}) => {
  return (
    <div>
      {type === "chat" && (
        <div className={styles.card}>
          <img src={image} className={styles.cardImg} />
          <div className={styles.details}>
            <div>
              <h2>{name}</h2>
              <p>{lastMessage}</p>
            </div>
            <p>{time}</p>
          </div>
        </div>
      )}
      {type === "contacto" && (
        <div className={styles.card}>
          <img src={image} className={styles.cardImg} />
          <div className={styles.details}>
            <h2>{name}</h2>
          </div>
        </div>
      )}
    </div>
  )
}

export default Card