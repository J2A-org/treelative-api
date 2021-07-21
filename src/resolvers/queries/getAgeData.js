export default async (parent, args, context, info) => {
  const users = await context.prisma.user.findMany({
    select: { id: true, shortName: true, fullName: true, dateOfBirth: true }
  })

  const result = {}

  for (const user of users) {
    const birthYear = user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleString('default', { year: 'numeric' }) : null
    if (!birthYear) continue
    if (result[birthYear]) {
      result[birthYear] = [...result[birthYear], user]
    } else {
      result[birthYear] = [{ ...user, avatar: `https://${process.env.MINIO_ENDPOINT}/avatar/${user.id}.jpg` }]
    }
  }

  return result
}
