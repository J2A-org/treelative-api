export default async (parent, args, context, info) => {
  const users = await context.models.User.find({ currentLocation: { $ne: null } }).lean()

  const usersMap = users.map(user => ({
    id: user._id,
    shortName: user.shortName,
    fullName: user.fullName,
    image: `https://${process.env.MINIO_ENDPOINT}/avatar/${user._id}.jpg`,
    brokenImage: `https://ui-avatars.com/api/?name=${user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`,
    position: user.currentLocation.parsed.geometry.location
  }))

  return usersMap
}
