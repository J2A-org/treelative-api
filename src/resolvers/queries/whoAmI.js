import { ApolloError } from 'apollo-server'

export default async (parent, args, context, info) => {
  if (!context.user) {
    throw new ApolloError('Session expired.', 'SESSION_EXPIRED')
  }

  return context.user
}
