const {authenticate} = require('feathers-authentication').hooks;
const {iff, populate, client, setCreatedAt, setUpdatedAt} = require('feathers-hooks-common');
const {associateCurrentUser, queryWithCurrentUser} = require('feathers-authentication-hooks');
const _ = require("lodash")

const tenants = {
  include: {
    service: '/api/users',
    nameAs: 'tenant',
    select: (hook, parentItem) => ({_id: parentItem.tenant}),
  }
};
function condition(hook) {
  if (_.isEmpty(hook.params.query)) {
    let user = hook.params.user;
    let query = hook.params.query;
    console.log("============== 1")
    if (!_.isUndefined(user)) {
      console.log("============== 2")
      if (_.isEqual(user.role, "admin") || _.isEqual(user.role, "superadmin")) {
        query = {}
      } else {
        query = {
          $or: [
            {_id: user._id},
            {createdBy: user._id},
            {pgowner: user._id}
          ]
        }
      }
    }
    console.log(query)
    hook.params.query = query;
  }
  console.log("========================")
  console.log(hook)
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
      associateCurrentUser({as: 'createdBy'}),
      associateCurrentUser({as: 'updatedBy'}),
    ],
    update: [
      setUpdatedAt('updatedAt'),
      associateCurrentUser({as: 'updatedBy'}),
    ],
    patch: [
      setUpdatedAt('updatedAt')
    ],
    remove: []
  },

  after: {
    all: [populate({schema: tenants})],
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
