import { isAdmin } from '../../utils/authorization'

export default async (parent, args, context, info) => {
  isAdmin(context)

  const couple = await context.prisma.couple.delete({
    where: args.filter
  })

  return couple
}
