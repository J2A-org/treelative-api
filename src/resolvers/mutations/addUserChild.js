import { ApolloError } from 'apollo-server'

import { isOwner } from '../../utils/authorization'

import { PrismaSelect } from '@paljs/plugins'

export default async (parent, args, context, info) => {
  const { userID, childID } = args

  if (!isOwner(context, userID) && !isOwner(context, childID)) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  const { select } = new PrismaSelect(info).value

  const user = await context.prisma.user.update({
    where: { id: userID },
    data: {
      children: {
        connect: { id: childID }
      }
    },
    select: { ...select, id: true, couple: true }
  })

  // if the user has a couple - add that couple as a parent to this child
  if (user.couple) {
    const { userOneID, userTwoID } = user.couple
    const userCoupleID = userOneID === user.id ? userTwoID : userOneID
    await context.prisma.user.update({
      where: { id: userCoupleID },
      data: {
        children: {
          connect: { id: childID }
        }
      },
      select: { id: true }
    })
  }

  return user
}
