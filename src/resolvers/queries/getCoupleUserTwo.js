export default async (parent, args, context, info) => {
  const coupleUserTwo = await context.prisma.user.findUnique({
    where: { id: parent.userTwoID }
  })

  return coupleUserTwo
}
