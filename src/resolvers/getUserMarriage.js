export default async (parent, args, context, info) => {
  const userMarriage = await context.prisma.user.findUnique({
    where: { id: parent.id }
  }).marriage()

  return userMarriage
}
