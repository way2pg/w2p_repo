const {authenticate} = require('feathers-authentication').hooks;
const {associateCurrentUser, queryWithCurrentUser} = require('feathers-authentication-hooks');
const {iff, populate, client, setCreatedAt, setUpdatedAt} = require('feathers-hooks-common');
const search = require('feathers-mongodb-fuzzy-search')

const _ = require("lodash")

const pgowner = {
  include: {
    service: '/api/users',
    nameAs: 'pgowner',
    select: (hook, parentItem) => ({_id: parentItem.pgowner}),
  }
};
const tenants = {
  include: {
    service: '/api/tenants',
    nameAs: 'tenants',
    asArray: true,
    select: (hook, parentItem) => ({
      pgdetails: parentItem._id
    }),
  }
};
const staffmembers = {
  include: {
    service: '/api/staffmembers',
    nameAs: 'staffmembers',
    asArray: true,
    select: (hook, parentItem) => ({pgdetails: parentItem._id})
  }
};

const comments = {
  include: {
    service: '/api/comments',
    nameAs: 'comments',
    asArray: true,
    select: (hook, parentItem) => ({pgid: parentItem._id})
  }
};

function condition(hook) {
  if (_.hasIn(hook.params.query, "search")) {
    hook.params.query = {}
  }else if (_.isEmpty(hook.params.query)) {
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
    console.log(hook.params.query)
    hook.params.query = query;
  }
  return hook;
}

module.exports = {
  before: {
    all: [

    ],
    find: [
      (hook) => {
        condition(hook)
      },
      search()
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
      setUpdatedAt('updatedAt'),
      associateCurrentUser({as: 'updatedBy'})
    ],
    remove: [
      setUpdatedAt('deletedAt'),
      associateCurrentUser({as: 'deletedBy'})
    ]
  },

  after: {
    all: [
      populate({schema: tenants}),
      populate({schema: pgowner}),
      populate({schema: staffmembers}),
      populate({schema: comments})
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
