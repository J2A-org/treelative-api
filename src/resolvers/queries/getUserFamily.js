import { ApolloError } from 'apollo-server'

import { PrismaSelect } from '@paljs/plugins'

export default async (parent, args, context, info) => {
  // only authenticated users can view list a user's available partners
  if (!context.user) {
    throw new ApolloError('You must be authenticated to perform this action', 'UNAUTHENTICATED')
  }

  const { userID } = args

  const { select } = new PrismaSelect(info).value

  const usersFamily = await context.prisma.user.findMany({
    where: {
      OR: [
        {
          children: {
            some: {
              id: userID
            }
          }
        },
        {
          parents: {
            some: {
              id: userID
            }
          }
        },
        {
          parents: {
            some: {
              children: {
                some: {
                  id: userID
                }
              }
            }
          }
        }
      ]
    },
    select: { ...select, id: true }
  })

  return usersFamily.filter(({ id }) => id !== userID)
}
