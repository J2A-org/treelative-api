import server from './src/server.js'

const PORT = process.env.PORT || 7001

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
