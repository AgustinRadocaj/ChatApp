'use client'
import React, {useState} from "react";
import { useRouter } from "next/navigation"; 
import styles from "./page.module.css"
import Link from "next/link";
import { auth, firestore } from "../../lib/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc,setDoc } from "firebase/firestore";
const DEFAULT_PICTURE = "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg"

const register = () => {
    
    
    const[name, setName]=useState("");
    const[email, setEmail]=useState("");
    const[password, setPassword]=useState("");
    const[password2, setPassword2]=useState("");
    const[picture, setPicture]=useState(null);
    const[errors, setErrors]=useState({});
    const[loading, setLoading]=useState(false);
    const router = useRouter();

    const pictureHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPicture(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };

    const validateForm = () => {

        const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        const newErrors = {}

        if(!name.trim()) newErrors.name = "Se requiere un nombre";
        if(!email.trim() || !emailValidation.test(email)) newErrors.email = "Email invalido";
        if(password.length < 8) newErrors.password = "La contraseña debe ser mayor a 8 caracteres";
        if(password !== password2) newErrors.password2 = "Las contraseñas no coinciden";
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true)
        const profilePicture = picture || DEFAULT_PICTURE;

        try {
            if(!validateForm()){
                setLoading(false);
                return;
            }
            
            const credenciales = await createUserWithEmailAndPassword(auth, email, password)
            const user = credenciales.user;

            const docRef = doc(firestore, "usuarios", user.uid)
            await setDoc(docRef,{
                name,
                email,
                profilePicture
            })

            router.push("/")
            setErrors({})

        } catch (error) {
            console.log(error)
        }

        setLoading(false);
    }
        return (
        <div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1>Chat App Register</h1>
                <div>
                    <span>Nombre</span>
                    <input type="text" 
                    placeholder="Enter name" 
                    className={styles.input} 
                    value={name} 
                    onChange={(e)=>setName(e.target.value)}/>
                    {errors.name && <span className={styles.error}>{errors.name}</span>}
                </div>
                <div>
                    <span>Email</span>
                    <input type="text" 
                    placeholder="Enter email" 
                    className={styles.input} 
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)}/>
                    {errors.email && <span className={styles.error}>{errors.email}</span>}
                </div>
                <div>
                    <span>Contraseña</span>
                    <input type="password" 
                    placeholder="Enter password" 
                    className={styles.input}  
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)}/>
                    {errors.password && <span className={styles.error}>{errors.password}</span>}
                </div>
                <div>
                    <span>Confirmar contraseña</span>
                    <input type="password" 
                    placeholder="Confirm Password" 
                    className={styles.input}  
                    value={password2} 
                    onChange={(e)=>setPassword2(e.target.value)}/>
                    {errors.password2 && <span className={styles.error}>{errors.password2}</span>}
                </div>
                <div>
                    <span>Foto Perfil (opcional)</span>
                    <input
                    type="file"
                    accept="image/*"
                    onChange={pictureHandler}
                    className={styles.input}
                    />
                </div>
                <div>
                    <button type="submit">
                        {
                            loading ? <span className={styles.spinner}></span> :
                            "Register"
                        }
                    </button>
                </div>
                <p>Ya tenes una cuenta?
                    <Link href="/login">Login</Link>
                </p>
            </form>
        </div>
    )
}

export default register;