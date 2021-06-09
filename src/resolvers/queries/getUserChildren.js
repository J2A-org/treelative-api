import { PrismaSelect } from '@paljs/plugins'

export default async (parent, args, context, info) => {
  const { select } = new PrismaSelect(info).value

  const userChildren = await context.prisma.user.findUnique({
    where: { id: parent.id }
  }).children({ select: { ...select, id: true } })

  return userChildren
}
