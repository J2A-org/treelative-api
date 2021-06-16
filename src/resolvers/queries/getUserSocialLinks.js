import { PrismaSelect } from '@paljs/plugins'

export default async (parent, args, context, info) => {
  const { select } = new PrismaSelect(info).value

  const userSocialLinks = await context.prisma.user.findUnique({
    where: { id: parent.id }
  }).socialLinks({ select: { ...select, id: true } })

  return userSocialLinks
}
