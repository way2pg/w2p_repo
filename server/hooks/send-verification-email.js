const accountService = require('../services/auth-management/notifier');

module.exports = (options = {}) => hook => {

  if (!hook.params.provider) { return hook; }

  const user = hook.result;

  if(hook.data && hook.data.email && user) {
    console.log("============================ send verification mail start ================")
    console.log(user)
    accountService(hook.app).notifier('resendVerifySignup', user);
    console.log("============================ send verification mail end ================")
    return hook;
  }

  return hook;
}
