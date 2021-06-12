import { PrismaSelect } from '@paljs/plugins'

export default async (parent, args, context, info) => {
  const { select } = new PrismaSelect(info).value

  const usersCount = await context.prisma.user.count({
    ...args,
    select: { ...select, id: true }
  })

  return usersCount.id
}
