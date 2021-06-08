export default async (parent, args, context, info) => {
  const { userOne, userTwo, ...rest } = args
  // create the couple
  const couple = await context.prisma.couple.create({
    data: {
      ...rest,
      userOne: {
        connect: userOne
      },
      userTwo: {
        connect: userTwo
      }
    }
  })

  // connect the couple to userOne
  await context.prisma.user.update({
    where: userOne,
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
    where: userTwo,
    data: {
      couple: {
        connect: {
          id: couple.id
        }
      }
    }
  })

  return couple
}
