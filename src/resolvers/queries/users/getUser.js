import { ApolloError } from 'apollo-server'

import { isAuthenticated } from '../../../utils/authorization'

export default async (parent, args, context, info) => {
  const user = await context.models.User.findOne({ _id: args.id }).lean()

  if (!user.isPublic && !isAuthenticated(context)) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  return user
}
