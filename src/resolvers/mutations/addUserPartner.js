export default async (parent, args, context, info) => {
  const coupleUser1 = await context.prisma.couple.create({
    data: {
      user1: {
        connect: args.filter
      },
      user2: {
        connect: args.input
      }
    }
  }).user1()

  // const user = await context.prisma.user.update({
  //   where: args.filter,
  //   data: {
  //     partner: {
  //       connect: {
  //         ...args.input
  //       }
  //     }
  //   }
  // })

  // await context.prisma.user.update({
  //   where: args.input,
  //   data: {
  //     partner: {
  //       connect: {
  //         ...args.filter
  //       }
  //     }
  //   }
  // })

  return coupleUser1
}
