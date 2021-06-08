export default async (parent, args, context, info) => {
  const coupleUser2 = await context.prisma.user.findUnique({
    where: { id: parent.user2_id }
  })

  return coupleUser2
}
