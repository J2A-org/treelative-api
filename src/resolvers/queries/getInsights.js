export default async (parent, args, context, info) => {
  const usersCount = await context.prisma.user.count({
    select: { id: true }
  })

  const couplesCount = await context.prisma.couple.count({
    select: { id: true }
  })

  return {
    users: usersCount.id,
    couples: couplesCount.id
  }
}
