export default async (parent, args, context, info) => {
  const users = await context.prisma.user.findMany({
    where: {
      partner_id: { not: null }
    },
    include: {
      partner: true
    }
  })

  const couples = {}

  users.forEach(user => {
    const coupleID = [user.id, user.partner.id].sort().join('-')
    couples[coupleID] = {
      id: coupleID,
      partner1: user,
      partner2: user.partner,
      dateOfMarriage: user.dateOfMarriage,
      marriageLocation: user.marriageLocation
    }
  })

  return Object.values(couples)
}
