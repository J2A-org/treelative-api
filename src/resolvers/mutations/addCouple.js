import { ApolloError } from 'apollo-server'

import { isOwner } from '../../utils/authorization'

import { PrismaSelect } from '@paljs/plugins'

export default async (parent, args, context, info) => {
  const { userOneID, userTwoID, ...rest } = args.input

  if (!isOwner(context, userOneID) && !isOwner(context, userTwoID)) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  const { userOne, userTwo, ...select } = new PrismaSelect(info).value.select

  // create the couple
  const couple = await context.prisma.couple.create({
    data: {
      ...rest,
      userOne: {
        connect: { id: userOneID }
      },
      userTwo: {
        connect: { id: userTwoID }
      }
    },
    select: { ...select, id: true, userOneID: Boolean(userOne), userTwoID: Boolean(userTwo) }
  })

  // connect the couple to users
  await context.prisma.user.updateMany({
    where: { id: { in: [userOneID, userTwoID] } },
    data: {
      coupleID: couple.id
    }
  })

  return couple
}
