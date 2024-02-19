'use client'
import React, {useState} from "react";
import { useRouter } from "next/navigation"; 
import styles from "./page.module.css"
import Link from "next/link";
import { auth } from "../../lib/firebase"
import { signInWithEmailAndPassword } from "firebase/auth";


const login = () => {
    
    
    const[email, setEmail]=useState("");
    const[password, setPassword]=useState("");
    const[errors, setErrors]=useState({});
    const[loading, setLoading]=useState(false);
    const router = useRouter();

    const validateForm = () => {

        const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        const newErrors = {}

        if(!email.trim() || !emailValidation.test(email)) newErrors.email = "Email invalido";
        if(password.length < 8) newErrors.password = "La contraseña debe ser mayor a 8 caracteres";

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true)

        try {
            if(!validateForm()){
                setLoading(false);
                return;
            }
            
            const credenciales = await signInWithEmailAndPassword(auth, email, password)
            const user = credenciales.user;

            if(user) {
                router.push("/")
            }
            setErrors({})

        } catch (error) {
            console.log(error)
        }

        setLoading(false);
    }

        return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1 className={styles.titulo}>CHAT APP LOGIN</h1>
                <div className={styles.data}>
                    <span>Email</span>
                    <input type="text" 
                    placeholder="Enter email" 
                    className={styles.input} 
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)}/>
                    {errors.email && <span className={styles.error}>{errors.email}</span>}
                </div>
                <div className={styles.data}>
                    <span>Password</span>
                    <input type="password" 
                    placeholder="Enter password" 
                    className={styles.input}  
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)}/>
                    {errors.password && <span className={styles.error}>{errors.password}</span>}
                </div>
                <div className={styles.buttonContainer}>
                    <button  type="submit">
                        {
                            loading ? <span className={styles.spinner}></span> :
                            "LOGIN"
                        }
                    </button>
                </div>
                <p>No tenes una cuenta?
                    <Link className={styles.link} href="/register">Registro</Link>
                </p>
            </form>
        </div>
    )
}

export default login;