import { JSONResolver, DateTimeResolver } from 'graphql-scalars'

import login from './mutations/login'
import loginWithProvider from './mutations/loginWithProvider'
import resetUserPassword from './mutations/resetUserPassword'

import whoAmI from './queries/whoAmI'

import createUser from './mutations/createUser'
import deleteUser from './mutations/deleteUser'

import updateUserGeneral from './mutations/updateUserGeneral'
import updateUserSocial from './mutations/updateUserSocial'
import updateUserAvatar from './mutations/updateUserAvatar'

import addUserParent from './mutations/addUserParent'
import addUserChild from './mutations/addUserChild'
import addUserPartner from './mutations/addUserPartner'

import removeUserParent from './mutations/removeUserParent'
import removeUserChild from './mutations/removeUserChild'
import removeUserPartner from './mutations/removeUserPartner'

import getUser from './queries/getUser'
import getUserPartner from './queries/getUserPartner'
import getUserParents from './queries/getUserParents'
import getUserChildren from './queries/getUserChildren'

import searchUsers from './queries/searchUsers'

import countUsers from './queries/countUsers'
import countCouples from './queries/countCouples'

import suggestParents from './queries/suggestParents'
import suggestChildren from './queries/suggestChildren'
import suggestPartners from './queries/suggestPartners'
import suggestLocations from './queries/suggestLocations'

import getNetworkData from './queries/getNetworkData'
import getMapData from './queries/getMapData'
import getAgeData from './queries/getAgeData'
import getBirthdayData from './queries/getBirthdayData'

export default {
  JSON: JSONResolver,
  DateTime: DateTimeResolver,

  User: {
    id: parent => parent._id.toString(),
    partner: getUserPartner,
    parents: getUserParents,
    children: getUserChildren
  },

  Query: {
    healthCheck: () => 'Welcome to Treelative API',
    whoAmI,
    getUser,
    searchUsers,
    countUsers,
    countCouples,
    suggestParents,
    suggestChildren,
    suggestPartners,
    suggestLocations,
    getNetworkData,
    getMapData,
    getAgeData,
    getBirthdayData
  },

  Mutation: {
    login,
    loginWithProvider,
    resetUserPassword,
    createUser,
    deleteUser,
    updateUserGeneral,
    updateUserSocial,
    updateUserAvatar,
    addUserParent,
    addUserChild,
    addUserPartner,
    removeUserParent,
    removeUserChild,
    removeUserPartner
  }
}
