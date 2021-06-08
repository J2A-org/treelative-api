export default async (parent, args, context, info) => {
  const userChildren = await context.prisma.user.findUnique({
    where: { id: parent.id }
  }).children()

  return userChildren
}
