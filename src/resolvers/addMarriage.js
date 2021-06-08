// export default async (parent, args, context, info) => {
//   const marriage = await context.prisma.user.update({
//     where: args.couple1,
//     data: {
//       marriage: {
//         create: {
//           ...args.input
//         }
//       }
//     }
//   }).marriage()

//   await context.prisma.user.update({
//     where: args.couple2,
//     data: {
//       marriage: {
//         connect: {
//           id: marriage.id
//         }
//       }
//     }
//   })

//   return marriage
// }

export default async (parent, args, context, info) => {
  const marriage = await context.prisma.marriage.create({
    data: {
      ...args.input,
      couples: {
        connect: [args.couple1, args.couple2]
      }
    }
  })

  return marriage
}
