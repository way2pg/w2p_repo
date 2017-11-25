// Initializes the `search` service on path `/api/search`
const createService = require('./search.class.js');
const hooks = require('./search.hooks');
const filters = require('./search.filters');

const tenants = {
  include: {
    service: '/api/tenants',
    nameAs: 'tenants',
    asArray: true,
    select: (hook, parentItem) => ({pgdetails: parentItem._id}),
  }
};

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'search',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/search', {
    find: function (params) {
      console.log(params.query)
      return Promise.resolve(
        app.service("/api/pgdetails").Model.find(params.query).then(response => {
          return response;
        })
      );
    }
  });

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/search');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
