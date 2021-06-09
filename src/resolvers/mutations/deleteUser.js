import { isAdmin } from '../../utils/authorization'

export default async (parent, args, context, info) => {
  isAdmin(context)

  const user = await context.prisma.user.delete({
    where: args.filter
  })

  return user
}
