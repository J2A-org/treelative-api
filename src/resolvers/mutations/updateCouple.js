import { ApolloError } from 'apollo-server'

import { isOwner } from '../../utils/authorization'

import { PrismaSelect } from '@paljs/plugins'

export default async (parent, args, context, info) => {
  const updatingCouple = await context.prisma.couple.findUnique({
    where: { id: args.coupleID },
    select: { userOneID: true, userTwoID: true }
  })

  if (!isOwner(context, updatingCouple.userOneID) && !isOwner(context, updatingCouple.userTwoID)) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  const { userOne, userTwo, ...select } = new PrismaSelect(info).value.select

  const couple = await context.prisma.couple.update({
    where: { id: args.coupleID },
    data: args.input,
    select: { ...select, id: true, userOneID: Boolean(userOne), userTwoID: Boolean(userTwo) }
  })

  return couple
}
