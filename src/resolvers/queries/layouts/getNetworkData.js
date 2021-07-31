export default async (parent, args, context, info) => {
  const users = await context.models.User.find({}).populate('partner').lean()

  const nodeUsers = users.map(user => ({
    id: user._id,
    label: user.shortName,
    group: 'individual',
    image: `https://${process.env.MINIO_ENDPOINT}/avatar/${user._id}.jpg`,
    brokenImage: `https://ui-avatars.com/api/?name=${user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`
  }))

  const couplesMap = {}
  for (const user of users) {
    if (user.partner) {
      const coupleID = [user._id, user.partner._id].sort().join('-')
      if (!couplesMap[coupleID]) {
        couplesMap[coupleID] = {
          id: coupleID,
          group: 'couple',
          coupleOne: user,
          coupleTwo: user.partner,
          children: [...user.children, ...user.partner.children]
        }
      }
    }
  }

  const couples = Object.values(couplesMap)
  const nodeCouples = couples.map(couple => ({
    id: couple.id,
    group: 'couple'
  }))

  const nodeEdges = couples.map(couple => (
    [
      { from: couple.coupleOne._id, to: couple.id, color: '#F10037' },
      { from: couple.coupleTwo._id, to: couple.id, color: '#F10037' },
      ...couple.children.map(child => (
        { from: couple.id, to: child._id.toString(), color: '#07E901' }
      ))
    ]
  )).flat()

  // create a dataset with nodes & edges
  const nodes = [...nodeUsers, ...nodeCouples]
  const edges = [...nodeEdges]

  return { nodes, edges }
}
