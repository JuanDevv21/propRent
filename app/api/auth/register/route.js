const {prisma} = require('../../../../db.js')
const bcrypt = require('bcrypt')

async function POST(request) {
    try {
        const body = await request.json()
        const {nombrePropietario, documentoPropietario, emailPropietario, passwordPropietario} = body
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