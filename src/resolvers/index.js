import { JSONResolver, DateTimeResolver } from 'graphql-scalars'

const users = [
  {
    id: '123',
    username: 'The Awakening',
    fullName: 'Kate Chopin',
    dateOfBirth: '2020-05-05T04:30:20Z'
  },
  {
    id: '456',
    username: 'City of Glass',
    fullName: 'Paul Auster'
  }
]

export default {
  JSON: JSONResolver,
  DateTime: DateTimeResolver,

  Query: {
    getUser: () => users[0],
    queryUser: () => users
  },
  Mutation: {
    addUser: () => users,
    updateUser: () => users,
    deleteUser: () => ['123']
  }
}
