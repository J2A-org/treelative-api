import { ApolloError } from 'apollo-server'

import { isOwner } from '../../utils/authorization'

import { PrismaSelect } from '@paljs/plugins'

export default async (parent, args, context, info) => {
  const { userOne, userTwo, ...select } = new PrismaSelect(info).value.select

  const deletingCouple = await context.prisma.couple.findUnique({
    where: { id: args.coupleID },
    select: { userOneID: true, userTwoID: true }
  })

  if (!isOwner(context, deletingCouple.userOneID) && !isOwner(context, deletingCouple.userTwoID)) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  const couple = await context.prisma.couple.delete({
    where: { id: args.coupleID },
    select: { ...select, id: true, userOneID: Boolean(userOne), userTwoID: Boolean(userTwo) }
  })

  return couple
}
