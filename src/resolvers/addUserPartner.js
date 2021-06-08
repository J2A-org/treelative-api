export default async (parent, args, context, info) => {
  const marriage = await context.prisma.user.update({
    where: args.filter,
    data: {
      partner: {
        connect: {
          ...args.input
        }
      }
    }
  })

  return marriage
}
