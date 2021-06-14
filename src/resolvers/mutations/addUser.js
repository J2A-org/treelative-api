import { isAdmin } from '../../utils/authorization'

import { hash } from 'bcryptjs'

import { PrismaSelect } from '@paljs/plugins'

export default async (parent, args, context, info) => {
  isAdmin(context)

  const { password, ...rest } = args.input

  const hashedPassword = await hash(password, 10)

  const { select } = new PrismaSelect(info).value

  const user = await context.prisma.user.create({
    data: {
      password: hashedPassword,
      ...rest
    },
    select: { ...select, id: true }
  })

  return user
}
