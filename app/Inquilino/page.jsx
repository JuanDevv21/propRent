"use client"
import styles from "./page.module.css"
import Navbar from "@/components/Navbar"
import { use, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Home from "../../assets/home-alt.svg"
import { colombia } from "@/data/Colombia"


const Inquilino = () => {

    const [tab, setTab] = useState('iniciar')
    const [nombreInquilino, setNombreInquilino] = useState('')
    const [documentoInquilino, setDocumentoInquilino] = useState('')
    const [emailInquilino, setEmailInquilino] = useState('')
    const [passwordInquilino, setPasswordInquilino] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    const [departamento, setDepartamento] = useState('')
    const [ciudad, setCiudad] = useState('')
    const [fechaNacimiento, setFechaNacimiento] = useState('')


    const iniciarSesionInquilino = async(e) => {
        e.preventDefault()
        try {
            const response = await fetch('/api/auth/loginInquilino', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    emailInquilino, loginEmail,
                    passwordInquilino: loginPassword
                })
            })

            const data = await response.json()
            if(!response.ok) {
                alert(data.error)
                return
            }
            console.log(data)
            alert('Login exitoso')
        } catch(error) {
            console.error(error)
        }
    } 

    const registrarInquilino = async(e) => {
        e.preventDefault()

        if(passwordInquilino !== confirmPassword) {
            alert('las contraseñas no coinciden')
            return
        }
        try {
        const response = await fetch('/api/auth/registerInquilino', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombreInquilino,
                documentoInquilino: Number(documentoInquilino),
                departamento,
                ciudad,
                fechaNacimiento: new Date(fechaNacimiento),
                emailInquilino,
                passwordInquilino
            })
        })

        const data = await response.json()

        if (!response.ok) {
            alert(data.error || 'Hubo un error en el registro')
            return
        }

        alert('Registro exitoso. Ahora puedes iniciar sesión.')
        setTab('iniciar')
        setLoginEmail(emailInquilino)

    } catch (error) {
        console.error("Error en el registro:", error)
        alert('No se pudo conectar con el servidor')
    }
    }

    return (
        <>
            <div className={styles.navi}>
                <Navbar></Navbar>
                <Link className={styles.ref} href={'/'}><p style={{marginTop:'20px', fontFamily:'Inter', color:'gray', cursor:'pointer', width: '100px'}}>← Volver</p></Link>
            </div>
            <section className={styles.login}>
                <div className={styles.image}>
                    <Image src={Home} alt="Shield" width={32} height={32}></Image>
                </div>
                <p>Portal del Inquilino</p>
                <span className={styles.logintitle}>Inicia sesión para continuar a tu cuenta</span>
                <div className={styles.tab}>
                    <button
                    type="button" onClick={() => setTab('iniciar')} className={tab === 'iniciar' ? styles.activeTab : ""}>Iniciar sesión</button>
                    <button
                    type="button" onClick={() => setTab('crear')} className={tab === 'crear' ? styles.activeTab : ""}>Crear cuenta</button>
                </div>
                {
                    tab === 'iniciar' ? (
                        <form className={styles.formulario} onSubmit={iniciarSesionInquilino}>
                            <span>Correo electrónico</span>
                            <input type="email" placeholder="tu@correo.com" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}></input>
                            <span>Contraseña</span>
                            <input type="password" placeholder="********" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}></input>
                            <button className={styles.sendform} type="submit">Iniciar Sesión</button>
                        </form>
                    ): (
                        <form className={styles.formulario} onSubmit={registrarInquilino}>
                            <span>Nombre completo</span>
                            <input type="text" placeholder="Carlos Sanchez" value={nombreInquilino} onChange={(e) => setNombreInquilino(e.target.value)}></input>
                            <span>Documento de identidad</span>
                            <input type="text" placeholder="CC, CE, PP" value={documentoInquilino} onChange={(e) => setDocumentoInquilino(e.target.value)}></input>
                            <span>Departamento</span>
                            <select value={departamento} onChange={(e) => {
                                setDepartamento(e.target.value) 
                                setCiudad('')
                            }}>
                                <option value=''>Selecciona un Departamento</option>
                                {Object.keys(colombia).map((dep) => (
                                    <option key={dep} value={dep}>{dep}</option>
                                ))}
                            </select>
                            <span>Ciudad de residencia</span>
                            <select value={ciudad} onChange={(e) => setCiudad(e.target.value)} disabled={!departamento}>
                                <option value=''>Selecciona una Ciudad</option>
                                {departamento && colombia[departamento].map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                            <span>Fecha de nacimiento</span>
                            <input type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}></input>
                            <span>Correo electronico</span>
                            <input type="email" placeholder="tu@correo.com" value={emailInquilino} onChange={(e) => setEmailInquilino(e.target.value)}></input>
                            <span>Contraseña</span>
                            <input type="password" placeholder="********" value={passwordInquilino} onChange={(e) => setPasswordInquilino(e.target.value)}/>
                            <span>Confirma tu contraseña</span>
                            <input type="password" placeholder="********" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
                            <button className={styles.sendform} type="submit">Crear cuenta</button>
                        </form>
                    )
                }
                
                <Link href={'/Propietario'} className={styles.registera}><span style={{backgroundColor: 'white'}}>¿Eres propietario? Inicia sesión aquí →</span></Link>
            </section>
        </>
    )
}

export default Inquilino