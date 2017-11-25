const {authenticate} = require('feathers-authentication').hooks;
const {associateCurrentUser, queryWithCurrentUser} = require('feathers-authentication-hooks');
const {iff, populate, client, setCreatedAt, setUpdatedAt} = require('feathers-hooks-common');
const _ = require("lodash")

const createdBy = {
  service: '/api/users',
  field: 'createdBy'
};

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [setCreatedAt('createdAt'),setUpdatedAt('updatedAt')],
    update: [setUpdatedAt('updatedAt')],
    patch: [
     setUpdatedAt('updatedAt')
    ],
    remove: []
  },

  after: {
    all: [populate('createdBy', createdBy)],
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
