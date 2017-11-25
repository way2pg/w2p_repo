const {authenticate} = require('feathers-authentication').hooks;
const {associateCurrentUser, queryWithCurrentUser} = require('feathers-authentication-hooks');
const {iff, populate, client, setCreatedAt, setUpdatedAt} = require('feathers-hooks-common');
const _ = require("lodash")

const expense_items = {
  include: {
    service: '/api/expenseitem',
    nameAs: 'expense_item',
    select: (hook, parentItem) => ({_id: parentItem.expense_item}),
  }
};

const expense_groups = {
  include: {
    service: '/api/expensegroup',
    nameAs: 'expense_group',
    select: (hook, parentItem) => ({_id: parentItem.expense_group})
  }
};
const user = {
  include: {
    service: '/api/users',
    nameAs: 'user',
    select: (hook, parentItem) => ({_id: parentItem.user}),
  }
};

module.exports = {
  before: {
    all: [
      hook => {
        console.log(hook)
      }
    ],
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
    all: [populate({schema: expense_items}), populate({schema: expense_groups}), populate({schema: user})],
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
