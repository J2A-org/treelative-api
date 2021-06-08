export default async (parent, args, context, info) => {
  const coupleUserOne = await context.prisma.user.findUnique({
    where: { id: parent.userOneID }
  })

  return coupleUserOne
}
