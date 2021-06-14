export default async (parent, args, context, info) => {
  const couplesCount = await context.prisma.couple.count({
    ...args,
    select: { id: true }
  })

  return couplesCount.id
}
