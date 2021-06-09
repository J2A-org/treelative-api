import { PrismaSelect } from '@paljs/plugins'

export default async (parent, args, context, info) => {
  const { select } = new PrismaSelect(info).value

  const userParents = await context.prisma.user.findUnique({
    where: { id: parent.id }
  }).parents({ include: { children: { select: { ...select, id: true } } }, take: 1 })

  if (userParents.length > 0) {
    const userParentsChildrenExceptMe = userParents[0].children.filter(({ id }) => id !== parent.id)
    return userParentsChildrenExceptMe
  } else {
    return []
  }
}
