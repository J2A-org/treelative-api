export default async (parent, args, context, info) => {
  const users = await context.models.User.find({}).lean()

  const result = {}

  for (const user of users) {
    const birthYear = user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().slice(0, 4) : null

    if (!birthYear) continue

    user.id = user._id
    user.avatar = `https://${process.env.MINIO_ENDPOINT}/avatar/${user._id}.jpg`
    user.brokenAvatar = `https://ui-avatars.com/api/?name=${user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`

    if (result[birthYear]) {
      result[birthYear] = [...result[birthYear], user]
    } else {
      result[birthYear] = [user]
    }
  }

  return result
}
