import { ApolloServer } from 'apollo-server'

import typeDefs from './schema/index.js'
import resolvers from './resolvers/index.js'

export default new ApolloServer({ typeDefs, resolvers })
