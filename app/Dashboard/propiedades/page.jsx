import Link from "next/link"
import styles from "./page.module.css"


const Propiedades = () => {
    return (
        <>
            <section className={styles.section1}>
                <div className={styles.section1left}>
                    <p>Propiedades</p>
                    <span>6 propiedades en tu cartera</span>
                </div>
                <Link style={{backgroundColor: '#f4f6f8', alignItems: 'center', justifyContent: 'center', display: 'flex'}} href={'/Dashboard/propiedades/new'}><button>+ Agregar propiedad</button></Link>
            </section>
        </>
    )
}

export default Propiedades