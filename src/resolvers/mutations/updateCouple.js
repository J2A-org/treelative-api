import { isAdmin } from '../../utils/authorization'

import { PrismaSelect } from '@paljs/plugins'

export default async (parent, args, context, info) => {
  isAdmin(context)

  const { userOne, userTwo, ...select } = new PrismaSelect(info).value.select

  const couple = await context.prisma.couple.update({
    where: { id: args.coupleID },
    data: args.input,
    select: { ...select, id: true, userOneID: Boolean(userOne), userTwoID: Boolean(userTwo) }
  })

  return couple
}
