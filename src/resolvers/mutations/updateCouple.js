export default async (parent, args, context, info) => {
  const couple = await context.prisma.couple.update({
    where: args.filter,
    data: args.input
  })

  return couple
}
