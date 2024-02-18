import styles from "./Nav.module.css"

const Nav = () => {
    return(
        <div className={styles.container}>
            <h1 className={styles.titulo}>ChatApp</h1>
            <button className={styles.button}>Logout</button>
        </div>
    )
}

export default Nav;