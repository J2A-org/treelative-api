import { JSONResolver, DateTimeResolver } from 'graphql-scalars'

import login from './mutations/login'
import whoAmI from './queries/whoAmI'

import getUser from './queries/getUser'
import queryUser from './queries/queryUser'
import countUser from './queries/countUser'

import addUser from './mutations/addUser'
import updateUser from './mutations/updateUser'
import deleteUser from './mutations/deleteUser'

import addCouple from './mutations/addCouple'
import updateCouple from './mutations/updateCouple'
import deleteCouple from './mutations/deleteCouple'

import addUserParent from './mutations/addUserParent'
import addUserChild from './mutations/addUserChild'
import addUserPartner from './mutations/addUserPartner'

import getUserParents from './queries/getUserParents'
import getUserChildren from './queries/getUserChildren'
import getUserCouple from './queries/getUserCouple'
import getUserSiblings from './queries/getUserSiblings'

import getCouple from './queries/getCouple'
import queryCouple from './queries/queryCouple'
import countCouple from './queries/countCouple'

import getCoupleUserOne from './queries/getCoupleUserOne'
import getCoupleUserTwo from './queries/getCoupleUserTwo'
import getCouplePartner from './queries/getCouplePartner'

import getProtectedField from '../utils/getProtectedField'

export default {
  JSON: JSONResolver,
  DateTime: DateTimeResolver,

  User: {
    email: getProtectedField,
    birthLocation: getProtectedField,
    currentLocation: getProtectedField,
    deathLocation: getProtectedField,
    dateOfBirth: getProtectedField,
    dateOfDeath: getProtectedField,
    parents: getUserParents,
    children: getUserChildren,
    siblings: getUserSiblings,
    couple: getUserCouple
  },

  Couple: {
    dateOfMarriage: getProtectedField,
    marriageLocation: getProtectedField,
    userOne: getCoupleUserOne,
    userTwo: getCoupleUserTwo,
    partner: getCouplePartner
  },

  Query: {
    whoAmI,
    getUser,
    queryUser,
    countUser,
    getCouple,
    queryCouple,
    countCouple
  },

  Mutation: {
    login,
    addUser,
    updateUser,
    deleteUser,
    addUserParent,
    addUserChild,
    addUserPartner,
    addCouple,
    updateCouple,
    deleteCouple
  }
}
