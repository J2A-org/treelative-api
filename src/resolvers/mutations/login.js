import { ApolloError } from 'apollo-server'

import { compare } from 'bcryptjs'

import { generateToken } from '../../utils/authentication'

export default async (parent, args, context, info) => {
  const { username, password } = args.input

  console.log(username)

  const user = await context.prisma.user.findUnique({
    where: { username }
  })

  if (!await compare(password, user.password)) {
    throw new ApolloError('Incorrect email or password.', 401)
  }

  const token = generateToken(user.id)

  return token
}
