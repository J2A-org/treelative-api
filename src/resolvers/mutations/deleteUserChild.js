import { isAdmin } from '../../utils/authorization'

import { PrismaSelect } from '@paljs/plugins'

export default async (parent, args, context, info) => {
  isAdmin(context)

  const { userID, childID } = args

  const { select } = new PrismaSelect(info).value

  const user = await context.prisma.user.update({
    where: { id: userID },
    data: {
      children: {
        disconnect: { id: childID }
      }
    },
    select: { ...select, id: true, couple: true }
  })

  // if the user has a couple - remove that couple as a parent to this child
  if (user.couple) {
    const { userOneID, userTwoID } = user.couple
    const userCoupleID = userOneID === user.id ? userTwoID : userOneID
    await context.prisma.user.update({
      where: { id: userCoupleID },
      data: {
        children: {
          disconnect: { id: childID }
        }
      },
      select: { id: true }
    })
  }

  return user
}
