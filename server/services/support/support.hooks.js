const {authenticate} = require('feathers-authentication').hooks;
const {associateCurrentUser, queryWithCurrentUser} = require('feathers-authentication-hooks');
const {iff, populate, client, setCreatedAt, setUpdatedAt} = require('feathers-hooks-common');
const _ = require("lodash")

/*const tenant = {
  include: {
    service: '/api/users',
    nameAs: 'tenant',
    select: (hook, parentItem) => ({_id: parentItem.createdBy}),
  }
};*/

/*const owner = {
  include: {
    service: '/api/users',
    nameAs: 'owner',
    select: (hook, parentItem) => ({_id: parentItem.owner}),
  }
};*/

function condition(hook) {
  if (_.isEmpty(hook.params.query)) {
    let user = hook.params.user;
    let query = hook.params.query;
    if (!_.isUndefined(user)) {
      if (_.isEqual(user.role, "admin") || _.isEqual(user.role, "superadmin")) {
        console.log("Inside If")
        query = {}
      } else if (_.isEqual(user.role, "pgowner")) {
        console.log("Inside Else")
        query = {
          owner: user._id
        }
      } else if (_.isEqual(user.role, "tenant")) {
        query = {
          createdBy: user._id
        }
      }
    }
    console.log(query)
    hook.params.query = query;
  }
  return hook;
}
module.exports = {
  before: {
    all: [],
    find: [
      (hook) => {
        condition(hook)
      }
    ],
    get: [],
    create: [
      setCreatedAt('createdAt'), setUpdatedAt('updatedAt'),
      associateCurrentUser({as: 'createdBy'}),
      associateCurrentUser({as: 'updatedBy'}),
    ],
    update: [
      setUpdatedAt('updatedAt'),
      associateCurrentUser({as: 'updatedBy'})
    ],
    patch: [
      associateCurrentUser({as: 'updatedBy'}),
      setUpdatedAt('updatedAt')
    ],
    remove: [
      setUpdatedAt('deletedAt'),
      associateCurrentUser({as: 'deletedBy'})
    ]
  },

  after: {
    all: [
      /*populate({schema: tenant}), populate({schema: owner})*/
    ],
    find: [
      (hook) => {
        condition(hook)
      }
    ],
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
