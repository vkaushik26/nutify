"use strict"

const mongoose = require('mongoose'); //import mongoose library
const Meal = mongoose.model('Meal'); //import meals schema

//list all the meals
exports.list_meal = (req) => {
  return new Promise((resolve, reject) => {
    Meal.find({
      user_id: req.user._id
    }, (err, meals) => {
      if (err)
        reject(err)
      resolve(meals)
    });
  });
};

//to create a new meal
exports.create_meal = (req) => {
  return new Promise((resolve, reject) => {
    var new_meal = new Meal(req.body)
    // relate the meal entry with the user
    new_meal.user_id = req.user._id
    new_meal.save((err, meal) => {
      if (err)
        reject(err)
      resolve(meal)
    });
  });
};

//fetch a particular meal
exports.read_meal = (req) => {
  return new Promise((resolve, reject) => {
    Meal.find({
      date: req.params.date,
      user_id: req.user._id
    }, (err, meal) => {
      if (err)
        reject(err)
      resolve(meal)
    });
  });
};

//update a particular meal
exports.update_meal = (req) => {
  var date = req.params.date // store date from request
  var id = req.body.id // store meal id from request
  var update = req.body.data // store body from request
  return new Promise((resolve, reject) => {
    Meal.findOneAndUpdate({
      date: date,
      _id: id
    }, update, {
      new: true
    }, (err, meal) => {
      if (err) {
        reject(err)
      }
      resolve(meal)
    });
  });
};

//delete a particular meal
exports.delete_meal = (req) => {
  var date = req.params.date // store date from request
  var id = req.body.payload // store meal id from request
  return new Promise((resolve, reject) => {
    Meal.deleteOne({
      date: date,
      _id: id
    }, (err, meal) => {
      if (err)
        reject(err)
      resolve(meal)
    });
  });
};
