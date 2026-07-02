"use client";

import { useState } from "react";
import styles from "./page.module.css";

const TIPOS_PROPIEDAD = [
  { id: "departamento", label: "Departamento", icono: "🏢" },
  { id: "casa",         label: "Casa",         icono: "🏠" },
  { id: "oficina",      label: "Oficina",      icono: "🏢" },
  { id: "local",        label: "Local comercial", icono: "🏪" },
  { id: "estudio",      label: "Estudio",      icono: "🛋️" },
];

export default function NuevaPropiedadForm() {
  const [paso, setPaso] = useState(1);
  const [enviando, setEnviando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState("");

  // Estado para el drag & drop de imagen
  const [imagenPreview, setImagenPreview] = useState(null);
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [errorImagen, setErrorImagen] = useState("");
  const [arrastrando, setArrastrando] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    tipoPropiedad: "",
    direccion: "",
    ciudad: "",
    pais: "Colombia",
    codigoPostal: "",
    habitaciones: '',
    area: '',
    baños: '',
    imagen: null,
    valorArriendo: '',
    diaVencimiento: '',
    depositoGarantia: '',
    estado: "DISPONIBLE"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: e.target.type === "number" ? Number(value) : value
    }));
  };

  const handleSelectTipo = (id) => {
    setFormData((prev) => ({ ...prev, tipoPropiedad: id }));
  };

  const siguientePaso = () => setPaso((p) => Math.min(p + 1, 3));
  const anteriorPaso = () => setPaso((p) => Math.max(p - 1, 1));

  // ================= LÓGICA DE SUBIDA DE IMAGEN =================

  const subirImagen = async (file) => {
    setErrorImagen("");

    if (!file.type.startsWith("image/")) {
      setErrorImagen("El archivo debe ser una imagen (PNG o JPG).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorImagen("La imagen no debe superar 5MB.");
      return;
    }

    // Preview local inmediato mientras se sube
    setImagenPreview(URL.createObjectURL(file));
    setSubiendoImagen(true);

    try {
      const uploadData = new FormData();
      uploadData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const rawText = await response.text();
      console.log("STATUS:", response.status);
      console.log("RESPUESTA CRUDA:", rawText);

      let data = null;
      try {
        data = JSON.parse(rawText);
      } catch {
        setErrorImagen(`Error del servidor (status ${response.status}). Revisa la consola.`);
        setImagenPreview(null);
        setSubiendoImagen(false);
        return;
      }

      if (!response.ok) {
        setErrorImagen(data?.error || "Error al subir la imagen.");
        setImagenPreview(null);
        setFormData((prev) => ({ ...prev, imagen: null }));
        return;
      }

      setFormData((prev) => ({ ...prev, imagen: data.url }));
    } catch (error) {
      console.error("Error al subir imagen:", error);
      setErrorImagen("Error de conexión al subir la imagen.");
      setImagenPreview(null);
    } finally {
      setSubiendoImagen(false);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) subirImagen(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setArrastrando(false);
    const file = e.dataTransfer.files?.[0];
    if (file) subirImagen(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setArrastrando(true);
  };

  const handleDragLeave = () => {
    setArrastrando(false);
  };

  const quitarImagen = () => {
    setImagenPreview(null);
    setFormData((prev) => ({ ...prev, imagen: null }));
    setErrorImagen("");
  };

  // ================= ENVÍO DEL FORMULARIO =================

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorEnvio("");
    setEnviando(true);

    try {
      const response = await fetch("/api/propiedades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json().catch(() => null);

      if (response.ok) {
        alert("¡Propiedad registrada exitosamente!");
      } else {
        console.error("Error del servidor:", data);
        setErrorEnvio(data?.error || "Hubo un error al guardar la propiedad.");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setErrorEnvio("Error de conexión. Intenta de nuevo.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className={styles.formContainer}>

      {/* 1. INDICADOR DE PASOS SUPERIOR */}
      <div className={styles.stepsContainer}>
        <div className={styles.stepItem}>
          <span className={`${styles.stepNumber} ${paso >= 1 ? styles.stepNumberActive : ""}`}>1</span>
          <span className={`${styles.stepLabel} ${paso >= 1 ? styles.stepLabelActive : ""}`}>Información básica</span>
        </div>
        <div className={`${styles.stepLine} ${paso >= 2 ? styles.stepLineActive : ""}`} />
        <div className={styles.stepItem}>
          <span className={`${styles.stepNumber} ${paso >= 2 ? styles.stepNumberActive : ""}`}>2</span>
          <span className={`${styles.stepLabel} ${paso >= 2 ? styles.stepLabelActive : ""}`}>Detalles</span>
        </div>
        <div className={`${styles.stepLine} ${paso === 3 ? styles.stepLineActive : ""}`} />
        <div className={styles.stepItem}>
          <span className={`${styles.stepNumber} ${paso === 3 ? styles.stepNumberActive : ""}`}>3</span>
          <span className={`${styles.stepLabel} ${paso === 3 ? styles.stepLabelActive : ""}`}>Renta y pago</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{backgroundColor: 'white'}}>

        {/* ================= PASO 1 ================= */}
        {paso === 1 && (
          <div style={{backgroundColor: 'white'}}>
            <h3 className={styles.sectionTitle}>Tipo de propiedad</h3>

            <div className={styles.tilesGrid}>
              {TIPOS_PROPIEDAD.map((tipo) => {
                const esSeleccionado = formData.tipoPropiedad === tipo.id;
                return (
                  <div
                    key={tipo.id}
                    onClick={() => handleSelectTipo(tipo.id)}
                    className={`${styles.tileCard} ${esSeleccionado ? styles.tileCardActive : ""}`}
                  >
                    <div className={styles.tileIcon}>{tipo.icono}</div>
                    <div className={`${styles.tileLabel} ${esSeleccionado ? styles.tileLabelActive : ""}`}>
                      {tipo.label}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={styles.formRow}>
              <div className={styles.formFieldFlex2}>
                <label className={styles.label}>Nombre Identificador *</label>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Ej. Apartamento 402 - Torre Norte" className={styles.input} required />
              </div>
              <div className={styles.formField}>
                <label className={styles.label}>Código Postal *</label>
                <input type="text" name="codigoPostal" value={formData.codigoPostal} onChange={handleChange} placeholder="06600" className={styles.input} required />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Dirección *</label>
              <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} placeholder="Ej. Av. Reforma 1245" className={styles.input} required />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label className={styles.label}>Ciudad *</label>
                <input type="text" name="ciudad" value={formData.ciudad} onChange={handleChange} placeholder="Cali" className={styles.input} required />
              </div>
              <div className={styles.formField}>
                <label className={styles.label}>País *</label>
                <input type="text" name="pais" value={formData.pais} onChange={handleChange} placeholder="Colombia" className={styles.input} required />
              </div>
            </div>
          </div>
        )}

        {/* ================= PASO 2 ================= */}
        {paso === 2 && (
          <div style={{backgroundColor: 'white'}}>
            <h3 className={styles.sectionTitle}>Detalles estructurales</h3>

            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label className={styles.label}>Habitaciones</label>
                <input type="number" name="habitaciones" value={formData.habitaciones} onChange={handleChange} className={styles.input} />
              </div>
              <div className={styles.formField}>
                <label className={styles.label}>Baños</label>
                <input type="number" name="baños" value={formData.baños} onChange={handleChange} className={styles.input} />
              </div>
              <div className={styles.formField}>
                <label className={styles.label}>Área (m²)</label>
                <input type="number" name="area" value={formData.area} onChange={handleChange} className={styles.input} />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Imagen de la propiedad</label>

              {!imagenPreview ? (
                <label
                  className={styles.dropzone}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  style={{
                    display: "block",
                    width: "100%",
                    boxSizing: "border-box",
                    ...(arrastrando ? { backgroundColor: "#f8fafc", borderColor: "#2563eb" } : {}),
                  }}
                >
                  <span className={styles.dropzoneIcon}>📤</span>
                  <p className={styles.dropzoneText}>Arrastra una imagen o haz clic para subir</p>
                  <span className={styles.dropzoneSubtext}>PNG, JPG hasta 5MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    style={{ display: "none" }}
                  />
                </label>
              ) : (
                <div style={{ position: "relative", display: "inline-block" }}>
                  <img
                    src={imagenPreview}
                    alt="Vista previa"
                    style={{ maxWidth: "220px", borderRadius: "12px", display: "block" }}
                  />
                  {subiendoImagen && (
                    <div style={{ marginTop: "8px", fontSize: "13px", color: "#2563eb" }}>
                      Subiendo imagen...
                    </div>
                  )}
                  {!subiendoImagen && (
                    <button
                      type="button"
                      onClick={quitarImagen}
                      className={styles.btnBack}
                      style={{ marginTop: "8px" }}
                    >
                      Quitar imagen
                    </button>
                  )}
                </div>
              )}

              {errorImagen && (
                <p style={{ color: "#dc2626", fontSize: "13px", marginTop: "8px" }}>{errorImagen}</p>
              )}
            </div>
          </div>
        )}

        {/* ================= PASO 3 ================= */}
        {paso === 3 && (
          <div style={{backgroundColor: 'white'}}>
            <h3 className={styles.sectionTitle}>Renta y condiciones de pago</h3>

            <div className={styles.formGroup}>
              <label className={styles.label}>Valor del Arriendo *</label>
              <input type="number" name="valorArriendo" value={formData.valorArriendo} onChange={handleChange} placeholder="$0.00" className={styles.input} required />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label className={styles.label}>Depósito de Garantía</label>
                <input type="number" name="depositoGarantia" value={formData.depositoGarantia} onChange={handleChange} placeholder="$0.00" className={styles.input} />
              </div>
              <div className={styles.formField}>
                <label className={styles.label}>Día de Vencimiento de Pago</label>
                <input type="number" name="diaVencimiento" value={formData.diaVencimiento} onChange={handleChange} min={1} max={31} className={styles.input} />
              </div>
            </div>

            {errorEnvio && (
              <p style={{ color: "#dc2626", fontSize: "14px", marginTop: "8px" }}>{errorEnvio}</p>
            )}
          </div>
        )}

        {/* ================= BOTONES DE NAVEGACIÓN ================= */}
        <div className={styles.actionsContainer}>
          <button
            type="button"
            onClick={anteriorPaso}
            disabled={paso === 1}
            className={styles.btnBack}
          >
            Anterior
          </button>

          {paso < 3 ? (
            <button
              type="button"
              onClick={siguientePaso}
              disabled={paso === 1 && !formData.tipoPropiedad}
              className={styles.btnNext}
            >
              Continuar
            </button>
          ) : (
            <button type="submit" className={styles.btnSubmit} disabled={enviando || subiendoImagen}>
              {enviando ? "Guardando..." : "Guardar Propiedad"}
            </button>
          )}
        </div>

      </form>
    </div>
  );
}