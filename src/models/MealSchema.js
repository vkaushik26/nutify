"use strict"

const mongoose = require('mongoose') //import mongoose module
const User = require('../models/UserSchema') //import user schema
const Schema = mongoose.Schema //create schema object

//meal schema defination
const mealSchema = mongoose.Schema({
  //getting user reference from user schema to store the user Id
  user_id: {
    type: Schema.Types.ObjectId,
    ref: User
  },
  meal_type: {
    type: String,
    required: true
  },
  meal_name: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  calorie: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
  },
  time: {
    type: String
  }
});

// pre save function to set date and time if not provided in the request
mealSchema.pre('save', async function(next) {
  const meal = this
  const date = new Date
  if (!meal.date) {
    meal.date = date.getDate() + "-" + parseInt(date.getMonth() + 1) + "-" + date.getFullYear()
  }
  if (!meal.time) {
    meal.time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
  }
  next() // call the next middleware
})

//export mongoose model
module.exports = mongoose.model('Meal', mealSchema)
