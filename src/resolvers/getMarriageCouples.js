export default async (parent, args, context, info) => {
  const marriageCouples = await context.prisma.marriage.findUnique({
    where: { id: parent.id }
  }).couples()

  return marriageCouples
}
