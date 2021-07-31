import fuzzySearch from '../../../utils/fuzzySearch'

export default async (parent, args, context, info) => {
  const users = await context.models.User.find({
    $or: fuzzySearch(args.query)
  }).limit(5).lean()

  return users
}
