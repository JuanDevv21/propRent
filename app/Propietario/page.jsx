"use client"
import styles from "./page.module.css"
import Navbar from "@/components/Navbar"
import {useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Shield from "../../assets/check-shield.svg"
import { colombia } from "@/data/Colombia"
import { useRouter } from "next/navigation"

const Propietario = () => {

    const router = useRouter()

    const [tab, setTab] = useState('iniciar')
    const [nombrePropietario, setNombrePropietario] = useState('')
    const [documentoPropietario, setDocumentoPropietario] = useState('')
    const [emailPropietario, setEmailPropietario] = useState('')
    const [passwordPropietario, setPasswordPropietario] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    const [departamento, setDepartamento] = useState('')
    const [ciudad, setCiudad] = useState('')
    const [fechaNacimiento, setFechaNacimiento] = useState('')
    const [telefono, setTelefono] = useState('')

    const iniciarSesion = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(
                '/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        emailPropietario: loginEmail,
                        passwordPropietario: loginPassword
                    })
                }
            )

            const data = await response.json()

            if(!response.ok) {
                alert(data.error)
                return
            }
            console.log(data)
            router.push('/Dashboard')
            router.refresh()
        } catch(error) {
            console.error(error)
        }
    }

    const registrarPropietario = async (e) => {
        e.preventDefault()

        try {
            if(passwordPropietario !== confirmPassword){
            alert('Las contrasenas no coninciden')
            return
        }

        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombrePropietario,
                documentoPropietario: Number(documentoPropietario),
                departamento,
                ciudad,
                fechaNacimiento: new Date(fechaNacimiento),
                telefono,
                emailPropietario,
                passwordPropietario
            })
        })

        const data = await response.json()

        if(!response.ok){
            alert(data.error || 'hubo un error en el registro')
        }
        alert('Registro exitoso. Ahora puedes iniciar sesión')
        setNombrePropietario('')
        setDocumentoPropietario('')
        setDepartamento('')
        setCiudad('')
        setFechaNacimiento('')
        setTelefono('')
        setEmailPropietario('')
        setPasswordPropietario('')
        setConfirmPassword('')
        setTab('iniciar')
        setLoginEmail(emailPropietario)
        console.log(data)


        } catch(error) {
            console.error(error)
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
                        <form className={styles.formulario} onSubmit={iniciarSesion}>
                            <span>Correo electrónico</span>
                            <input type="email" placeholder="tu@correo.com" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}></input>
                            <span>Contraseña</span>
                            <input type="password" placeholder="********" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}></input>
                            <button className={styles.sendform} type="submit">Iniciar Sesión</button>
                        </form>
                    ): (
                        <form className={styles.formulario} onSubmit={registrarPropietario}>
                            <span>Nombre completo</span>
                            <input type="text" placeholder="Carlos Sanchez" value={nombrePropietario} onChange={(e) => setNombrePropietario(e.target.value)}></input>
                            <span>Documento de identidad</span>
                            <input type="text" placeholder="CC, CE, PP" value={documentoPropietario} onChange={(e) => setDocumentoPropietario(e.target.value)}></input>
                            <span>Departamento</span>
                            <select value={departamento} onChange={(e) => {
                                setDepartamento(e.target.value) 
                                setCiudad('')}}>
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
                            <span>Numero celular +57</span>
                            <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)}></input>
                            <span>Correo electronico</span>
                            <input type="email" placeholder="tu@correo.com" value={emailPropietario} onChange={(e) => setEmailPropietario(e.target.value)}></input>
                            <span>Contraseña</span>
                            <input type="password" placeholder="********" value={passwordPropietario} onChange={(e) => setPasswordPropietario(e.target.value)}/>
                            <span>Confirma tu contraseña</span>
                            <input type="password" placeholder="********" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
                            <button className={styles.sendform} type="submit">Crear cuenta</button>
                        </form>
                    )
                }
                <Link href={'/Inquilino'} className={styles.registera}><span style={{backgroundColor: "white"}}>¿Eres inquilino? Inicia sesión aquí →</span></Link>
            </section>
        </>
    )
}

export default Propietario