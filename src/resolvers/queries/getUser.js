import { ApolloError } from 'apollo-server'

import { PrismaSelect } from '@paljs/plugins'

export default async (parent, args, context, info) => {
  const { select } = new PrismaSelect(info).value

  const user = await context.prisma.user.findUnique({
    where: args.filter,
    select: { ...select, id: true }
  })

  if (user.role !== 'ADMIN') {
    // only authenticated users can view a regular user
    if (!context.user) {
      throw new ApolloError('You must be authenticated to perform this action', 'UNAUTHENTICATED')
    }
  }

  return user
}
