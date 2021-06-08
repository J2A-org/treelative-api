export default async (parent, args, context, info) => {
  let userCouple = await context.prisma.couple.findUnique({
    where: {
      userOneID: parent.id
    },
    include: { userTwo: true }
  })

  if (!userCouple) {
    // try with userTwoID
    userCouple = await context.prisma.couple.findUnique({
      where: {
        userTwoID: parent.id
      },
      include: { userOne: true }
    })
  }

  if (userCouple) {
    return {
      ...userCouple,
      user: userCouple.userOne || userCouple.userTwo
    }
  } else {
    return null
  }
}
