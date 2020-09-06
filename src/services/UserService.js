"use strict"

const mongoose = require('mongoose'); //import mongoose library
const User = mongoose.model('User'); //import user schema

// list all users
exports.list_user = function list_user() {
  return new Promise((resolve, reject) => {
    User.find({}, (err, users) => {
      if (err)
        reject(err)
      resolve(users)
    });
  });
};

//to create a new user
exports.create_user = (body) => {
  return new Promise(async (resolve, reject) => {
    var new_user = new User(body) // create new user instance form body of request
    const user = await new_user.save().catch(err => {
      reject(err.keyValue)
    }) //save user
    if (user) {
      const token = await user.generateAuthToken() //generate jwt token for user
      const username = user.username // store username
      const id = user._id //store user id
      const calorie = user.Max_calories //store calorie limit
      resolve({
        id,
        token,
        calorie,
        username
      }) //respond with data
    }
  });
};

//fetch a particular user details
exports.read_user = (user_name) => {
  return new Promise((resolve, reject) => {
    User.findOne({
      username: user_name
    }, (err, user) => {
      if (err)
        reject(err)
      resolve(user)
    });
  });
};

//update a particular user
exports.update_user = (user_name, body) => {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate({
      username: user_name
    }, body, {
      new: true
    }, (err, user) => {
      if (err)
        reject(err)
      resolve({
        user
      })
    });
  });
};

//delete a particular user
exports.delete_user = (user_name) => {
  return new Promise((resolve, reject) => {
    User.remove({
      username: user_name
    }, (err, user) => {
      if (err)
        reject(err)
      resolve(user)
    });
  });
};

//logging in a user
exports.login = (body) => {
  return new Promise(async (resolve, reject) => {
    const {
      email,
      password
    } = body // store email and password
    const user = await User.findByCredentials(email, password) // find user by email and password
    if (user.error) {
      reject(user)
      return
    } else {
      const token = await user.generateAuthToken() //generate jwt token
      const username = user.username
      const id = user._id
      const calorie = user.Max_calories
      resolve({
        id,
        token,
        calorie,
        username
      }) // respond with data
    }

  });
}
