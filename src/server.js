import { PrismaClient } from '@prisma/client'

import { ApolloServer } from 'apollo-server'
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled
} from 'apollo-server-core'

import typeDefs from './schema'
import resolvers from './resolvers'

import { authenticateUserToken } from './utils/authentication'

const isDev = process.env.NODE_ENV !== 'production'

// Initialize prisma client
const prisma = new PrismaClient({
  log: isDev ? [{ emit: 'event', level: 'query' }] : []
})

// Log all prisma queries during development
isDev && prisma.$on('query', console.log)

export default new ApolloServer({
  typeDefs,
  resolvers,
  tracing: isDev,
  plugins: [
    process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageGraphQLPlayground()
  ],
  context: async ({ req }) => {
    // authenticate the user (if auth header is present) and add to context
    const user = await authenticateUserToken(req, prisma)
    // also add prisma to the context
    return {
      user,
      prisma
    }
  }
})
