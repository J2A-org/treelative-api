import { ApolloError } from 'apollo-server'

import { isOwner } from '../../utils/authorization'

import minioClient from '../../utils/minioClient'

export default async (parent, args, context, info) => {
  if (!isOwner(context, args.userID)) {
    throw new ApolloError('You are not authorized to perform this action', 'UNAUTHORIZED')
  }

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
