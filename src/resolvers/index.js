import { JSONResolver, DateTimeResolver } from 'graphql-scalars'

import login from './mutations/login'
import loginWithProvider from './mutations/loginWithProvider'
import resetUserPassword from './mutations/resetUserPassword'

import whoAmI from './queries/whoAmI'

import createUser from './mutations/createUser'

export default {
  JSON: JSONResolver,
  DateTime: DateTimeResolver,

  User: {
    id: parent => parent._id.toString()
  },

  Query: {
    healthCheck: () => 'Welcome to Treelative API',
    whoAmI
  },

  Mutation: {
    login,
    loginWithProvider,
    resetUserPassword,
    createUser
  }
}
