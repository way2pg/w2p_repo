const {authenticate} = require('feathers-authentication').hooks;
const {associateCurrentUser, queryWithCurrentUser} = require('feathers-authentication-hooks');
const {iff, populate, client, setCreatedAt, setUpdatedAt} = require('feathers-hooks-common');
const _ = require("lodash")
module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      setCreatedAt('createdAt'), setUpdatedAt('updatedAt')
    ],
    update: [
      setUpdatedAt('updatedAt')
    ],
    patch: [
      setUpdatedAt('updatedAt')
    ],
    remove: []
  },

  after: {
    all: [],
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
