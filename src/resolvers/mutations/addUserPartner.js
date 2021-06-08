export default async (parent, args, context, info) => {
  // create the couple
  const couple = await context.prisma.couple.create({
    data: {
      userOne: {
        connect: args.filter
      },
      userTwo: {
        connect: args.input
      }
    }
  })

  // connect the couple to userOne
  const userOne = await context.prisma.user.update({
    where: args.filter,
    data: {
      couple: {
        connect: {
          id: couple.id
        }
      }
    }
  })

  // connect the couple to userTwo
  await context.prisma.user.update({
    where: args.input,
    data: {
      couple: {
        connect: {
          id: couple.id
        }
      }
    }
  })

  return userOne
}
