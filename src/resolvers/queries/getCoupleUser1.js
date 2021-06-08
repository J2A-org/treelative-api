export default async (parent, args, context, info) => {
  const coupleUser1 = await context.prisma.user.findUnique({
    where: { id: parent.user1_id }
  })

  return coupleUser1
}
