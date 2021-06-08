export default async (parent, args, context, info) => {
  const userPartner = await context.prisma.user.findUnique({
    where: { id: parent.id }
  }).partner()

  return userPartner
}
