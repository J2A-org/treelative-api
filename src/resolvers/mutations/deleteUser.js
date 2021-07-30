import { isAdmin } from '../../utils/authorization'

export default async (parent, args, context, info) => {
  isAdmin(context)

  const response = await context.models.User.deleteOne(
    { _id: args.userID }
  )

  return response.ok === 1
}
