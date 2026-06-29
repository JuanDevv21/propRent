// src/components/UserWidget.js
import React from 'react';

export default function UserWidget({ propietario }) {
  if (!propietario) {
    return <p style={{ fontSize: '14px', color: 'gray' }}>No autenticado</p>;
  }

  const nombre = propietario.nombrePropietario || "Usuario";
  
  const iniciales = nombre
    .split(" ")
    .map(n => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderLeft: '1px solid #e2e8f0', paddingLeft: '16px' }}>
      
      <button style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer' }}>
        <span style={{ fontSize: '20px' }}>🔔</span>
        <span style={{
          position: 'absolute',
          top: '2px',
          right: '2px',
          width: '10px',
          height: '10px',
          backgroundColor: '#ef4444',
          borderRadius: '50%',
          border: '2px solid white'
        }} />
      </button>

      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#0f172a', fontFamily: 'Inter' }}>
          {nombre}
        </span>
        <span style={{ fontSize: '12px', color: '#64748b', fontFamily: 'Inter' }}>
          Propietario
        </span>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        backgroundColor: '#2563eb',
        color: 'white',
        fontWeight: '600',
        borderRadius: '50%',
        fontSize: '14px',
        letterSpacing: '0.05em'
      }}>
        {iniciales}
      </div>
      
    </div>
  );
}