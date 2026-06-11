"use client"
import styles from "./page.module.css"
import Navbar from "@/components/Navbar"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Shield from "../../assets/check-shield.svg"


const Propietario = () => {

    const [tab, setTab] = useState('iniciar')

    return (
        <>
            <div className={styles.navi}>
                <Navbar></Navbar>
                <Link className={styles.ref} href={'/'}><p style={{marginTop:'20px', fontFamily:'Inter', color:'gray', cursor:'pointer', width: '100px'}}>← Volver</p></Link>
            </div>
            <section className={styles.login}>
                <div className={styles.image}>
                    <Image src={Shield} alt="Shield" width={32} height={32}></Image>
                </div>
                <p>Portal del propietario</p>
                <span className={styles.logintitle}>Inicia sesión para continuar a tu cuenta</span>
                <div className={styles.tab}>
                    <button
                    type="button" onClick={() => setTab('iniciar')} className={tab === 'iniciar' ? styles.activeTab : ""}>Iniciar sesión</button>
                    <button
                    type="button" onClick={() => setTab('crear')} className={tab === 'crear' ? styles.activeTab : ""}>Crear cuenta</button>
                </div>
                {
                    tab === 'iniciar' ? (
                        <form className={styles.formulario}>
                            <span>Correo electrónico</span>
                            <input type="email" placeholder="tu@correo.com"></input>
                            <span>Contraseña</span>
                            <input type="password" placeholder="********"></input>
                            <button className={styles.sendform}>Iniciar Sesión</button>
                        </form>
                    ): (
                        <form className={styles.formulario}>
                            <span>Nombre completo</span>
                            <input type="text" placeholder="Carlos Sanchez"></input>
                            <span>Documento de identidad</span>
                            <input type="text" placeholder="CC, CE, PP"></input>
                            <span>Correo electronico</span>
                            <input type="email" placeholder="tu@correo.com"></input>
                            <span>Contraseña</span>
                            <input type="password" placeholder="********"/>
                            <span>Confirma tu contraseña</span>
                            <input type="password" placeholder="********"></input>
                            <button className={styles.sendform}>Crear cuenta</button>
                        </form>
                    )
                }
                <Link href={'/Inquilino'} className={styles.registera}><span style={{backgroundColor: "white"}}>¿Eres inquilino? Inicia sesión aquí →</span></Link>
            </section>
        </>
    )
}

export default Propietario