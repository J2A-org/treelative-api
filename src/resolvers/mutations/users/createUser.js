import { hash } from 'bcryptjs'

export default async (parent, args, context, info) => {
  const username = args.input.fullName.trim().replace(' ', '_')
  const password = await hash('123', 10)

  const user = await context.models.User.create({
    ...args.input,
    username,
    password
  })

  return user
}
