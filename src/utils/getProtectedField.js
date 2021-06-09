export default (parent, args, context, info) => {
  // only authenticated users can view this field's value

  if (!context.user) return null

  const field = info.path.key

  return parent[field]
}
