import React, { Component } from "react";
import axios from "axios";
import cookie from "js-cookie";
import Navbar from "../layout/Navbar";

class SignUp extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    max_calorie: 0,
    errors: {},
  };

  // function to change state when an event is happened
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  // function to submit the form
  handleSubmit = (e) => {
    e.preventDefault(); // prevents default working of function
    // form the body of request
    const data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      Max_calories: this.state.max_calorie,
    };
    // axiosfunction to make API call
    axios
      .post(`api/v1/users`, data)
      .then((res) => {
        cookie.set("token", res.data.token);
        cookie.set("user_id", res.data.id);
        cookie.set("max_calorie", res.data.calorie);
        cookie.set("username", res.data.username);
        this.props.history.push("/dashboard");
      })
      .catch((err) => {
        // API call not succeed set error to display
        this.setState({ errors: err.response.data });
      });
  };

  // check for password matching
  confirmPassword = (e) => {
    if (e.target.value !== this.state.password) {
      this.setState({
        errors: {
          error: "Passwords not matching.",
        },
      });
    } else {
      this.setState({ errors: {} });
    }
  };

  // render the jsx with proper data
  render() {
    const errors = this.state.errors;
    return (
      <div>
        <Navbar />
        <div className='container'>
          <form onSubmit={this.handleSubmit}>
            <h3>Register</h3>
            <hr />
            <div className='form-group'>
              <label htmlFor='username'>Username:</label>
              <input
                type='text'
                className='form-control'
                placeholder='Enter username'
                id='username'
                onChange={this.handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='email'>Email address:</label>
              <input
                type='email'
                className='form-control'
                placeholder='Enter email'
                id='email'
                onChange={this.handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='pwd'>Password:</label>
              <input
                type='password'
                className='form-control'
                placeholder='Enter password'
                id='password'
                onChange={this.handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='pwd'>Confirm Password:</label>
              <input
                type='password'
                className='form-control'
                placeholder='Enter password'
                id='confirm_password'
                onChange={this.confirmPassword}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='max_calorie'>Calorie Limit:</label>
              <input
                type='number'
                className='form-control'
                placeholder='0'
                id='max_calorie'
                onChange={this.handleChange}
              />
            </div>
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
            {Object.keys(errors).length > 0 ? (
              errors.error ? (
                <center>
                  <span className='error'>{errors.error}</span>
                </center>
              ) : (
                <center>
                  <span className='error'>Existing {Object.keys(errors)}</span>
                </center>
              )
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
