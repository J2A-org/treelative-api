export default async (parent, args, context, info) => {
  const user = await context.prisma.user.update({
    where: args.filter,
    data: {
      children: {
        connect: {
          ...args.input
        }
      }
    }
  })

  return user
}
