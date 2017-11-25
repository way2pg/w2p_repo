const isProd = process.env.NODE_ENV === 'production'
const path = require('path')
const returnEmail = process.env.COMPLAINT_EMAIL
const jade = require('pug')
const _ = require("lodash")

module.exports = function (app) {

  const returnEmail = app.get('complaint_email') || process.env.COMPLAINT_EMAIL

  function getLink(type, hash) {
    var url
    var port = (app.get('port') === '80' || isProd) ? '' : ':' + app.get('port')
    var host = (app.get('host') === 'HOST') ? 'localhost' : app.get('host')
    var protocal = (app.get('protocal') === 'PROTOCAL') ? 'http' : app.get('protocal')
    protocal += "://"
    return `${protocal}${host}${port}/login/${type}/${hash}`
  }

  function sendEmail(event, email) {
    app.service("/api/mail").emit(event,email);

  }

  return {
    notifier: function (type, user, notifierOptions) {
      var hashLink
      var email
      var emailAccountTemplatesPath = path.join(app.get('server'), 'email-templates', 'account')
      var templatePath
      var compiledHTML
      switch (type) {
        case 'resendVerifySignup': // send another email with link for verifying user's email addr
          return sendEmail("resendVerifySignup", user)


        case 'verifySignup': // inform that user's email is now confirmed

          hashLink = getLink('verify', user.verifyToken)

          templatePath = path.join(emailAccountTemplatesPath, 'email-verified.jade')

          compiledHTML = jade.compileFile(templatePath)({
            logo: '',
            name: user.name || user.email,
            hashLink,
            returnEmail
          })

          email = {
            from: process.env.GMAIL,
            to: user.email,
            subject: 'Thank you, your email has been verified',
            html: compiledHTML
          }

          return sendEmail("verifySignup", user)


        case 'sendResetPwd': // inform that user's email is now confirmed

          hashLink =

          email = {
            subject: 'Reset Password',
            user:user,
            hashLink:getLink('reset', user.resetToken),
            returnEmail:returnEmail
          }

          return sendEmail("sendResetPwd", user)


        case 'resetPwd': // inform that user's email is now confirmed

          hashLink = getLink('reset', user.resetToken)

          templatePath = path.join(emailAccountTemplatesPath, 'password-was-reset.jade')

          compiledHTML = jade.compileFile(templatePath)({
            logo: '',
            name: user.name || user.email,
            hashLink,
            returnEmail
          })

          email = {
            from: process.env.GMAIL,
            to: user.email,
            subject: 'Your password was reset',
            html: compiledHTML
          }

          return sendEmail("resetPwd", user)

        case 'passwordChange':
          //templatePath = path.join(emailAccountTemplatesPath, 'password-change.jade')

          email = {
            logo: '',
            user: user,
            returnEmail:returnEmail
          }
          return sendEmail("passwordChange", user)


        case 'identityChange':
          hashLink = getLink('verifyChanges', user.verifyToken)

          templatePath = path.join(emailAccountTemplatesPath, 'identity-change.jade')

          compiledHTML = jade.compileFile(templatePath)({
            logo: '',
            name: user.name || user.email,
            hashLink,
            returnEmail,
            changes: user.verifyChanges
          })

          email = {
            from: process.env.GMAIL,
            to: user.email,
            subject: 'Your account was changed. Please verify the changes',
            html: compiledHTML
          }

          return sendEmail("identityChange", user)

        default:

      }
    }
  }
}
