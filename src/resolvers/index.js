import { JSONResolver, DateTimeResolver } from 'graphql-scalars'

import getUser from './getUser'
import queryUser from './queryUser'

import addUser from './addUser'
import updateUser from './updateUser'
import deleteUser from './deleteUser'

import getUserPartner from './getUserPartner'
import addUserPartner from './addUserPartner'

import getMarriage from './getMarriage'
import queryMarriage from './queryMarriage'
import addMarriage from './addMarriage'
import getUserMarriage from './getUserMarriage'
import getMarriageCouples from './getMarriageCouples'

export default {
  JSON: JSONResolver,
  DateTime: DateTimeResolver,

  User: {
    partner: getUserPartner,
    marriage: getUserMarriage
  },

  Marriage: {
    couples: getMarriageCouples
  },

  Query: {
    getUser,
    queryUser,
    getMarriage,
    queryMarriage
  },

  Mutation: {
    addUser,
    updateUser,
    deleteUser,
    addUserPartner,
    addMarriage
  }
}
