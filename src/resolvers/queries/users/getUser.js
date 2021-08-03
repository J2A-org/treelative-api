import { ApolloError } from 'apollo-server'

import { isOwner } from '../../../utils/authorization'

export default async (parent, args, context, info) => {
  if (!isOwner(context, args.userID)) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  const user = await context.models.User.findOne({ _id: args.id }).lean()

  return user
}
