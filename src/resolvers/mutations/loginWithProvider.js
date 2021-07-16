import { ApolloError } from 'apollo-server'

import admin from '../../utils/firebase'

import { generateToken } from '../../utils/authentication'

export default async (parent, args, context, info) => {
  const { email, token } = args

  // verify firebase session id
  await admin.auth().verifyIdToken(token)

  if (!email) {
    throw new ApolloError('User is not registered.', 'UNREGISTERED')
  }

  const user = await context.prisma.user.findUnique({
    where: { email },
    select: { id: true, role: true }
  })

  if (!user) {
    throw new ApolloError(`We could not find an account associated with the email ${email}`, 'UNREGISTERED')
  }

  return generateToken(user)
}
