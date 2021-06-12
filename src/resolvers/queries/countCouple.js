import { PrismaSelect } from '@paljs/plugins'

export default async (parent, args, context, info) => {
  const { select } = new PrismaSelect(info).value

  const couplesCount = await context.prisma.couple.count({
    ...args,
    select: { ...select, id: true }
  })

  return couplesCount.id
}
