const {prisma} = require('../../../../db')
const bcrypt = require('bcrypt')

async function POST(request) {
    try {
        const body = await request.json()
        const {nombreInquilino, documentoInquilino, departamento, ciudad, fechaNacimiento, emailInquilino, passwordInquilino} = body

        const hoy = new Date()
        const nacimiento = new Date(fechaNacimiento)
        const edad = hoy.getFullYear() - nacimiento.getFullYear()
        const cumplioCumple =
        hoy.getMonth() > nacimiento.getMonth() || (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() === nacimiento.getDate())
        const edadReal = cumplioCumple ? edad : edad - 1

        if (edadReal < 18) {
            return Response.json(
                {error: "Debes ser mayor de edad para ingresar a la plataforma"},
                {status: 400}
            )
        }
    
        const propietarioExiste = await prisma.inquilino.findFirst({
            where: {
                OR: [
                    {emailInquilino},
                    {documentoInquilino}
                ]
            }
        })

        if(propietarioExiste) {
            return Response.json(
                {
                error: 'El Inquilino ya existe'
                },
                {
                status: 400
                }
            )
        }

        const hashedPassword = await bcrypt.hash(passwordInquilino, 10)
        const nuevoInquilino = await prisma.inquilino.create({
            data: {
                nombreInquilino,
                documentoInquilino,
                departamento,
                ciudad,
                fechaNacimiento,
                emailInquilino,
                passwordInquilino: hashedPassword
            }
        })

        return Response.json(
            {
                message: 'Inquilino creado',
                inquilino: nuevoInquilino
            },
            {
                status: 201
            }
        )
        } catch(error) {
            console.error(error)
            return Response.json(
                {
                    message: "Error interno"
                },
                {
                    status: 500
                }
            )
    }
}

module.exports = {POST}