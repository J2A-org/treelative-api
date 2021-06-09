import { PrismaSelect } from '@paljs/plugins'

export default async (parent, args, context, info) => {
  const { select } = new PrismaSelect(info).value

  const users = await context.prisma.user.findMany({
    ...args,
    select: { ...select, id: true }
  })

  return users
}
