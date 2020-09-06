"use strict"

var utils = require('../utils/writer.js'); //import write to create response
var Meal = require('../services/MealService'); //import meal services


//list all meals
module.exports.list_meal = (req, res) => {
  Meal.list_meal(req)
    .then((response) => {
      utils.writeJson(res, response);
    })
    .catch((error) => {
      utils.writeJson(res, error);
    });
};

//to create a new meal
module.exports.create_meal = (req, res) => {
  Meal.create_meal(req)
    .then((response) => {
      utils.writeJson(res, response);
    })
    .catch((error) => {
      utils.writeJson(res, error);
    });
};

//to fetch a particular meal
module.exports.read_meal = (req, res) => {
  Meal.read_meal(req)
    .then((response) => {
      utils.writeJson(res, response);
    })
    .catch((error) => {
      utils.writeJson(res, error);
    });
};

//to update a particular meal
module.exports.update_meal = (req, res) => {
  Meal.update_meal(req)
    .then((response) => {
      utils.writeJson(res, response);
    })
    .catch((error) => {
      utils.writeJson(res, error);
    });
};

//to delete a particular meal
module.exports.delete_meal = (req, res) => {
  Meal.delete_meal(req)
    .then((response) => {
      utils.writeJson(res, response);
    })
    .catch((error) => {
      utils.writeJson(res, error);
    });
};
