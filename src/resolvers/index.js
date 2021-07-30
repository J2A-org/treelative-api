import { JSONResolver, DateTimeResolver } from 'graphql-scalars'

import login from './mutations/login'
import loginWithProvider from './mutations/loginWithProvider'
import resetUserPassword from './mutations/resetUserPassword'

import whoAmI from './queries/whoAmI'

import createUser from './mutations/createUser'
import deleteUser from './mutations/deleteUser'

import updateUserGeneral from './mutations/updateUserGeneral'
import updateUserSocial from './mutations/updateUserSocial'
import updateUserAvatar from './mutations/updateUserAvatar'

import addUserParent from './mutations/addUserParent'
import addUserChild from './mutations/addUserChild'
import addUserPartner from './mutations/addUserPartner'

import removeUserParent from './mutations/removeUserParent'
import removeUserChild from './mutations/removeUserChild'
import removeUserPartner from './mutations/removeUserPartner'

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
    createUser,
    deleteUser,
    updateUserGeneral,
    updateUserSocial,
    updateUserAvatar,
    addUserParent,
    addUserChild,
    addUserPartner,
    removeUserParent,
    removeUserChild,
    removeUserPartner
  }
}
