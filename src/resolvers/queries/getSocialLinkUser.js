import { PrismaSelect } from '@paljs/plugins'

export default async (parent, args, context, info) => {
  const { select } = new PrismaSelect(info).value

  const socialLinkUser = await context.prisma.user.findUnique({
    where: { id: parent.userID },
    select: { ...select, id: true }
  })

  return socialLinkUser
}
