import { ApolloError } from 'apollo-server'

import { PrismaSelect } from '@paljs/plugins'

export default async (parent, args, context, info) => {
  // only authenticated users can view a user
  if (!context.user) {
    throw new ApolloError('You must be authenticated to perform this action', 'UNAUTHENTICATED')
  }

  const { select } = new PrismaSelect(info).value

  const couple = await context.prisma.couple.findUnique({
    where: args.filter,
    select: { ...select, id: true }
  })

  return couple
}
