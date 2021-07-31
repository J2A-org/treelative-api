import { ApolloError } from 'apollo-server'

import { isOwner } from '../../../utils/authorization'

export default async (parent, args, context, info) => {
  if (!isOwner(context, args.userID)) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  const user = await context.models.User.findOneAndUpdate(
    { _id: args.userID },
    { social: args.input },
    { new: true }
  )

  return user
}
