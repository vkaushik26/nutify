"use strict"

module.exports = (app) => {
  const user = require('../controllers/UserController') //import user controller functions
  const meal = require('../controllers/MealController') //import meal controller funtions
  const auth = require('../middeware/auth') //import authentication middleware

  //users api's
  app.route('/api/v1/users')
    .get(user.list_user)
    .post(user.create_user);

  app.route('/api/v1/users/:username')
    .get(auth, user.read_user)
    .put(auth, user.update_user)
    .delete(auth, user.delete_user);

  //authentication api's
  app.route('/users/login')
    .post(user.login);
  app.route('/users/logout')
    .post(auth, user.logout);

  //meals api's
  app.route('/api/v1/meals')
    .get(auth, meal.list_meal)
    .post(auth, meal.create_meal);

  app.route('/api/v1/meals/:date')
    .get(auth, meal.read_meal)
    .put(meal.update_meal)
    .delete(meal.delete_meal);

}
