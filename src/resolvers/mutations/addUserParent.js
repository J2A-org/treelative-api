import { isAdmin } from '../../utils/authorization'

export default async (parent, args, context, info) => {
  isAdmin(context)

  const user = await context.prisma.user.update({
    where: args.user,
    data: {
      parents: {
        connect: {
          ...args.parent
        }
      }
    }
  })

  // if the parent has a couple - add that couple as a parent to this user
  const userParent = await context.prisma.user.findUnique({
    where: args.parent,
    include: { couple: true }
  })
  if (userParent.couple) {
    const { userOneID, userTwoID } = userParent.couple
    const userParentCoupleID = userOneID === userParent.id ? userTwoID : userOneID
    await context.prisma.user.update({
      where: args.user,
      data: {
        parents: {
          connect: { id: userParentCoupleID }
        }
      }
    })
  }

  return user
}
