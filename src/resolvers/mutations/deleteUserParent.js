import { isAdmin } from '../../utils/authorization'

import { PrismaSelect } from '@paljs/plugins'

export default async (parent, args, context, info) => {
  isAdmin(context)

  const { userID, parentID } = args

  const { select } = new PrismaSelect(info).value

  const user = await context.prisma.user.update({
    where: { id: userID },
    data: {
      parents: {
        disconnect: { id: parentID }
      }
    },
    select: { ...select, id: true }
  })

  // if the parent has a couple - remove that couple as a parent to this user
  const userParent = await context.prisma.user.findUnique({
    where: { id: args.parentID },
    include: { couple: true }
  })

  if (userParent.couple) {
    const { userOneID, userTwoID } = userParent.couple
    const userParentCoupleID = userOneID === userParent.id ? userTwoID : userOneID
    await context.prisma.user.update({
      where: { id: userID },
      data: {
        parents: {
          disconnect: { id: userParentCoupleID }
        }
      },
      select: { id: true }
    })
  }

  return user
}
