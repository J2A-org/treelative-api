export default async (parent, args, context, info) => {
  const couple = await context.prisma.couple.findUnique({
    where: args.filter
  })

  return couple
}
