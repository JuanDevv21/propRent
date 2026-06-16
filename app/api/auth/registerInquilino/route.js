const {prisma} = require('../../../../db')
const bcrypt = require('bcrypt')

async function POST(request) {
    try {
        const body = await request.json()
        const {nombreInquilino, documentoInquilino, emailInquilino, passwordInquilino} = body
    
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