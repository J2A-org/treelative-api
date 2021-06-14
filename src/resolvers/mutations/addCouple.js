import { isAdmin } from '../../utils/authorization'

import { PrismaSelect } from '@paljs/plugins'

export default async (parent, args, context, info) => {
  isAdmin(context)

  const { userOne, userTwo, ...select } = new PrismaSelect(info).value.select

  const { userOneID, userTwoID, ...rest } = args.input

  // create the couple
  const couple = await context.prisma.couple.create({
    data: {
      ...rest,
      userOne: {
        connect: { id: userOneID }
      },
      userTwo: {
        connect: { id: userTwoID }
      }
    },
    select: { ...select, id: true, userOneID: Boolean(userOne), userTwoID: Boolean(userTwo) }
  })

  // connect the couple to users
  await context.prisma.user.updateMany({
    where: { id: { in: [userOneID, userTwoID] } },
    data: {
      coupleID: couple.id
    }
  })

  return couple
}
