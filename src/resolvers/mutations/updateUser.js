export default async (parent, args, context, info) => {
  const user = await context.prisma.user.update({
    where: args.filter,
    data: args.input
  })

  return user
}
