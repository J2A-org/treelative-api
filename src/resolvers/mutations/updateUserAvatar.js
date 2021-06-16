import { ApolloError } from 'apollo-server'

import { isAdmin } from '../../utils/authorization'

import minioClient from '../../utils/minioClient'

export default async (parent, args, context, info) => {
  isAdmin(context)

  const user = await context.prisma.user.findUnique({
    where: { id: args.userID },
    select: { id: true }
  })

  if (!user) {
    throw new ApolloError('No such user exists', 'FORBIDDEN')
  }

  // expires in 60 secs
  const presignedUrl = minioClient.presignedPutObject('avatar', `${args.userID}.jpg`, 60)

  return presignedUrl
}
