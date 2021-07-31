export default async (parent, args, context, info) => {
  const users = await context.models.User.find({}).lean()

  const nodeUsers = users.map(user => ({
    id: user._id,
    label: user.shortName,
    group: 'individual',
    image: `https://${process.env.MINIO_ENDPOINT}/avatar/${user._id}.jpg`,
    brokenImage: `https://ui-avatars.com/api/?name=${user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`
  }))

  // const couples = []
  // const nodeCouples = couples.map(couple => ({
  //   id: couple.id,
  //   group: 'couple'
  // }))

  // const nodeEdges = couples.map(couple => (
  //   [
  //     { from: couple.userOneID, to: couple.id, color: '#F10037' },
  //     { from: couple.userTwoID, to: couple.id, color: '#F10037' },
  //     ...couple.userOne.children.map(child => (
  //       { from: couple.id, to: child.id, color: '#07E901' }
  //     ))
  //   ]
  // )).flat()

  // create a dataset with nodes & edges
  const nodes = [...nodeUsers]
  const edges = []

  return { nodes, edges }
}
