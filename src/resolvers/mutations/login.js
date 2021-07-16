import { ApolloError } from 'apollo-server'

import { compare } from 'bcryptjs'

import { generateToken } from '../../utils/authentication'

export default async (parent, args, context, info) => {
  const { username, password } = args.input

  const user = await context.prisma.user.findUnique({
    where: { username },
    select: { id: true, role: true, password: true }
  })

  if (!user) {
    throw new ApolloError('Incorrect email or password.', 'UNAUTHENTICATED')
  }

  if (!await compare(password, user.password)) {
    throw new ApolloError('Incorrect email or password.', 'UNAUTHENTICATED')
  }

  const token = generateToken(user)

  return token
}
