import { gql } from 'apollo-server'

import fs from 'fs'
import path from 'path'

const loadGraphQL = (filePath) => {
  const file = fs.readFileSync(path.join(process.env.PWD, 'src', 'schema', filePath), 'utf-8')
  return gql`${file}`
}

export default [
  loadGraphQL('objects.graphql'),
  loadGraphQL('queries.graphql'),
  loadGraphQL('mutations.graphql')
]
