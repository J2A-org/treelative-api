import { PrismaSelect } from '@paljs/plugins'

export default async (parent, args, context, info) => {
  const { select } = new PrismaSelect(info).value

  const coupleUserOne = await context.prisma.user.findUnique({
    where: { id: parent.userOneID },
    select: { ...select, id: true }
  })

  return coupleUserOne
}
