import { ApolloError } from 'apollo-server'

import jwt from 'jsonwebtoken'

const {
  JWT_SECRET = 'shuuush',
  JWT_EXPIRY = '2h'
} = process.env

export const generateToken = id => jwt.sign(
  { id }, JWT_SECRET, { expiresIn: JWT_EXPIRY }
)

export const authenticateUserToken = async (req, prisma) => {
  try {
    const token = req.headers.auth_session_id

    if (!token) return null

    const { id } = jwt.verify(token, JWT_SECRET)

    if (!id) return null

    const user = await prisma.user.findUnique({ where: { id } })

    return user
  } catch (error) {
    if (['TokenExpiredError', 'JsonWebTokenError'].includes(error.name)) {
      return null
    } else {
      throw new ApolloError(error.message, 500)
    }
  }
}
