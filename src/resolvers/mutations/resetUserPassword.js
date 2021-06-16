import { ApolloError } from 'apollo-server'

import { isOwner } from '../../utils/authorization'

import { hash } from 'bcryptjs'

import { PrismaSelect } from '@paljs/plugins'

export default async (parent, args, context, info) => {
  const { userID, password } = args

  if (!isOwner(context, userID)) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  const hashedPassword = await hash(password, 10)

  const { select } = new PrismaSelect(info).value

  const user = await context.prisma.user.update({
    where: { id: userID },
    data: { password: hashedPassword },
    select: { ...select, id: true }
  })

  return user
}
