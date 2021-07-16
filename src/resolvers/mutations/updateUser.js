import { ApolloError } from 'apollo-server'

import { isOwner } from '../../utils/authorization'

import { PrismaSelect } from '@paljs/plugins'

import getParsedLocations from '../../utils/getParsedLocations'

export default async (parent, args, context, info) => {
  if (!isOwner(context, args.userID)) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  const { select } = new PrismaSelect(info).value

  // parse location data
  const parsedLocations = await getParsedLocations(args.input)

  console.log(parsedLocations)

  const user = await context.prisma.user.update({
    where: { id: args.userID },
    data: { ...args.input, ...parsedLocations },
    select: { ...select, id: true }
  })

  return user
}
