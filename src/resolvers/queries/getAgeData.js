export default async (parent, args, context, info) => {
  const users = await context.prisma.user.findMany({
    select: { id: true, shortName: true, fullName: true, dateOfBirth: true, dateOfDeath: true }
  })

  const result = {}

  for (const user of users) {
    const birthYear = user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().slice(0, 4) : null

    if (!birthYear) continue

    user.avatar = `https://${process.env.MINIO_ENDPOINT}/avatar/${user.id}.jpg`
    user.brokenAvatar = `https://ui-avatars.com/api/?name=${user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`

    if (result[birthYear]) {
      result[birthYear] = [...result[birthYear], user]
    } else {
      result[birthYear] = [user]
    }
  }

  return result
}
