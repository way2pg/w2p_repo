const {authenticate} = require('feathers-authentication').hooks;
const {associateCurrentUser, queryWithCurrentUser} = require('feathers-authentication-hooks');
const {iff, populate, client, setCreatedAt, setUpdatedAt} = require('feathers-hooks-common');
const _ = require("lodash")


const createdBy = {
  include: {
    service: '/api/users',
    nameAs: 'createdBy',
    select: (hook, parentItem) => ({_id: parentItem.createdBy}),
  }
};

module.exports = {
  before: {
    all: [],
    find: [],
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
    all: [populate({schema: createdBy})],
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
