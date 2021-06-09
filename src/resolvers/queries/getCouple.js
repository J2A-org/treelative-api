import { ApolloError } from 'apollo-server'

export default async (parent, args, context, info) => {
  // only authenticated users can view a user
  if (!context.user) {
    throw new ApolloError('You must be authenticated to view a user', 'UNAUTHENTICATED')
  }

  const couple = await context.prisma.couple.findUnique({
    where: args.filter
  })

  return couple
}
