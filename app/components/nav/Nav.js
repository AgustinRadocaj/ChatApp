import styles from "./Nav.module.css"
import { getAuth, signOut } from 'firebase/auth';
import { app } from '@/lib/firebase';
import { useRouter } from "next/navigation";

const Nav = () => {

    const auth = getAuth(app)
    const router = useRouter();

    const logoutClick = () => {
        signOut(auth)
        .then(() => {
         router.push('/ingreso');
        })
        .catch((error) => {
          console.error('Error logging out:', error);
        });
       }

    return(
        <div className={styles.container}>
            <h1 className={styles.titulo}>ChatApp</h1>
            <button onClick={logoutClick}className={styles.button}><b>LOGOUT</b></button>
        </div>
    )
}

export default Nav;