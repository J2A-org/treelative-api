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

  // if either couple has children - connect any missing ones
  const userOneChildIDs = (await context.prisma.user.findUnique({
    where: { id: userOneID },
    select: { id: true }
  }).children()).map(({ id }) => id)

  const userTwoChildIDs = (await context.prisma.user.findUnique({
    where: { id: userTwoID },
    select: { id: true }
  }).children()).map(({ id }) => id)

  const userOneChildrenNotInUserTwo = []
  for (const userID of userOneChildIDs) {
    if (!userTwoChildIDs.includes(userID)) {
      userOneChildrenNotInUserTwo.push(userID)
    }
  }
  if (userOneChildrenNotInUserTwo.length > 0) {
    await context.prisma.user.update({
      where: { id: userTwoID },
      data: {
        children: {
          connect: userOneChildrenNotInUserTwo.map(id => ({ id }))
        }
      },
      select: { id: true }
    })
  }

  const userTwoChildrenNotInUserOne = []
  for (const userID of userTwoChildIDs) {
    if (!userOneChildIDs.includes(userID)) {
      userTwoChildrenNotInUserOne.push(userID)
    }
  }
  if (userTwoChildrenNotInUserOne.length > 0) {
    await context.prisma.user.update({
      where: { id: userOneID },
      data: {
        children: {
          connect: userTwoChildrenNotInUserOne.map(id => ({ id }))
        }
      },
      select: { id: true }
    })
  }

  return couple
}
