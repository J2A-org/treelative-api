export default async (parent, args, context, info) => {
  const marriage = await context.prisma.marriage.findUnique({
    where: args.filter
  })

  return marriage
}
