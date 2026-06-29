"use client"
import Business from '@/assets/businessgray.svg'
import Enterprise from '@/assets/enterprise.svg'
import homegray from "@/assets/homegray.svg"
import Apartment from "@/assets/apartmentgray.svg"
import School from '@/assets/school.svg'
import { useState } from 'react'

    const tipoPropiedad = [
        {id: 'Departamento', label: 'Departamento', icono: Apartment},
        {id: 'Casa', label: 'Casa', icono: homegray},
        {id: 'Oficina', label: 'Oficina', icono: Business},
        {id: 'Local', label: 'Local Comercial', icono: Enterprise},
        {id: 'Estudio', label: 'Estudio', icono: School}
    ]

const New = () => {

    const [paso, setPaso] = useState(1)
    const [formData, setFormData] = useState()

    return (
        <>
            <p></p>
        </>
    )
}

export default New