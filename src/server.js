import mongoose from 'mongoose'
import models from './models'

import { ApolloServer } from 'apollo-server'
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled
} from 'apollo-server-core'

import typeDefs from './schema'
import resolvers from './resolvers'

import { authenticateUserToken } from './utils/authentication'

const isDev = process.env.NODE_ENV !== 'production'

// Initialize mongoose client
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})

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
    const user = await authenticateUserToken(req, models)
    // also add mongoose models to the context
    return {
      user,
      models
    }
  }
})
