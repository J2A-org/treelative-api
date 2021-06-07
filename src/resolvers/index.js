import { JSONResolver, DateTimeResolver } from 'graphql-scalars'

import getUser from './getUser'
import queryUser from './queryUser'

import addUser from './addUser'
import updateUser from './updateUser'
import deleteUser from './deleteUser'

export default {
  JSON: JSONResolver,
  DateTime: DateTimeResolver,

  Query: {
    getUser,
    queryUser
  },

  Mutation: {
    addUser,
    updateUser,
    deleteUser
  }
}
