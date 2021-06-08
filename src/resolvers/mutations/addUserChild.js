export default async (parent, args, context, info) => {
  const user = await context.prisma.user.update({
    where: args.filter,
    data: {
      children: {
        connect: {
          ...args.input
        }
      }
    },
    include: { couple: true }
  })

  // if the user has a couple - add that couple as a parent to this child
  if (user.couple) {
    const { userOneID, userTwoID } = user.couple
    const userCoupleID = userOneID === user.id ? userTwoID : userOneID
    await context.prisma.user.update({
      where: { id: userCoupleID },
      data: {
        children: {
          connect: {
            ...args.input
          }
        }
      }
    })
  }

  return user
}
