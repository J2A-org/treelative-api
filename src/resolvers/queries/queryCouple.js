import { PrismaSelect } from '@paljs/plugins'

export default async (parent, args, context, info) => {
  const { userOne, userTwo, ...select } = new PrismaSelect(info).value.select

  const couples = await context.prisma.couple.findMany({
    ...args,
    select: { ...select, userOneID: Boolean(userOne), userTwoID: Boolean(userTwo) }
  })

  return couples
}
