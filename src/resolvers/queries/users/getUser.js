export default async (parent, args, context, info) => {
  const user = await context.models.User.findOne({ _id: args.id }).lean()

  return user
}
