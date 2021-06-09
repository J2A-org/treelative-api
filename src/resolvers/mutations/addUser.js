import { isAdmin } from '../../utils/authorization'

import { hash } from 'bcryptjs'

export default async (parent, args, context, info) => {
  isAdmin(context)

  const { password, ...rest } = args.input

  const hashedPassword = await hash(password, 10)

  const user = await context.prisma.user.create({
    data: {
      password: hashedPassword,
      ...rest
    }
  })

  return user
}
