const {cookies} = require('next/headers')
const jwt = require('jsonwebtoken')
const {prisma} = require('@/db')

export async function getCurrentUser() {
    try {
        const cookieStore =await cookies()
        const token = cookieStore.get('token')?.value

        if(!token) return null

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const propietario = await prisma.propietario.findUnique({
            where: { id: decoded.id},
            select: {
                nombrePropietario: true,
            }
        })
        return propietario
    } catch(error) {
        return null
    }
}