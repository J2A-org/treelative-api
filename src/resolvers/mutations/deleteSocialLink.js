import { ApolloError } from 'apollo-server'

import { isOwner } from '../../utils/authorization'

import { PrismaSelect } from '@paljs/plugins'

export default async (parent, args, context, info) => {
  const { select } = new PrismaSelect(info).value

  const deletingSocialLink = await context.prisma.socialLink.findUnique({
    where: { id: args.socialLinkID },
    select: { userID: true }
  })

  if (!isOwner(context, deletingSocialLink.userID)) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  const socialLink = await context.prisma.socialLink.delete({
    where: { id: args.socialLinkID },
    select: { ...select, id: true }
  })

  return socialLink
}
