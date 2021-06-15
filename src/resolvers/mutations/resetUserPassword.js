import { isAdmin } from '../../utils/authorization'

import { hash } from 'bcryptjs'

import { PrismaSelect } from '@paljs/plugins'

export default async (parent, args, context, info) => {
  isAdmin(context)

  const { userID, password } = args

  const hashedPassword = await hash(password, 10)

  const { select } = new PrismaSelect(info).value

  const user = await context.prisma.user.update({
    where: { id: userID },
    data: { password: hashedPassword },
    select: { ...select, id: true }
  })

  return user
}
