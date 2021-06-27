export default async (parent, args, context, info) => {
  const users = await context.prisma.user.findMany({
    select: { id: true, shortName: true, role: true }
  })

  const couples = await context.prisma.couple.findMany({
    include: { userOne: { include: { children: { select: { id: true } } } } }
  })

  const nodeUsers = users.map(user => ({
    id: user.id,
    label: user.shortName,
    group: user.role === 'ADMIN' ? 'admin' : 'individual',
    image: `https://${process.env.MINIO_ENDPOINT}/avatar/${user.id}.jpg`
  }))

  const nodeCouples = couples.map(couple => ({
    id: couple.id,
    group: 'couple'
  }))

  const nodeEdges = couples.map(couple => (
    [
      { from: couple.userOneID, to: couple.id, group: 'child' },
      { from: couple.userTwoID, to: couple.id, group: 'child' },
      ...couple.userOne.children.map(child => (
        { from: couple.id, to: child.id, group: 'parent' }
      ))
    ]
  )).flat()

  // create a dataset with nodes & edges
  const nodes = [...nodeUsers, ...nodeCouples]
  const edges = [...nodeEdges]

  return { nodes, edges }
}
