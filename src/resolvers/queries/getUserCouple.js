import { PrismaSelect } from '@paljs/plugins'

export default async (parent, args, context, info) => {
  const { user, ...select } = new PrismaSelect(info).value.select

  const userCouple = await context.prisma.user.findUnique({
    where: { id: parent.id }
  }).couple({ select: { ...select, id: true } })

  if (!userCouple) return null

  return {
    ...userCouple,
    partnerID: parent.id
  }
}
