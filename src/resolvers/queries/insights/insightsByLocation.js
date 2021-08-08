export default async (parent, args, context, info) => {
  const users = await context.models.User.find({}, 'currentLocation').lean()

  const groupByCountry = {}

  const countryCodeMap = {}

  for (const user of users) {
    const country = user.currentLocation ? user.currentLocation.suggested.terms.pop().value : 'Unknown'

    if (user.currentLocation) {
      const countryInfo = user.currentLocation.parsed.address_components.find(({ types }) => types.includes('country'))
      if (countryInfo) {
        countryCodeMap[country] = countryInfo.short_name
      }
    }

    groupByCountry[country] = (groupByCountry[country] || 0) + 1
  }

  const orderedResult = Object.keys(groupByCountry).sort((a, b) => {
    if (groupByCountry[a] > groupByCountry[b]) {
      return -1
    } else if (groupByCountry[a] < groupByCountry[b]) {
      return 1
    } else {
      return 0
    }
  }).reduce(
    (obj, key) => {
      obj[key] = groupByCountry[key]
      return obj
    },
    {}
  )

  return Object.entries(orderedResult).map(([key, value]) => ({ country: key, count: value, code: countryCodeMap[key] }))
}
