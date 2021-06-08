export default async (parent, args, context, info) => {
  const user = await context.prisma.user.update({
    where: args.filter,
    data: {
      parents: {
        connect: {
          ...args.input
        }
      }
    }
  })

  // if the parent has a couple - add that couple as a parent to this user
  const userParent = await context.prisma.user.findUnique({
    where: args.input,
    include: { couple: true }
  })
  if (userParent.couple) {
    const { userOneID, userTwoID } = userParent.couple
    const userParentCoupleID = userOneID === userParent.id ? userTwoID : userOneID
    await context.prisma.user.update({
      where: args.filter,
      data: {
        parents: {
          connect: { id: userParentCoupleID }
        }
      }
    })
  }

  return user
}
