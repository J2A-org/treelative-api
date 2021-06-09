import { PrismaSelect } from '@paljs/plugins'

export default async (parent, args, context, info) => {
  const { select } = new PrismaSelect(info).value

  const coupleUserTwo = await context.prisma.user.findUnique({
    where: { id: parent.userTwoID },
    select: { ...select, id: true }
  })

  return coupleUserTwo
}
