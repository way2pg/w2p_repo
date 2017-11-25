const {authenticate} = require('feathers-authentication').hooks;
const {associateCurrentUser, queryWithCurrentUser} = require('feathers-authentication-hooks');
const {iff, populate, client, setCreatedAt, setUpdatedAt} = require('feathers-hooks-common');
const _ = require("lodash")

const staffmember = {
  include: {
    service: '/api/users',
    nameAs: 'staffmember',
    select: (hook, parentItem) => ({_id: parentItem.staffmember}),
  }
};

const pgdetails = {
  include: {
    service: '/api/pgdetails',
    nameAs: 'pgdetails',
    select: (hook, parentItem) => ({_id: parentItem.pgdetails}),
  }
};

const createdBy = {
  include: {
    service: '/api/users',
    nameAs: 'createdBy',
    select: (hook, parentItem) => ({_id: parentItem.createdBy}),
  }
};

const updatedBy = {
  include: {
    service: '/api/users',
    nameAs: 'updatedBy',
    select: (hook, parentItem) => ({_id: parentItem.updatedBy}),
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
    all: [populate({schema: staffmember}), populate({schema: pgdetails}), populate({schema: createdBy}), populate({schema: updatedBy})],
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
