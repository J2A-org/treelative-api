export default async (parent, args, context, info) => {
  const usersCount = await context.prisma.user.count({
    ...args,
    select: { id: true }
  })

  return usersCount.id
}
