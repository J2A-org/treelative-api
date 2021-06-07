export default async (parent, args, context, info) => {
  const user = await context.prisma.user.findUnique({
    where: args.filter
  })

  return user
}
