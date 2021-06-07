import { JSONResolver, DateTimeResolver } from 'graphql-scalars'

const users = [
  {
    id: '123',
    title: 'The Awakening',
    author: 'Kate Chopin',
    dateOfBirth: '2020-05-05T04:30:20Z'
  },
  {
    id: '456',
    title: 'City of Glass',
    author: 'Paul Auster'
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
