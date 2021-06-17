import { isAdmin } from '../../utils/authorization'

import { PrismaSelect } from '@paljs/plugins'

export default async (parent, args, context, info) => {
  isAdmin(context)

  const { select } = new PrismaSelect(info).value

  const deletingUser = await context.prisma.user.findUnique({
    where: { id: args.userID },
    select: { ...select, id: true, coupleID: true }
  })

  if (deletingUser.coupleID) {
    // delete the couple
    await context.prisma.couple.delete({
      where: { id: deletingUser.coupleID },
      select: { id: true }
    })
  }

  const user = await context.prisma.user.delete({
    where: { id: args.userID },
    select: { ...select, id: true }
  })

  return user
}
