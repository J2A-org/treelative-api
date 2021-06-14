import { isAdmin } from '../../utils/authorization'

import { PrismaSelect } from '@paljs/plugins'

export default async (parent, args, context, info) => {
  isAdmin(context)

  const { select } = new PrismaSelect(info).value

  const user = await context.prisma.user.delete({
    where: { id: args.userID },
    select: { ...select, id: true }
  })

  return user
}
