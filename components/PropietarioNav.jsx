"use client"

import styles from "./PropietarioNav.module.css"
import Edificio from '../assets/business.svg'
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

    const menuItems = [
        { href: '/Dashboard',               label: 'Dashboard'},
        { href: '/Dashboard/propiedades',   label: 'Propiedades'},
        { href: '/Dashboard/inquilinos',    label: 'Inquilinos'},
        { href: '/Dashboard/pagos',         label: 'Pagos'},
        { href: '/Dashboard/gastos',        label: 'Gastos',},
        { href: '/Dashboard/reportes',      label: 'Reportes',},
        { href: '/Dashboard/configuracion', label: 'Configuración'},
];

const Propnavbar = ({propietario}) => {

    const pathname = usePathname()
    const currentItem = menuItems.find(item => item.href === pathname)
    const pageTitle = currentItem ? currentItem.label : 'Panel'

    const nombre = propietario?.nombrePropietario || 'Usuario'
    const iniciales = nombre.split('').map(n => n[0]).join('').substring(0, 2).toUpperCase()

    return (
        <>
            <nav className={styles.nav}>
                <div className={styles.navleft}>
                    <Image src={Edificio} alt="Edificio" width={40} height={40}></Image>
                    <div>
                        <p>PropRent</p>
                        <p style={{ color: 'rgb(151, 151, 151)', fontSize: '12px', height: '20px', letterSpacing: '1px'}}>LATAM</p>
                    </div>
                </div>
                <div className={styles.navright}>
                    <div>
                        <p>{pageTitle}</p>
                    </div>
                    <div className={styles.navrr}>
                        <button style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer' }}>
                            <span style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', fontSize: '30px'}}>🔔</span>
                        </button>
                        <div>
                            <span>
                                {nombre}
                            </span>
                            <span style={{color: 'rgb(151, 151, 151)'}}>
                                Propietario
                            </span>
                        </div>
                        <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: '40px', height: '40px', backgroundColor: '#2563eb', color: 'white',
                        fontWeight: '600', borderRadius: '50%', fontSize: '14px', letterSpacing: '0.05em'
                    }}>
                            {iniciales}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Propnavbar