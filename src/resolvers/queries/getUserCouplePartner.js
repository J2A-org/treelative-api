import { PrismaSelect } from '@paljs/plugins'

export default async (parent, args, context, info) => {
  const { select } = new PrismaSelect(info).value

  let userCouple = await context.prisma.couple.findUnique({
    where: { id: parent.id }
  }).userTwo({ select: { ...select, id: true } })

  if (!userCouple || userCouple.id === parent.partnerID) {
    // try with userTOne
    userCouple = await context.prisma.couple.findUnique({
      where: { id: parent.id }
    }).userOne({ select: { ...select, id: true } })
  }

  return userCouple
}
