import { isAdmin } from '../../utils/authorization'

export default async (parent, args, context, info) => {
  isAdmin(context)

  // create the couple
  const couple = await context.prisma.couple.create({
    data: {
      userOne: {
        connect: args.user
      },
      userTwo: {
        connect: args.partner
      }
    }
  })

  // connect the couple to userOne
  const userOne = await context.prisma.user.update({
    where: args.user,
    data: {
      couple: {
        connect: {
          id: couple.id
        }
      }
    }
  })

  // connect the couple to userTwo
  await context.prisma.user.update({
    where: args.partner,
    data: {
      couple: {
        connect: {
          id: couple.id
        }
      }
    }
  })

  return userOne
}
