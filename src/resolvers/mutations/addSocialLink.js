import { isAdmin } from '../../utils/authorization'

import { PrismaSelect } from '@paljs/plugins'

export default async (parent, args, context, info) => {
  isAdmin(context)

  const { user, ...select } = new PrismaSelect(info).value.select

  // create the socialLink
  const socialLink = await context.prisma.socialLink.create({
    data: args.input,
    select: { ...select, id: true, userID: Boolean(user) }
  })

  return socialLink
}
