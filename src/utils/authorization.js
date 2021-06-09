import { ApolloError } from 'apollo-server'

export const isAuthenticated = (context) => {
  if (!context.user) {
    throw new ApolloError('You must be authenticated to perform this action', 'UNAUTHENTICATED')
  }
}

export const isAdmin = (context) => {
  isAuthenticated(context)

  if (context.user.role !== 'ADMIN') {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }
}
