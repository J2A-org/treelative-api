// calculate the age in years given a date of birth
const calculateAge = (birthday) => {
  const today = new Date()
  const birthDate = new Date(birthday)
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

export default async (parent, args, context, info) => {
  const users = await context.prisma.user.findMany({
    select: { id: true, shortName: true, fullName: true, dateOfBirth: true }
  })

  const result = {}

  for (const user of users) {
    const birthMonthDay = user.dateOfBirth ? user.dateOfBirth.toISOString().slice(5, 10) : null

    if (!birthMonthDay) continue

    user.avatar = `https://${process.env.MINIO_ENDPOINT}/avatar/${user.id}.jpg`
    user.brokenAvatar = `https://ui-avatars.com/api/?name=${user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`
    user.age = calculateAge(user.dateOfBirth)

    if (result[birthMonthDay]) {
      result[birthMonthDay] = [...result[birthMonthDay], user]
    } else {
      result[birthMonthDay] = [user]
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

  return orderedResult
}
