export default async (parent, args, context, info) => {
  const userCouples = await context.prisma.couple.findMany({
    where: {
      OR: [
        { user1_id: parent.id },
        { user2_id: parent.id }
      ]
    },
    include: { user1: true, user2: true }
  })

  const userPartners = userCouples.map(({ user1, user2 }) => user1.id === parent.id ? user2 : user1)

  return userPartners
}
