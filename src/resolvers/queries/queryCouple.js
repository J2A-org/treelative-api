export default async (parent, args, context, info) => {
  const couples = await context.prisma.couple.findMany(args)

  return couples
}
