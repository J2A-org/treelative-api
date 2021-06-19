import { isAdmin } from '../../utils/authorization'

import { hash } from 'bcryptjs'

import { PrismaSelect } from '@paljs/plugins'

export default async (parent, args, context, info) => {
  isAdmin(context)

  const username = args.input.fullName.trim().replace(' ', '_')

  const password = await hash('123', 10)

  const { select } = new PrismaSelect(info).value

  const user = await context.prisma.user.create({
    data: {
      username,
      password,
      ...args.input
    },
    select: { ...select, id: true }
  })

  return user
}
