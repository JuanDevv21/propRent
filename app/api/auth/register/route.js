const {prisma} = require('../../../../db.js')
const bcrypt = require('bcrypt')

async function POST(request) {
    try {
        const body = await request.json()
        const {nombrePropietario, documentoPropietario, departamento, fechaNacimiento, ciudad, emailPropietario, passwordPropietario} = body
        
        const hoy = new Date()
        const nacimiento = new Date(fechaNacimiento)
        const edad = hoy.getFullYear - nacimiento.getFullYear()
        const cumplioCumple = hoy.getMonth() > nacimiento.getMonth() || (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() === nacimiento.getDate())
        const edadReal = cumplioCumple ? edad : edad - 1

        if(edadReal < 18) {
            return Response.json(
                {error: 'Debes ser mayor de edad para ingresar a la plataforma'},
                {status: 400}
            )
        }

        const propietarioExistente = await prisma.propietario.findFirst({
            where: {
                OR: [
                    {emailPropietario},
                    {documentoPropietario}
                ]
            }
        })

        if (propietarioExistente) {
            return Response.json(
                {
                error: "El propietario ya existe"
                },
                {
                status: 400
                }
            )
        }
        const hashedPassword = await bcrypt.hash(passwordPropietario, 10)
        const nuevoPropietario = await prisma.propietario.create({
            data: {
                nombrePropietario,
                documentoPropietario,
                departamento,
                ciudad,
                fechaNacimiento,
                emailPropietario,
                passwordPropietario: hashedPassword
            }
        })

        return Response.json(
            {
                message: "Propietario creado",
                propietario: nuevoPropietario
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