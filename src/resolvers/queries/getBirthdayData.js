export default async (parent, args, context, info) => {
  const users = await context.prisma.user.findMany({
    select: { id: true, shortName: true, fullName: true, dateOfBirth: true }
  })

  const result = {}

  for (const user of users) {
    const birthYear = user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString('default', { month: 'short', day: 'numeric' }) : null
    if (!birthYear) continue
    if (result[birthYear]) {
      result[birthYear] = [...result[birthYear], user]
    } else {
      result[birthYear] = [user]
    }
  }

  const orderedResult = Object.keys(result).sort((a, b) => {
    a = new Date(a)
    b = new Date(b)
    if (a > b) {
      return 1
    } else if (a < b) {
      return -1
    } else {
      return 0
    }
  }).reduce(
    (obj, key) => {
      obj[key] = result[key]
      return obj
    },
    {}
  )

  console.log(orderedResult)

  return orderedResult
}
