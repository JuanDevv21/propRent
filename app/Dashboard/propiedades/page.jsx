import Link from "next/link";
import styles from "./page.module.css";
import { prisma } from "@/db";
import { getCurrentUser } from "@/util/getUser";
import ListaPropiedades from "./ListaPropiedades";

const Propiedades = async () => {
  const propietario = await getCurrentUser();

  if (!propietario) {
    return (
      <section className={styles.section1}>
        <div className={styles.section1left}>
          <p>Propiedades</p>
          <span>Debes iniciar sesión para ver tus propiedades.</span>
        </div>
      </section>
    );
  }

  const propiedades = await prisma.propiedad.findMany({
    where: { propietarioId: propietario.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <section className={styles.section1}>
        <div className={styles.section1left}>
          <p>Propiedades</p>
          <span>
            {propiedades.length} {propiedades.length === 1 ? "propiedad" : "propiedades"} en tu cartera
          </span>
        </div>
        <Link
          style={{ backgroundColor: "#f4f6f8", alignItems: "center", justifyContent: "center", display: "flex" }}
          href={"/Dashboard/propiedades/new"}
        >
          <button>+ Agregar propiedad</button>
        </Link>
      </section>

      <ListaPropiedades propiedades={propiedades} />
    </>
  );
};

export default Propiedades;