import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Chart from "../assets/chart-sine.svg"
import Group from "../assets/group.svg"
import Shield from "../assets/check-shield.svg"

const Home = () => {
  return (
    <>
      <Navbar></Navbar>
      <section className={styles.hero}>
        <h2>Gestiona y cobra rentas con</h2>
        <h2 style={{color: "#1E5EFF"}}>claridad total.</h2>
        <span>La plataforma de gestión de alquileres pensada para propietarios independientes e inquilinos en Latinoamérica</span>
        <div>
          <Link className={styles.ref} href={'/Propietario'}><p style={{color:"white", backgroundColor: "#1E5EFF"}}>Entrar como propietario →</p></Link>
          <Link className={styles.ref}  href={'/Inquilino'}><p style={{border: "1px solid gray"}}>Entrar como inquilino →</p></Link>
        </div>
      </section>
      <section className={styles.piepagina}>
        <div className={styles.piepaginabloq}>
          <div>
            <Image className={styles.im} src={Chart} alt="Chart"></Image>
          </div>
          <p>Control financiero</p>
          <span>KPIs en tiempo real, ingresos, ocupación y saldos pendientes en un dashboard claro.</span>
        </div>
        <div className={styles.piepaginabloq}>
          <div>
            <Image className={styles.im} src={Group} alt="Grupo"></Image>
          </div>
          <p>Inquilinos felices</p>
          <span>Portal simple para pagar, descargar recibos y consultar su estado de cuenta.</span>
        </div>
        <div className={styles.piepaginabloq}>
          <div>
            <Image className={styles.im} src={Shield} alt="Escudo"></Image>
          </div>
          <p>Cobros transparentes</p>
          <span>Cálculo automatico de multas por mora con desglose visible de cada cargo</span>
        </div>
      </section>
    </>
  )
}

export default Home