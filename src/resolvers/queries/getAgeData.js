export default async (parent, args, context, info) => {
  const users = await context.prisma.user.findMany({
    select: { id: true, shortName: true, fullName: true, avatar: true, dateOfBirth: true }
  })

  const result = {}

  for (const user of users) {
    const birthYear = user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleString('default', { year: 'numeric' }) : '0000'
    if (result[birthYear]) {
      result[birthYear] = [...result[birthYear], user]
    } else {
      result[birthYear] = [user]
    }
  }

  return result
}
