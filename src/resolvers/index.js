import { JSONResolver, DateTimeResolver } from 'graphql-scalars'

import login from './mutations/login'
import whoAmI from './queries/whoAmI'

import getUser from './queries/getUser'
import queryUser from './queries/queryUser'
import countUser from './queries/countUser'

import addUser from './mutations/addUser'
import updateUser from './mutations/updateUser'
import updateUserAvatar from './mutations/updateUserAvatar'
import resetUserPassword from './mutations/resetUserPassword'
import deleteUser from './mutations/deleteUser'

import addCouple from './mutations/addCouple'
import updateCouple from './mutations/updateCouple'
import deleteCouple from './mutations/deleteCouple'

import addUserParent from './mutations/addUserParent'
import deleteUserParent from './mutations/deleteUserParent'
import addUserChild from './mutations/addUserChild'
import deleteUserChild from './mutations/deleteUserChild'

import getUserAvatar from './queries/getUserAvatar'
import getUserParents from './queries/getUserParents'
import getUserChildren from './queries/getUserChildren'
import getUserCouple from './queries/getUserCouple'
import getUserSiblings from './queries/getUserSiblings'
import getUserSocialLinks from './queries/getUserSocialLinks'

import getCouple from './queries/getCouple'
import queryCouple from './queries/queryCouple'
import countCouple from './queries/countCouple'

import getCoupleUserOne from './queries/getCoupleUserOne'
import getCoupleUserTwo from './queries/getCoupleUserTwo'
import getCouplePartner from './queries/getCouplePartner'

import getUserAvailablePartners from './queries/getUserAvailablePartners'
import getUserAvailableChildren from './queries/getUserAvailableChildren'
import getUserFamily from './queries/getUserFamily'

import addSocialLink from './mutations/addSocialLink'
import updateSocialLink from './mutations/updateSocialLink'
import deleteSocialLink from './mutations/deleteSocialLink'

import getSocialLinkUser from './queries/getSocialLinkUser'

import getProtectedField from '../utils/getProtectedField'

export default {
  JSON: JSONResolver,
  DateTime: DateTimeResolver,

  User: {
    avatar: getUserAvatar,
    email: getProtectedField,
    phoneNumber: getProtectedField,
    birthLocation: getProtectedField,
    currentLocation: getProtectedField,
    deathLocation: getProtectedField,
    dateOfBirth: getProtectedField,
    dateOfDeath: getProtectedField,
    parents: getUserParents,
    children: getUserChildren,
    siblings: getUserSiblings,
    couple: getUserCouple,
    socialLinks: getUserSocialLinks
  },

  Couple: {
    dateOfMarriage: getProtectedField,
    marriageLocation: getProtectedField,
    userOne: getCoupleUserOne,
    userTwo: getCoupleUserTwo,
    partner: getCouplePartner
  },

  SocialLink: {
    user: getSocialLinkUser
  },

  Query: {
    whoAmI,
    getUser,
    queryUser,
    countUser,
    getCouple,
    queryCouple,
    countCouple,
    getUserAvailablePartners,
    getUserAvailableChildren,
    getUserFamily
  },

  Mutation: {
    login,
    addUser,
    updateUser,
    updateUserAvatar,
    resetUserPassword,
    deleteUser,
    addUserParent,
    deleteUserParent,
    addUserChild,
    deleteUserChild,
    addCouple,
    updateCouple,
    deleteCouple,
    addSocialLink,
    updateSocialLink,
    deleteSocialLink
  }
}
