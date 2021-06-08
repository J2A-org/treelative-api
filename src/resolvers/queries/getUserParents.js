export default async (parent, args, context, info) => {
  const userParents = await context.prisma.user.findUnique({
    where: { id: parent.id }
  }).parents()

  return userParents
}
