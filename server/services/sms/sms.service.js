// Initializes the `sms` service on path `/api/sms`
const createService = require('feathers-mongoose');
const createModel = require('../../models/sms.model');
const hooks = require('./sms.hooks');
const filters = require('./sms.filters');
const request = require('request-promise');
const _ = require("lodash")

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'sms',
    Model
  };

  // Initialize our service with any options it requires
  app.use('/api/sms', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/sms');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }

  /* Send SMS to PG Owner */
  service.on("add_pgowner", (data) => {
    if (!_.isEmpty(data)) {
      app.service("/api/sms").find({
        query: {
          isEnabled: true
        }
      }).then(smsconfig => {
        app.service("/api/smstemplates").find({
          query: {
            name: "add_pgowner",
            isEnabled: true,
          }
        }).then(sms_template => {
          if (!_.isUndefined(sms_template) && !_.isUndefined(sms_template[0])) {
            if (!(_.isEmpty(sms_template[0]) && sms_template[0].isEnabled)) {
              const makeRequest = request.defaults({
                baseUrl: smsconfig[0].url + "&username=" + smsconfig[0].username + "&password="
                + smsconfig[0].password
                + "&number=" + data.mobile
                + "&message=" + _.replace(sms_template[0].template, '{{firstName}}', data.firstName),
                json: true
              });
              makeRequest("").then(response => {
                console.log(response)
              })
            }
          }
        })
      })
    }
  })
  service.on("update_pgowner", (data) => {
    if (!_.isEmpty(data)) {
      app.service("/api/sms").find({
        query: {
          isEnabled: true
        }
      }).then(smsconfig => {
        app.service("/api/smstemplates").find({
          query: {
            name: "update_pgowner",
            isEnabled: true,
          }
        }).then(sms_template => {
          if (!_.isUndefined(sms_template) && !_.isUndefined(sms_template[0])) {
            if (!(_.isEmpty(sms_template[0]) && sms_template[0].isEnabled)) {
              const makeRequest = request.defaults({
                baseUrl: smsconfig[0].url + "&username=" + smsconfig[0].username + "&password="
                + smsconfig[0].password
                + "&number=" + data.mobile
                + "&message=" + _.replace(sms_template[0].template, '{{firstName}}', data.firstName),
                json: true
              });
              makeRequest("").then(response => {
                console.log(response)
              })
            }
          }
        })
      })
    }
  })
  service.on("deactivate_pgowner", (data) => {
    if (!_.isEmpty(data)) {
      app.service("/api/sms").find({
        query: {
          isEnabled: true
        }
      }).then(smsconfig => {
        app.service("/api/smstemplates").find({
          query: {
            name: "deactivate_pgowner",
            isEnabled: true,
          }
        }).then(sms_template => {
          if (!_.isUndefined(sms_template) && !_.isUndefined(sms_template[0])) {
            if (!(_.isEmpty(sms_template[0]) && sms_template[0].isEnabled)) {
              const makeRequest = request.defaults({
                baseUrl: smsconfig[0].url + "&username=" + smsconfig[0].username + "&password="
                + smsconfig[0].password
                + "&number=" + data.mobile
                + "&message=" + _.replace(sms_template[0].template, '{{firstName}}', data.firstName),
                json: true
              });
              makeRequest("").then(response => {
                console.log(response)
              })
            }
          }
        })
      })
    }
  })

  /* Send SMS to PGOwner for adding PG*/
  service.on("add_pg", (data) => {
    if (!_.isEmpty(data)) {
      app.service("/api/sms").find({
        query: {
          isEnabled: true
        }
      }).then(smsconfig => {
        app.service("/api/smstemplates").find({
          query: {
            name: "add_pg",
            isEnabled: true,
          }
        }).then(sms_template => {
          if (!_.isUndefined(sms_template) && !_.isUndefined(sms_template[0])) {
            if (!(_.isEmpty(sms_template[0]) && sms_template[0].isEnabled)) {
              const makeRequest = request.defaults({
                baseUrl: smsconfig[0].url + "&username=" + smsconfig[0].username + "&password="
                + smsconfig[0].password
                + "&number=" + data.pgowner.mobile
                + "&message=" + _.replace(sms_template[0].template, '{{firstName}}', data.pgowner.firstName),
                json: true
              });
              makeRequest("").then(response => {
                console.log(response)
              })
            }
          }
        })
      })
    }
  })
  service.on("update_pg", (data) => {
    if (!_.isEmpty(data)) {
      app.service("/api/sms").find({
        query: {
          isEnabled: true
        }
      }).then(smsconfig => {
        app.service("/api/smstemplates").find({
          query: {
            name: "update_pg",
            isEnabled: true,
          }
        }).then(sms_template => {
          if (!_.isUndefined(sms_template) && !_.isUndefined(sms_template[0])) {
            if (!(_.isEmpty(sms_template[0]) && sms_template[0].isEnabled)) {
              const makeRequest = request.defaults({
                baseUrl: smsconfig[0].url + "&username=" + smsconfig[0].username + "&password="
                + smsconfig[0].password
                + "&number=" + data.pgowner.mobile
                + "&message=" + _.replace(sms_template[0].template, '{{firstName}}', data.pgowner.firstName),
                json: true
              });
              makeRequest("").then(response => {
                console.log(response)
              })
            }
          }
        })
      })
    }
  })
  service.on("deactivate_pg", (data) => {
    if (!_.isEmpty(data)) {
      app.service("/api/sms").find({
        query: {
          isEnabled: true
        }
      }).then(smsconfig => {
        app.service("/api/smstemplates").find({
          query: {
            name: "deactivate_pg",
            isEnabled: true,
          }
        }).then(sms_template => {
          if (!_.isUndefined(sms_template) && !_.isUndefined(sms_template[0])) {
            if (!(_.isEmpty(sms_template[0]) && sms_template[0].isEnabled)) {
              const makeRequest = request.defaults({
                baseUrl: smsconfig[0].url + "&username=" + smsconfig[0].username + "&password="
                + smsconfig[0].password
                + "&number=" + data.pgowner.mobile
                + "&message=" + _.replace(sms_template[0].template, '{{firstName}}', data.pgowner.firstName),
                json: true
              });
              makeRequest("").then(response => {
                console.log(response)
              })
            }
          }
        })
      })
    }
  })

  /* Send SMS to PGOwner & PG Staff */
  service.on("add_pg_staff", (data) => {
    if (!_.isEmpty(data)) {
      app.service("/api/sms").find({
        query: {
          isEnabled: true
        }
      }).then(smsconfig => {
        app.service("/api/smstemplates").find({
          query: {
            name: "add_pg_staff",
            isEnabled: true,
          }
        }).then(sms_template => {
          if (!_.isUndefined(sms_template) && !_.isUndefined(sms_template[0])) {
            if (!(_.isEmpty(sms_template[0]) && sms_template[0].isEnabled)) {
              const makeRequest = request.defaults({
                baseUrl: smsconfig[0].url + "&username=" + smsconfig[0].username + "&password="
                + smsconfig[0].password
                + "&number=" + data.mobile
                + "&message=" + _.replace(sms_template[0].template, '{{firstName}}', data.firstName),
                json: true
              });
              makeRequest("").then(response => {
                console.log(response)
              })
            }
          }
        })
      })
    }
  })
  service.on("update_pg_staff", (data) => {
    if (!_.isEmpty(data)) {
      app.service("/api/sms").find({
        query: {
          isEnabled: true
        }
      }).then(smsconfig => {
        app.service("/api/smstemplates").find({
          query: {
            name: "update_pg_staff",
            isEnabled: true,
          }
        }).then(sms_template => {
          if (!_.isUndefined(sms_template) && !_.isUndefined(sms_template[0])) {
            if (!(_.isEmpty(sms_template[0]) && sms_template[0].isEnabled)) {
              const makeRequest = request.defaults({
                baseUrl: smsconfig[0].url + "&username=" + smsconfig[0].username + "&password="
                + smsconfig[0].password
                + "&number=" + data.mobile
                + "&message=" + _.replace(sms_template[0].template, '{{firstName}}', data.firstName),
                json: true
              });
              makeRequest("").then(response => {
                console.log(response)
              })
            }
          }
        })
      })
    }
  })
  service.on("deactivate_pg_staff", (data) => {
    if (!_.isEmpty(data)) {
      app.service("/api/sms").find({
        query: {
          isEnabled: true
        }
      }).then(smsconfig => {
        app.service("/api/smstemplates").find({
          query: {
            name: "deactivate_pg_staff",
            isEnabled: true,
          }
        }).then(sms_template => {
          if (!_.isUndefined(sms_template) && !_.isUndefined(sms_template[0])) {
            if (!(_.isEmpty(sms_template[0]) && sms_template[0].isEnabled)) {
              const makeRequest = request.defaults({
                baseUrl: smsconfig[0].url + "&username=" + smsconfig[0].username + "&password="
                + smsconfig[0].password
                + "&number=" + data.mobile
                + "&message=" + _.replace(sms_template[0].template, '{{firstName}}', data.firstName),
                json: true
              });
              makeRequest("").then(response => {
                console.log(response)
              })
            }
          }
        })
      })
    }
  })

  /* Send SMS to Tenants */
  service.on("add_tenant", (data) => {
    console.log("=================== Add Tenant ===============")
    console.log(data)
    if (!_.isEmpty(data)) {
      app.service("/api/sms").find({
        query: {
          isEnabled: true
        }
      }).then(smsconfig => {
        app.service("/api/smstemplates").find({
          query: {
            name: "add_tenant",
            isEnabled: true,
          }
        }).then(sms_template => {
          if (!_.isUndefined(sms_template) && !_.isUndefined(sms_template[0])) {
            if (!(_.isEmpty(sms_template[0]) && sms_template[0].isEnabled)) {
              const makeRequest = request.defaults({
                baseUrl: smsconfig[0].url + "&username=" + smsconfig[0].username + "&password="
                + smsconfig[0].password
                + "&number=" + data.tenant.mobile
                + "&message=" + _.replace(sms_template[0].template, '{{firstName}}', data.firstName),
                json: true
              });
              makeRequest("").then(response => {
                console.log(response)
              })
            }
          }
        })
      })
    }
  })
  service.on("update_tenant", (data) => {
    if (!_.isEmpty(data)) {
      app.service("/api/sms").find({
        query: {
          isEnabled: true
        }
      }).then(smsconfig => {
        app.service("/api/smstemplates").find({
          query: {
            name: "update_tenant",
            isEnabled: true,
          }
        }).then(sms_template => {
          if (!_.isUndefined(sms_template) && !_.isUndefined(sms_template[0])) {
            if (!(_.isEmpty(sms_template[0]) && sms_template[0].isEnabled)) {
              const makeRequest = request.defaults({
                baseUrl: smsconfig[0].url + "&username=" + smsconfig[0].username + "&password="
                + smsconfig[0].password
                + "&number=" + data.tenant.mobile
                + "&message=" + _.replace(sms_template[0].template, '{{firstName}}', data.firstName),
                json: true
              });
              makeRequest("").then(response => {
                console.log(response)
              })
            }
          }
        })
      })
    }
  })
  service.on("deactivate_tenant", (data) => {
    if (!_.isEmpty(data)) {
      app.service("/api/sms").find({
        query: {
          isEnabled: true
        }
      }).then(smsconfig => {
        app.service("/api/smstemplates").find({
          query: {
            name: "deactivate_tenant",
            isEnabled: true,
          }
        }).then(sms_template => {
          if (!_.isUndefined(sms_template) && !_.isUndefined(sms_template[0])) {
            if (!(_.isEmpty(sms_template[0]) && sms_template[0].isEnabled)) {
              const makeRequest = request.defaults({
                baseUrl: smsconfig[0].url + "&username=" + smsconfig[0].username + "&password="
                + smsconfig[0].password
                + "&number=" + data.tenant.mobile
                + "&message=" + _.replace(sms_template[0].template, '{{firstName}}', data.firstName),
                json: true
              });
              makeRequest("").then(response => {
                console.log(response)
              })
            }
          }
        })
      })
    }
  })

  /* Send SMS to PGOwner for adding Food Menu */
  service.on("add_food_menu", (data) => {
    if (!_.isEmpty(data)) {
      app.service("/api/sms").find({
        query: {
          isEnabled: true
        }
      }).then(smsconfig => {
        app.service("/api/smstemplates").find({
          query: {
            name: "add_food_menu",
            isEnabled: true,
          }
        }).then(sms_template => {
          if (!_.isUndefined(sms_template) && !_.isUndefined(sms_template[0])) {
            if (!(_.isEmpty(sms_template[0]) && sms_template[0].isEnabled)) {
              const makeRequest = request.defaults({
                baseUrl: smsconfig[0].url + "&username=" + smsconfig[0].username + "&password="
                + smsconfig[0].password
                + "&number=" + data.mobile
                + "&message=" + _.replace(sms_template[0].template, '{{firstName}}', data.firstName),
                json: true
              });
              makeRequest("").then(response => {
                console.log(response)
              })
            }
          }
        })
      })
    }
  })
  service.on("update_food_menu", (data) => {
    if (!_.isEmpty(data)) {
      app.service("/api/sms").find({
        query: {
          isEnabled: true
        }
      }).then(smsconfig => {
        app.service("/api/smstemplates").find({
          query: {
            name: "update_food_menu",
            isEnabled: true,
          }
        }).then(sms_template => {
          if (!_.isUndefined(sms_template) && !_.isUndefined(sms_template[0])) {
            if (!(_.isEmpty(sms_template[0]) && sms_template[0].isEnabled)) {
              const makeRequest = request.defaults({
                baseUrl: smsconfig[0].url + "&username=" + smsconfig[0].username + "&password="
                + smsconfig[0].password
                + "&number=" + data.mobile
                + "&message=" + _.replace(sms_template[0].template, '{{firstName}}', data.firstName),
                json: true
              });
              makeRequest("").then(response => {
                console.log(response)
              })
            }
          }
        })
      })
    }
  })
  service.on("deactivate_food_menu", (data) => {
    if (!_.isEmpty(data)) {
      app.service("/api/sms").find({
        query: {
          isEnabled: true
        }
      }).then(smsconfig => {
        app.service("/api/smstemplates").find({
          query: {
            name: "deactivate_food_menu",
            isEnabled: true,
          }
        }).then(sms_template => {
          if (!_.isUndefined(sms_template) && !_.isUndefined(sms_template[0])) {
            if (!(_.isEmpty(sms_template[0]) && sms_template[0].isEnabled)) {
              const makeRequest = request.defaults({
                baseUrl: smsconfig[0].url + "&username=" + smsconfig[0].username + "&password="
                + smsconfig[0].password
                + "&number=" + data.mobile
                + "&message=" + _.replace(sms_template[0].template, '{{firstName}}', data.firstName),
                json: true
              });
              makeRequest("").then(response => {
                console.log(response)
              })
            }
          }
        })
      })
    }
  })

  /* Send SMS to PGOwner for adding Room */
  service.on("add_room", (data) => {
    if (!_.isEmpty(data)) {
      app.service("/api/sms").find({
        query: {
          isEnabled: true
        }
      }).then(smsconfig => {
        app.service("/api/smstemplates").find({
          query: {
            name: "add_room",
            isEnabled: true,
          }
        }).then(sms_template => {
          if (!_.isUndefined(sms_template) && !_.isUndefined(sms_template[0])) {
            if (!(_.isEmpty(sms_template[0]) && sms_template[0].isEnabled)) {
              const makeRequest = request.defaults({
                baseUrl: smsconfig[0].url + "&username=" + smsconfig[0].username + "&password="
                + smsconfig[0].password
                + "&number=" + data.mobile
                + "&message=" + _.replace(sms_template[0].template, '{{firstName}}', data.firstName),
                json: true
              });
              makeRequest("").then(response => {
                console.log(response)
              })
            }
          }
        })
      })
    }
  })
  service.on("update_room", (data) => {
    if (!_.isEmpty(data)) {
      app.service("/api/sms").find({
        query: {
          isEnabled: true
        }
      }).then(smsconfig => {
        app.service("/api/smstemplates").find({
          query: {
            name: "update_room",
            isEnabled: true,
          }
        }).then(sms_template => {
          if (!_.isUndefined(sms_template) && !_.isUndefined(sms_template[0])) {
            if (!(_.isEmpty(sms_template[0]) && sms_template[0].isEnabled)) {
              const makeRequest = request.defaults({
                baseUrl: smsconfig[0].url + "&username=" + smsconfig[0].username + "&password="
                + smsconfig[0].password
                + "&number=" + data.mobile
                + "&message=" + _.replace(sms_template[0].template, '{{firstName}}', data.firstName),
                json: true
              });
              makeRequest("").then(response => {
                console.log(response)
              })
            }
          }
        })
      })
    }
  })
  service.on("deactivate_room", (data) => {
    if (!_.isEmpty(data)) {
      app.service("/api/sms").find({
        query: {
          isEnabled: true
        }
      }).then(smsconfig => {
        app.service("/api/smstemplates").find({
          query: {
            name: "deactivate_room",
            isEnabled: true,
          }
        }).then(sms_template => {
          if (!_.isUndefined(sms_template) && !_.isUndefined(sms_template[0])) {
            if (!(_.isEmpty(sms_template[0]) && sms_template[0].isEnabled)) {
              const makeRequest = request.defaults({
                baseUrl: smsconfig[0].url + "&username=" + smsconfig[0].username + "&password="
                + smsconfig[0].password
                + "&number=" + data.mobile
                + "&message=" + _.replace(sms_template[0].template, '{{firstName}}', data.firstName),
                json: true
              });
              makeRequest("").then(response => {
                console.log(response)
              })
            }
          }
        })
      })
    }
  })

  /* Send SMS to User */
  service.on("add_user", (data) => {
    if (!_.isEmpty(data)) {
      app.service("/api/sms").find({
        query: {
          isEnabled: true
        }
      }).then(smsconfig => {
        app.service("/api/smstemplates").find({
          query: {
            name: "add_user",
            isEnabled: true,
          }
        }).then(sms_template => {
          if (!_.isUndefined(sms_template) && !_.isUndefined(sms_template[0])) {
            if (!(_.isEmpty(sms_template[0]) && sms_template[0].isEnabled)) {
              const makeRequest = request.defaults({
                baseUrl: smsconfig[0].url + "&username=" + smsconfig[0].username + "&password="
                + smsconfig[0].password
                + "&number=" + data.mobile
                + "&message=" + _.replace(sms_template[0].template, '{{firstName}}', data.firstName),
                json: true
              });
              makeRequest("").then(response => {
                console.log(response)
              })
            }
          }
        })
      })
    }
  })
  service.on("update_user", (data) => {
    if (!_.isEmpty(data)) {
      app.service("/api/sms").find({
        query: {
          isEnabled: true
        }
      }).then(smsconfig => {
        app.service("/api/smstemplates").find({
          query: {
            name: "update_user",
            isEnabled: true,
          }
        }).then(sms_template => {
          if (!_.isUndefined(sms_template) && !_.isUndefined(sms_template[0])) {
            if (!(_.isEmpty(sms_template[0]) && sms_template[0].isEnabled)) {
              const makeRequest = request.defaults({
                baseUrl: smsconfig[0].url + "&username=" + smsconfig[0].username + "&password="
                + smsconfig[0].password
                + "&number=" + data.mobile
                + "&message=" + _.replace(sms_template[0].template, '{{firstName}}', data.firstName),
                json: true
              });
              makeRequest("").then(response => {
                console.log(response)
              })
            }
          }
        })
      })
    }
  })
  service.on("deactivate_user", (data) => {
    if (!_.isEmpty(data)) {
      app.service("/api/sms").find({
        query: {
          isEnabled: true
        }
      }).then(smsconfig => {
        app.service("/api/smstemplates").find({
          query: {
            name: "deactivate_user",
            isEnabled: true,
          }
        }).then(sms_template => {
          if (!_.isUndefined(sms_template) && !_.isUndefined(sms_template[0])) {
            if (!(_.isEmpty(sms_template[0]) && sms_template[0].isEnabled)) {
              const makeRequest = request.defaults({
                baseUrl: smsconfig[0].url + "&username=" + smsconfig[0].username + "&password="
                + smsconfig[0].password
                + "&number=" + data.mobile
                + "&message=" + _.replace(sms_template[0].template, '{{firstName}}', data.firstName),
                json: true
              });
              makeRequest("").then(response => {
                console.log(response)
              })
            }
          }
        })
      })
    }
  })

  /* Send SMS to Admin */
  service.on("add_admin", (data) => {
    if (!_.isEmpty(data)) {
      app.service("/api/sms").find({
        query: {
          isEnabled: true
        }
      }).then(smsconfig => {
        app.service("/api/smstemplates").find({
          query: {
            name: "add_admin",
            isEnabled: true,
          }
        }).then(sms_template => {
          if (!_.isUndefined(sms_template) && !_.isUndefined(sms_template[0])) {
            if (!(_.isEmpty(sms_template[0]) && sms_template[0].isEnabled)) {
              const makeRequest = request.defaults({
                baseUrl: smsconfig[0].url + "&username=" + smsconfig[0].username + "&password="
                + smsconfig[0].password
                + "&number=" + data.mobile
                + "&message=" + _.replace(sms_template[0].template, '{{firstName}}', data.firstName),
                json: true
              });
              makeRequest("").then(response => {
                console.log(response)
              })
            }
          }
        })
      })
    }
  })
  service.on("update_admin", (data) => {
    if (!_.isEmpty(data)) {
      app.service("/api/sms").find({
        query: {
          isEnabled: true
        }
      }).then(smsconfig => {
        app.service("/api/smstemplates").find({
          query: {
            name: "update_admin",
            isEnabled: true,
          }
        }).then(sms_template => {
          if (!_.isUndefined(sms_template) && !_.isUndefined(sms_template[0])) {
            if (!(_.isEmpty(sms_template[0]) && sms_template[0].isEnabled)) {
              const makeRequest = request.defaults({
                baseUrl: smsconfig[0].url + "&username=" + smsconfig[0].username + "&password="
                + smsconfig[0].password
                + "&number=" + data.mobile
                + "&message=" + _.replace(sms_template[0].template, '{{firstName}}', data.firstName),
                json: true
              });
              makeRequest("").then(response => {
                console.log(response)
              })
            }
          }
        })
      })
    }
  })
  service.on("deactivate_admin", (data) => {
    if (!_.isEmpty(data)) {
      app.service("/api/sms").find({
        query: {
          isEnabled: true
        }
      }).then(smsconfig => {
        app.service("/api/smstemplates").find({
          query: {
            name: "deactivate_admin",
            isEnabled: true,
          }
        }).then(sms_template => {
          if (!_.isUndefined(sms_template) && !_.isUndefined(sms_template[0])) {
            if (!(_.isEmpty(sms_template[0]) && sms_template[0].isEnabled)) {
              const makeRequest = request.defaults({
                baseUrl: smsconfig[0].url + "&username=" + smsconfig[0].username + "&password="
                + smsconfig[0].password
                + "&number=" + data.mobile
                + "&message=" + _.replace(sms_template[0].template, '{{firstName}}', data.firstName),
                json: true
              });
              makeRequest("").then(response => {
                console.log(response)
              })
            }
          }
        })
      })
    }
  })

  service.on("send_sms", (event) => {
    if (!_.isEmpty(event)) {
      app.service("/api/sms").find({
        query: {
          isEnabled: true
        }
      }).then(smsconfig => {
        const makeRequest = request.defaults({
          baseUrl: smsconfig[0].url + "&username=" + smsconfig[0].username + "&password="
          + smsconfig[0].password
          + "&number=" + event.data.mobile
          + "&message=" + event.data.body,
          json: true
        });
        makeRequest("").then(response => {
          console.log(response)
        })
      })
    }
  })
};
