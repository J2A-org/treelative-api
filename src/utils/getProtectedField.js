export default (parent, args, context, info) => {
  const authUser = context.user

  if (!authUser) return null

  const field = info.path.key

  if (authUser.role === 'ADMIN') {
    return parent[field]
  } else if (authUser.id === parent.id) {
    return parent[field]
  } else {
    return null
  }
}
