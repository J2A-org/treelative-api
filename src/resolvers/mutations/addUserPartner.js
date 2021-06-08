export default async (parent, args, context, info) => {
  const user = await context.prisma.user.update({
    where: args.filter,
    data: {
      partner: {
        connect: {
          ...args.input
        }
      }
    }
  })

  await context.prisma.user.update({
    where: args.input,
    data: {
      partner: {
        connect: {
          ...args.filter
        }
      }
    }
  })

  return user
}
