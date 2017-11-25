const {authenticate} = require('feathers-authentication').hooks;
const {associateCurrentUser, queryWithCurrentUser} = require('feathers-authentication-hooks');
const {iff, populate, client, setCreatedAt, setUpdatedAt} = require('feathers-hooks-common');
const _ = require("lodash")

const expense_groups = {
  include: {
    service: '/api/expensegroup',
    nameAs: 'expense_group',
    select: (hook, parentItem) => ({_id: parentItem.expense_group})
  }
};

const populateGroups = hook => {
  if ((!_.isUndefined(hook.params) && _.has(hook.params, "group"))) {
    delete hook.params.group;
    return true;
  } else {
    return false;
  }
}

module.exports = {
  before: {
    all: [
      /* authenticate('jwt'),*/
      hook => {
        if (_.has(hook.params.query, "$client")) {
          const client = hook.params.query.$client;
          if (client) {
            delete hook.params.query.$client;
            _.assign(hook.params, client)
          }
        }
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
    all: [
      iff(hook=>populateGroups(hook), populate({schema: expense_groups}))
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
}
;
