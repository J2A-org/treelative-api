export default async (parent, args, context, info) => {
  const users = await context.prisma.user.findMany({
    select: { id: true, shortName: true, fullName: true, role: true }
  })

  const couples = await context.prisma.couple.findMany({
    include: { userOne: { include: { children: { select: { id: true } } } } }
  })

  const nodeUsers = users.map(user => ({
    id: user.id,
    label: user.shortName,
    group: user.role === 'ADMIN' ? 'admin' : 'individual',
    image:
      user.id === '187e3fbf-347e-4e0d-9a82-b0b2cf2bc57f'
        ? 'https://res.cloudinary.com/arun99-dev/image/upload/v1624889786/adminNode_h3od6t.png'
        : user.id === '4105def9-79cb-4e4b-b653-e5f713c80682'
          ? 'https://res.cloudinary.com/arun99-dev/image/upload/v1624891187/admin2Node_lfsl37.png'
          : `https://${process.env.MINIO_ENDPOINT}/avatar/${user.id}.jpg`,
    brokenImage: `https://ui-avatars.com/api/?name=${user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`
  }))

  const nodeCouples = couples.map(couple => ({
    id: couple.id,
    group: 'couple'
  }))

  const nodeEdges = couples.map(couple => (
    [
      { from: couple.userOneID, to: couple.id, color: '#F10037' },
      { from: couple.userTwoID, to: couple.id, color: '#F10037' },
      ...couple.userOne.children.map(child => (
        { from: couple.id, to: child.id, color: '#07E901' }
      ))
    ]
  )).flat()

  // create a dataset with nodes & edges
  const nodes = [...nodeUsers, ...nodeCouples]
  const edges = [...nodeEdges]

  return { nodes, edges }
}
