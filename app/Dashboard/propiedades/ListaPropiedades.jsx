"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./ListaPropiedades.module.css";

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

const formatoFecha = new Intl.DateTimeFormat("es-CO", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export default function ListaPropiedades({ propiedades }) {
  const [propiedadSeleccionada, setPropiedadSeleccionada] = useState(null);

  if (propiedades.length === 0) {
    return (
      <div className={styles.estadoVacio}>
        <p>Todavía no has registrado ninguna propiedad.</p>
        <a href="/Dashboard/propiedades/new">Registra tu primera propiedad</a>
      </div>
    );
  }

  return (
    <>
      <section className={styles.propGrid} style={{ backgroundColor: "#f4f6f8" }}>
        {propiedades.map((propiedad) => {
          const estado = ETIQUETAS_ESTADO[propiedad.estado] || ETIQUETAS_ESTADO.DISPONIBLE;
          return (
            <div
              key={propiedad.id}
              className={styles.propCard}
              onClick={() => setPropiedadSeleccionada(propiedad)}
              role="button"
              tabIndex={0}
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
                <span className={styles.propBadge} style={{ backgroundColor: estado.color }}>
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
            </div>
          );
        })}
      </section>

      {propiedadSeleccionada && (
        <div className={styles.modalOverlay} onClick={() => setPropiedadSeleccionada(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.modalCerrar}
              onClick={() => setPropiedadSeleccionada(null)}
              aria-label="Cerrar"
            >
              ✕
            </button>

            <div className={styles.modalImagenWrapper}>
              {propiedadSeleccionada.imagen ? (
                <Image
                  src={propiedadSeleccionada.imagen}
                  alt={propiedadSeleccionada.nombre}
                  fill
                  sizes="600px"
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <div className={styles.propImagenPlaceholder} style={{ fontSize: "60px" }}>🏠</div>
              )}
            </div>

            <div className={styles.modalBody}>
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitulo}>{propiedadSeleccionada.nombre}</h2>
                <span
                  className={styles.propBadge}
                  style={{
                    backgroundColor:
                      (ETIQUETAS_ESTADO[propiedadSeleccionada.estado] || ETIQUETAS_ESTADO.DISPONIBLE).color,
                    position: "static",
                  }}
                >
                  {(ETIQUETAS_ESTADO[propiedadSeleccionada.estado] || ETIQUETAS_ESTADO.DISPONIBLE).texto}
                </span>
              </div>

              <p className={styles.modalDireccion}>
                {propiedadSeleccionada.direccion}, {propiedadSeleccionada.ciudad}, {propiedadSeleccionada.pais} — CP {propiedadSeleccionada.codigoPostal}
              </p>

              <div className={styles.modalGrid}>
                <div className={styles.modalDato}>
                  <span className={styles.modalDatoLabel}>Tipo</span>
                  <span className={styles.modalDatoValor}>{propiedadSeleccionada.tipoPropiedad}</span>
                </div>
                <div className={styles.modalDato}>
                  <span className={styles.modalDatoLabel}>Habitaciones</span>
                  <span className={styles.modalDatoValor}>{propiedadSeleccionada.habitaciones}</span>
                </div>
                <div className={styles.modalDato}>
                  <span className={styles.modalDatoLabel}>Baños</span>
                  <span className={styles.modalDatoValor}>{propiedadSeleccionada.baños}</span>
                </div>
                <div className={styles.modalDato}>
                  <span className={styles.modalDatoLabel}>Área</span>
                  <span className={styles.modalDatoValor}>{propiedadSeleccionada.area} m²</span>
                </div>
                <div className={styles.modalDato}>
                  <span className={styles.modalDatoLabel}>Valor del arriendo</span>
                  <span className={styles.modalDatoValor}>
                    {formatoMoneda.format(propiedadSeleccionada.valorArriendo)}
                  </span>
                </div>
                <div className={styles.modalDato}>
                  <span className={styles.modalDatoLabel}>Depósito de garantía</span>
                  <span className={styles.modalDatoValor}>
                    {formatoMoneda.format(propiedadSeleccionada.depositoGarantia)}
                  </span>
                </div>
                <div className={styles.modalDato}>
                  <span className={styles.modalDatoLabel}>Día de vencimiento</span>
                  <span className={styles.modalDatoValor}>Día {propiedadSeleccionada.diaVencimiento}</span>
                </div>
                <div className={styles.modalDato}>
                  <span className={styles.modalDatoLabel}>Registrada el</span>
                  <span className={styles.modalDatoValor}>
                    {formatoFecha.format(new Date(propiedadSeleccionada.createdAt))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}