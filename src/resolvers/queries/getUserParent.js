export default async (parent, args, context, info) => {
  const userParent = await context.prisma.user.findUnique({
    where: { id: parent.id }
  }).parent()

  return userParent
}
