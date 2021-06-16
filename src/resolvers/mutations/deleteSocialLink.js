import { isAdmin } from '../../utils/authorization'

import { PrismaSelect } from '@paljs/plugins'

export default async (parent, args, context, info) => {
  isAdmin(context)

  const { select } = new PrismaSelect(info).value

  const socialLink = await context.prisma.socialLink.delete({
    where: { id: args.socialLinkID },
    select: { ...select, id: true }
  })

  return socialLink
}
