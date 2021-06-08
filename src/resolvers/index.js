import { JSONResolver, DateTimeResolver } from 'graphql-scalars'

import getUser from './queries/getUser'
import queryUser from './queries/queryUser'

import addUser from './mutations/addUser'
import updateUser from './mutations/updateUser'
import deleteUser from './mutations/deleteUser'

import addUserParent from './mutations/addUserParent'
import addUserChild from './mutations/addUserChild'
import addUserPartner from './mutations/addUserPartner'

import getUserParents from './queries/getUserParents'
import getUserChildren from './queries/getUserChildren'
import getUserPartners from './queries/getUserPartners'

import getCoupleUser1 from './queries/getCoupleUser1'
import getCoupleUser2 from './queries/getCoupleUser2'
import queryCouple from './queries/queryCouple'

export default {
  JSON: JSONResolver,
  DateTime: DateTimeResolver,

  User: {
    parents: getUserParents,
    children: getUserChildren,
    partners: getUserPartners
  },

  Couple: {
    user1: getCoupleUser1,
    user2: getCoupleUser2
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
