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
import getUserPartner from './queries/getUserPartner'
import getUserSiblings from './queries/getUserSiblings'
import getUserMarriage from './queries/getUserMarriage'

import getCoupleUserOne from './queries/getCoupleUserOne'
import getCoupleUserTwo from './queries/getCoupleUserTwo'
import queryCouple from './queries/queryCouple'

export default {
  JSON: JSONResolver,
  DateTime: DateTimeResolver,

  User: {
    parents: getUserParents,
    children: getUserChildren,
    partner: getUserPartner,
    siblings: getUserSiblings,
    marriage: getUserMarriage
  },

  Couple: {
    userOne: getCoupleUserOne,
    userTwo: getCoupleUserTwo
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
