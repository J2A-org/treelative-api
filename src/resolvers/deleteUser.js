export default async (parent, args, context, info) => {
  const user = await context.prisma.user.delete({
    where: args.filter
  })

  return user
}
