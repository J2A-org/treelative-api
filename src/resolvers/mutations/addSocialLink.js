import { ApolloError } from 'apollo-server'

import { isOwner } from '../../utils/authorization'

import { PrismaSelect } from '@paljs/plugins'

export default async (parent, args, context, info) => {
  if (!isOwner(context, args.input.userID)) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  const { user, ...select } = new PrismaSelect(info).value.select

  // create the socialLink
  const socialLink = await context.prisma.socialLink.create({
    data: args.input,
    select: { ...select, id: true, userID: Boolean(user) }
  })

  return socialLink
}
