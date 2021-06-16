import { isAdmin } from '../../utils/authorization'

import { PrismaSelect } from '@paljs/plugins'

export default async (parent, args, context, info) => {
  isAdmin(context)

  const { select } = new PrismaSelect(info).value

  const socialLink = await context.prisma.socialLink.update({
    where: { id: args.socialLinkID },
    data: args.input,
    select: { ...select, id: true }
  })

  return socialLink
}
