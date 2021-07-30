import { ApolloError } from 'apollo-server'

import { isOwner } from '../../utils/authorization'

import { hash } from 'bcryptjs'

export default async (parent, args, context, info) => {
  const { userID, password } = args

  if (!isOwner(context, userID)) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

  const hashedPassword = await hash(password, 10)

  const user = await context.models.User.findOneAndUpdate(
    { _id: userID },
    { password: hashedPassword },
    { projection: 'id', lean: true }
  )

  return user
}
