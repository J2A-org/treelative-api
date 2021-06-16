export default async (parent, args, context, info) => {
  // only authenticated users can view this field's value

  if (!context.user) return null

  const field = info.path.key

  if (context.user.role === 'ADMIN') {
    return parent[field]
  }

  if (context.user.id === parent.id) {
    return parent[field]
  }

  const user = await context.prisma.user.findUnique({
    where: { id: parent.id },
    select: { settings: true }
  })

  if (!user.settings.privacy[field]) {
    return parent[field]
  }

  return null
}
