import { PrismaSelect } from '@paljs/plugins'

export default async (parent, args, context, info) => {
  const { select } = new PrismaSelect(info).value

  const userParents = await context.prisma.user.findUnique({
    where: { id: parent.id }
  }).parents({ select: { ...select, id: true } })

  return userParents
}
