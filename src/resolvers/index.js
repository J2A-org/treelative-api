import { JSONResolver, DateTimeResolver } from 'graphql-scalars'

import getUser from './queries/getUser'
import queryUser from './queries/queryUser'

import addUser from './mutations/addUser'
import updateUser from './mutations/updateUser'
import deleteUser from './mutations/deleteUser'

import addUserParent from './mutations/addUserParent'
import addUserChild from './mutations/addUserChild'
import addUserPartner from './mutations/addUserPartner'

import getUserParent from './queries/getUserParent'
import getUserChildren from './queries/getUserChildren'
import getUserPartner from './queries/getUserPartner'

import queryCouple from './queries/queryCouple'

export default {
  JSON: JSONResolver,
  DateTime: DateTimeResolver,

  User: {
    parent: getUserParent,
    children: getUserChildren,
    partner: getUserPartner
  },

  Query: {
    getUser,
    queryUser,
    queryCouple
  },

  Mutation: {
    addUser,
    updateUser,
    deleteUser,
    addUserParent,
    addUserChild,
    addUserPartner
  }
}
