export default async (parent, args, context, info) => {
  const couple = await context.prisma.couple.delete({
    where: args.filter
  })

  return couple
}
