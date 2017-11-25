const {authenticate} = require('feathers-authentication').hooks;
const {associateCurrentUser, queryWithCurrentUser} = require('feathers-authentication-hooks');
const {iff, populate, client, setCreatedAt, setUpdatedAt} = require('feathers-hooks-common');
const _ = require("lodash")


const tenant = {
  include: {
    service: '/api/users',
    nameAs: 'tenant',
    select: (hook, parentItem) => ({_id: parentItem.tenant}),
  }
};
const pgowner = {
  include: {
    service: '/api/users',
    nameAs: 'pgowner',
    select: (hook, parentItem) => ({_id: parentItem.pgowner}),
  }
};
const pgdetails = {
  include: {
    service: '/api/pgdetails',
    nameAs: 'pgdetails',
    select: (hook, parentItem) => ({_id: parentItem.pgdetails}),
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

module.exports = {
  before: {
    all: [/*authenticate('jwt')*/],
    find: [
      (hook) => {
        condition(hook)
      }
    ],
    get: [],
    create: [
      setCreatedAt('createdAt'), setUpdatedAt('updatedAt'),
      associateCurrentUser({as: 'pgowner'}),
      associateCurrentUser({as: 'createdBy'}),
      associateCurrentUser({as: 'updatedBy'}),
    ],
    update: [
      setUpdatedAt('updatedAt'),
      associateCurrentUser({as: 'updatedBy'})
    ],
    patch: [
      setUpdatedAt('updatedAt')
    ],
    remove: [
      setUpdatedAt('deletedAt'),
      associateCurrentUser({as: 'deletedBy'})
    ]
  },

  after: {
    all: [
      populate({schema: tenant}),
      populate({schema: pgowner}),
      populate({schema: pgdetails})
    ],
    find: [],
    get: [],
    create: [],
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
