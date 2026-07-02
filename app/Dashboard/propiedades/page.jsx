import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { prisma } from "@/db";
import { getCurrentUser } from "@/util/getUser"; // ajusta la ruta si tu archivo está en otro lugar

const ETIQUETAS_ESTADO = {
  DISPONIBLE: { texto: "Disponible", color: "#10b981" },
  OCUPADA: { texto: "Ocupada", color: "#2563eb" },
  MANTENIMIENTO: { texto: "Mantenimiento", color: "#f59e0b" },
};

const formatoMoneda = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

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

      {propiedades.length === 0 ? (
        <div className={styles.estadoVacio}>
          <p>Todavía no has registrado ninguna propiedad.</p>
          <Link href={"/Dashboard/propiedades/new"}>Registra tu primera propiedad</Link>
        </div>
      ) : (
        <section className={styles.propGrid} style={{backgroundColor: '#f4f6f8'}}>
          {propiedades.map((propiedad) => {
            const estado = ETIQUETAS_ESTADO[propiedad.estado] || ETIQUETAS_ESTADO.DISPONIBLE;
            return (
              <Link
                key={propiedad.id}
                href={`/Dashboard/propiedades/${propiedad.id}`}
                className={styles.propCard}
              >
                <div className={styles.propImagenWrapper}>
                  {propiedad.imagen ? (
                    <Image
                      src={propiedad.imagen}
                      alt={propiedad.nombre}
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <div className={styles.propImagenPlaceholder}>🏠</div>
                  )}
                  <span
                    className={styles.propBadge}
                    style={{ backgroundColor: estado.color }}
                  >
                    {estado.texto}
                  </span>
                </div>

                <div className={styles.propInfo}>
                  <h3 className={styles.propNombre}>{propiedad.nombre}</h3>
                  <p className={styles.propDireccion}>
                    {propiedad.direccion}, {propiedad.ciudad}
                  </p>
                  <div className={styles.propFooter}>
                    <span className={styles.propTipo}>{propiedad.tipoPropiedad}</span>
                    <span className={styles.propValor}>
                      {formatoMoneda.format(propiedad.valorArriendo)}/mes
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </section>
      )}
    </>
  );
};

export default Propiedades;