import { PrismaSelect } from '@paljs/plugins'

export default async (parent, args, context, info) => {
  const { select } = new PrismaSelect(info).value

  // return user
  const userCouple = await context.prisma.couple.findUnique({
    where: { id: parent.id },
    include: {
      userOne: { select: { ...select, id: true } },
      userTwo: { select: { ...select, id: true } }
    }
  })

  return parent.partnerID === userCouple.userTwo.id ? userCouple.userOne : userCouple.userTwo
}
