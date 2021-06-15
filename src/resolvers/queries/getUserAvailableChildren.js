import { ApolloError } from 'apollo-server'

import { PrismaSelect } from '@paljs/plugins'

export default async (parent, args, context, info) => {
  // only authenticated users can view list a user's available partners
  if (!context.user) {
    throw new ApolloError('You must be authenticated to perform this action', 'UNAUTHENTICATED')
  }

  const { userID, ...filters } = args

  const { select } = new PrismaSelect(info).value

  const usersWithoutParents = await context.prisma.user.findMany({
    ...filters,
    where: {
      parents: {
        none: {}
      },
      ...filters.where
    },
    select: { ...select, id: true }
  })

  const requestedUser = await context.prisma.user.findUnique({
    where: { id: userID },
    select: { id: true }
  })

  return usersWithoutParents.filter(({ id }) => id !== requestedUser.id)
}
