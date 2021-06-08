export default async (parent, args, context, info) => {
  const userCouples = await context.prisma.couple.findMany({
    where: {
      OR: [
        { userOneID: parent.id },
        { userTwoID: parent.id }
      ]
    },
    include: { userOne: true, userTwo: true }
  })

  const userPartners = userCouples.map(({ userOne, userTwo }) => userOne.id === parent.id ? userTwo : userOne)

  return userPartners
}
