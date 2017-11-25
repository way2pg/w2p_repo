const {authenticate} = require('feathers-authentication').hooks;
const {associateCurrentUser, queryWithCurrentUser} = require('feathers-authentication-hooks');
const {iff, populate, client, setCreatedAt, setUpdatedAt, when, discard} = require('feathers-hooks-common');
const {hashPassword} = require('feathers-authentication-local').hooks;
const _ = require("lodash")
const sendVerificationEmail = require('../../hooks/send-verification-email');
const verifyHooks = require('feathers-authentication-management').hooks;
const search = require('feathers-mongodb-fuzzy-search')

const country = {
  include: {
    service: '/api/countries',
    nameAs: 'country',
    select: (hook, parentItem) => ({_id: parentItem.country}),
  }
};
const city = {
  include: {
    service: '/api/cities',
    nameAs: 'city',
    select: (hook, parentItem) => ({_id: parentItem.city}),
  }
};
const state = {
  include: {
    service: '/api/states',
    nameAs: 'state',
    select: (hook, parentItem) => ({_id: parentItem.state}),
  }
};

function condition(hook) {
  if (_.isEmpty(hook.params.query)) {
    let user = hook.params.user;
    let query = hook.params.query;
    if (!_.isUndefined(user)) {
      if (_.isEqual(user.role, "admin") || _.isEqual(user.role, "superadmin")) {
        query = {}
      } else {
        query = {
          $or: [
            {_id: user._id},
            {createdBy: user._id}
          ]
        }
      }
    }
    hook.params.query = query;
  }
  return hook;
}

const check_user = hook => {
  if ((!_.isUndefined(hook.params.user) && _.has(hook.params, "user"))) {
    return true;
  } else {
    return false;
  }
}
module.exports = {
  before: {
    all: [
		search()
	],
    find: [
      (hook) => {
        condition(hook)
      }
    ],
    get: [],
    create: [
      setCreatedAt('createdAt'), setUpdatedAt('updatedAt'),
      iff(hook=>check_user(hook), associateCurrentUser({as: 'createdBy'}),associateCurrentUser({as: 'updatedBy'})),
      hashPassword(),
      verifyHooks.addVerification()
    ],
    update: [
      authenticate('jwt'),
      setUpdatedAt('updatedAt'),
      associateCurrentUser({as: 'updatedBy'}),
      hashPassword()],
    patch: [
      authenticate('jwt'),
      setUpdatedAt('updatedAt')],
    remove: [
      authenticate('jwt'),
      setUpdatedAt('deletedAt'),
      associateCurrentUser({as: 'deletedBy'}),
    ]
  },

  after: {
    all: [
      when(
        hook => hook.params.provider,
        discard('password', '_computed', 'verifyExpires', 'resetExpires', 'verifyChanges')
      ),
	  populate({schema: country}),
	  populate({schema: state}),
	  populate({schema: city})
    ],
    find: [],
    get: [],
    create: [
      sendVerificationEmail(),
      verifyHooks.removeVerification()
    ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
