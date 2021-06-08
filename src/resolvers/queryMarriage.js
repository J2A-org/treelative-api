export default async (parent, args, context, info) => {
  const marriages = await context.prisma.marriage.findMany(args)

  return marriages
}
