import { ApolloError } from 'apollo-server'

import { isOwner } from '../../utils/authorization'

import { PrismaSelect } from '@paljs/plugins'

export default async (parent, args, context, info) => {
  if (!isOwner(context, args.userID)) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  const { select } = new PrismaSelect(info).value

  const user = await context.prisma.user.update({
    where: { id: args.userID },
    data: args.input,
    select: { ...select, id: true }
  })

  return user
}
