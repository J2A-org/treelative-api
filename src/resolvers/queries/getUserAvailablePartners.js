import { ApolloError } from 'apollo-server'

import { PrismaSelect } from '@paljs/plugins'

export default async (parent, args, context, info) => {
  // only authenticated users can view list a user's available partners
  if (!context.user) {
    throw new ApolloError('You must be authenticated to perform this action', 'UNAUTHENTICATED')
  }

  const { userID, ...filters } = args

  const { select } = new PrismaSelect(info).value

  const usersWithoutPartners = await context.prisma.user.findMany({
    ...filters,
    where: {
      coupleID: null,
      ...filters.where
    },
    select: { ...select, id: true }
  })

  const requestedUser = await context.prisma.user.findUnique({
    where: { id: userID },
    select: { id: true }
  })

  return usersWithoutPartners.filter(({ id }) => id !== requestedUser.id)
}
