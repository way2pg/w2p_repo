const {authenticate} = require('feathers-authentication').hooks;
const {associateCurrentUser, queryWithCurrentUser} = require('feathers-authentication-hooks');
const {iff, populate, client, setCreatedAt, setUpdatedAt} = require('feathers-hooks-common');
const _ = require("lodash")

const expense_items = {
  include: {
    service: '/api/expenseitem',
    nameAs: 'items',
    asArray: true,
    select: (hook, parentItem) => ({expence_group: parentItem._id}),
  }
};

const populateItems = hook => {
  if((!_.isUndefined(hook.params) && _.has(hook.params, "items"))){
    delete hook.params.items;
    return true;
  }else {
    return false;
  }
}
module.exports = {
  before: {
    all: [
      /*authenticate('jwt'),*/
     hook => {
       if(_.has(hook.params.query,"$client")){
         const client = hook.params.query.$client;
         if (client) {
           delete hook.params.query.$client;
           hook.parms = Object.assign({}, hook.params, client);
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
      iff(hook=>populateItems(hook),populate({schema: expense_items}))
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
