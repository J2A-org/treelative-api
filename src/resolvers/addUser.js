import { hash } from 'bcryptjs'

export default async (parent, args, context, info) => {
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
