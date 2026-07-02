import { NextResponse } from "next/server";
import { prisma } from "@/db";
import { getCurrentUser } from "@/util/getUser";

export async function POST(request) {
  try {
    const propietario = await getCurrentUser();

    if (!propietario) {
      return NextResponse.json(
        { error: "No autorizado. Inicia sesión de nuevo." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const {
      nombre,
      tipoPropiedad,
      direccion,
      ciudad,
      pais,
      codigoPostal,
      habitaciones,
      area,
      baños,
      valorArriendo,
      diaVencimiento,
      depositoGarantia,
      imagen,
      estado,
    } = body;

    if (!nombre || !tipoPropiedad || !direccion || !ciudad || !pais || !codigoPostal) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios (nombre, tipo, dirección, ciudad, país o código postal)." },
        { status: 400 }
      );
    }

    if (!valorArriendo || Number(valorArriendo) <= 0) {
      return NextResponse.json(
        { error: "El valor del arriendo es obligatorio y debe ser mayor a 0." },
        { status: 400 }
      );
    }

    const nuevaPropiedad = await prisma.propiedad.create({
      data: {
        nombre,
        tipoPropiedad,
        direccion,
        ciudad,
        pais,
        codigoPostal,
        habitaciones: Number(habitaciones) || 0,
        area: Number(area) || 0,
        baños: Number(baños) || 0,
        valorArriendo: Number(valorArriendo),
        diaVencimiento: Number(diaVencimiento) || 1,
        depositoGarantia: Number(depositoGarantia) || 0,
        imagen: imagen || null,
        estado: estado || "DISPONIBLE",
        propietarioId: propietario.id,
      },
    });

    return NextResponse.json({ propiedad: nuevaPropiedad }, { status: 201 });
  } catch (error) {
    console.error("Error al crear propiedad:", error);
    return NextResponse.json(
      { error: "Error interno al guardar la propiedad." },
      { status: 500 }
    );
  }
}