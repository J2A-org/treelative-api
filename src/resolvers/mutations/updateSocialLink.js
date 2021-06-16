import { ApolloError } from 'apollo-server'

import { isOwner } from '../../utils/authorization'

import { PrismaSelect } from '@paljs/plugins'

export default async (parent, args, context, info) => {
  const deletingSocialLink = await context.prisma.socialLink.findUnique({
    where: { id: args.socialLinkID },
    select: { userID: true }
  })

  if (!isOwner(context, deletingSocialLink.userID)) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  const { select } = new PrismaSelect(info).value

  const socialLink = await context.prisma.socialLink.update({
    where: { id: args.socialLinkID },
    data: args.input,
    select: { ...select, id: true }
  })

  return socialLink
}
