const {authenticate} = require('feathers-authentication').hooks;
const {associateCurrentUser, queryWithCurrentUser} = require('feathers-authentication-hooks');
const {iff, populate, client, setCreatedAt, setUpdatedAt} = require('feathers-hooks-common');
const _ = require("lodash")

const members = {
  include: {
    service: '/api/users',
    nameAs: 'members',
    asArray: true,
    select: (hook, parentItem) => (parentItem.members ? ({_id: {$in: parentItem.members.map(id => id)}}) : {}),
  }
};


function condition(hook) {
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
  return hook;
}


module.exports = {
  before: {
    all: [authenticate('jwt')],
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
      setUpdatedAt('updatedAt'),
      associateCurrentUser({as: 'updatedBy'})
    ],
    remove: [
      setUpdatedAt('deletedAt'),
      associateCurrentUser({as: 'deletedBy'})
    ]
  },

  after: {
    all: [populate({schema: members})],
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
