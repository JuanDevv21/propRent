import styles from "./Navbar.module.css"
import Image from "next/image"
import Edificio from "../assets/business.svg"

const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <section>
                <div className={styles.imagen}>
                    <Image className={styles.im} src={Edificio} alt="Edificio"></Image>
                </div>
                <div className={styles.navbarhead}>
                    <p>PropRent</p>
                    <span>LATAM</span>
                </div>
            </section>
        </nav>
    )
}

export default Navbar