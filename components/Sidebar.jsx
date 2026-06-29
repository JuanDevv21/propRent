"use client"
import styles from './Sidebar.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Grafica from '../assets/chartright.svg'
import Config from '../assets/cog.svg'
import Card from '../assets/credit-card-alt.svg'
import DashboardIcon from '../assets/dashboard.svg'
import Dollar from '../assets/dollar-circle.svg'
import Garage from '../assets/garage.svg'
import Group from '../assets/group.svg'

const links = [
    { href: '/Dashboard',               label: 'Dashboard',     icon: DashboardIcon },
    { href: '/Dashboard/propiedades',   label: 'Propiedades',   icon: Garage        },
    { href: '/Dashboard/inquilinos',    label: 'Inquilinos',    icon: Group         },
    { href: '/Dashboard/pagos',         label: 'Pagos',         icon: Card          },
    { href: '/Dashboard/gastos',        label: 'Gastos',        icon: Dollar        },
    { href: '/Dashboard/reportes',      label: 'Reportes',      icon: Grafica       },
    { href: '/Dashboard/configuracion', label: 'Configuración', icon: Config        },
]

const Sidebar = () => {
    const pathname = usePathname()

    return (
        <section className={styles.cont}>
            {links.map((link) => (
                <Link key={link.href} href={link.href} className={`${styles.item} ${pathname === link.href ? styles.active : ''}`}>
                    <Image style={{backgroundColor: 'transparent'}} src={link.icon} alt={link.label} />
                    <span>{link.label}</span>
                </Link>
            ))}
        </section>
    )
}

export default Sidebar