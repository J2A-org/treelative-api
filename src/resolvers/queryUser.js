export default async (parent, args, context, info) => {
  const users = await context.prisma.user.findMany(args)

  return users
}
