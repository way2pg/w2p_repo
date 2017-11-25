const users = require('./users/users.service.js');
const tenant = require('./tenant/tenant.service.js');
const staffMembers = require('./staff-members/staff-members.service.js');
const rules = require('./rules/rules.service.js');
const rooms = require('./rooms/rooms.service.js');
const request = require('./request/request.service.js');
const support = require('./support/support.service.js');
const referrals = require('./referrals/referrals.service.js');
const pgdetails = require('./pgdetails/pgdetails.service.js');
const pageViews = require('./page-views/page-views.service.js');
const likDislikes = require('./lik-dislikes/lik-dislikes.service.js');
const configuration = require('./configuration/configuration.service.js');
const groups = require('./groups/groups.service.js');
const feedback = require('./feedback/feedback.service.js');
const faqs = require('./faqs/faqs.service.js');
const comments = require('./comments/comments.service.js');
const reports = require('./reports/reports.service.js');
const search = require('./search/search.service.js');
const mailtemplates = require('./mailtemplates/mailtemplates.service.js');
const mail = require('./mail/mail.service.js');
const sms = require('./sms/sms.service.js');
const smstemplates = require('./smstemplates/smstemplates.service.js');
const foodmenu = require('./foodmenu/foodmenu.service.js');
const foodrequest = require('./foodrequest/foodrequest.service.js');
const foodreport = require('./food-report/food-report.service.js');
const pgreport = require('./pg-report/pg-report.service.js');
const event = require('./event/event.service.js');
const authManagement = require('./auth-management/auth-management.service')
const expensegroup = require('./expense-group/expense-group.service')
const expenseitem = require('./expense-item/expense-item.service')
const expense = require('./expense/expense.service.js');
const aboutus = require('./aboutus/aboutus.service.js');
const careers = require('./careers/careers.service.js');
const privacy = require('./privacy/privacy.service.js');
const terms = require('./terms/terms.service.js');

const countries = require('./countries/countries.service.js');
const states = require('./states/states.service.js');
const cities = require('./cities/cities.service.js');
const agenda = require('./agenda/agenda.service.js');
const scheduler = require('./scheduler/scheduler.service.js');

module.exports = function () {
  const app = this;
  app.configure(authManagement);
  app.configure(users);
  app.configure(tenant);
  app.configure(staffMembers);
  app.configure(rules);
  app.configure(rooms);
  app.configure(request);
  app.configure(referrals);
  app.configure(pgdetails);
  app.configure(pageViews);
  app.configure(likDislikes);
  app.configure(configuration);
  app.configure(groups);
  app.configure(feedback);
  app.configure(faqs);
  app.configure(comments);
  app.configure(reports);
  app.configure(search);
  app.configure(mailtemplates);
  app.configure(mail);
  app.configure(sms);
  app.configure(smstemplates);
  app.configure(foodmenu);
  app.configure(foodrequest);
  app.configure(foodreport);
  app.configure(event);
  app.configure(expensegroup);
  app.configure(expenseitem);
  app.configure(expense);
  app.configure(pgreport);
  app.configure(support);
  app.configure(aboutus);
  app.configure(careers);
  app.configure(privacy);
  app.configure(terms);
  app.configure(countries);
  app.configure(states);
  app.configure(cities);
  app.configure(agenda)
  app.configure(scheduler)
};
