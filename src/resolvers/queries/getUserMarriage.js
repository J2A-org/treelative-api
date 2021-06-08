export default async (parent, args, context, info) => {
  let userCouple = await context.prisma.couple.findUnique({
    where: {
      userOneID: parent.id
    }
  })

  if (!userCouple) {
    // try with userTwoID
    userCouple = await context.prisma.couple.findUnique({
      where: {
        userTwoID: parent.id
      }
    })
  }

  return userCouple
}
