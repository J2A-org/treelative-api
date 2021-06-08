export default async (parent, args, context, info) => {
  let userPartner = await context.prisma.couple.findUnique({
    where: {
      userOneID: parent.id
    }
  }).userTwo()

  if (!userPartner) {
    // try with userTwoID
    userPartner = await context.prisma.couple.findUnique({
      where: {
        userTwoID: parent.id
      }
    }).userOne()
  }

  return userPartner
}
