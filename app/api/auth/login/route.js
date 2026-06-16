const {prisma} = require('../../../../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function POST(request) {

    try {

        const body = await request.json()

        const {
            emailPropietario,
            passwordPropietario
        } = body

        const propietario = await prisma.propietario.findUnique({
            where: {
                emailPropietario
            }
        })

        if(!propietario) {
            return Response.json(
                {
                    error: "Correo o contraseña incorrectos"
                },
                {
                    status: 401
                }
            )
        }

        const passwordCorrecta = await bcrypt.compare(
            passwordPropietario,
            propietario.passwordPropietario
        )

        if (!passwordCorrecta) {
            return Response.json(
                {
                    error: "Correo o contraseña incorrectos"
                },
                {
                    status: 401
                }
            )
        }

        const token = jwt.sign (
            {
                id: propietario.id,
                email: propietario.emailPropietario
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d'
            }
        )

        return Response.json(
            {
                message: "Login exitoso",
                token
            },
            {
                status: 200
            }
        )

    } catch (error){
        console.error(error)
        return Response.json(
            {
                error: 'Error interno'
            },
            {
                status: 500
            }
        )
    }
}

module.exports = {POST}