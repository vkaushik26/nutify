import React, { Component } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { Redirect } from "react-router-dom";
import Navbar from "../layout/Navbar";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
    redirect: false,
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
      email: this.state.email,
      password: this.state.password,
    };
    // axiosfunction to make API call
    axios
      .post(`users/login`, data)
      .then((res) => {
        // when API call succeed set cookies
        cookie.set("token", res.data.token);
        cookie.set("user_id", res.data.id);
        cookie.set("max_calorie", res.data.calorie);
        cookie.set("username", res.data.username);
        this.setState({ redirect: true });
      })
      .catch((res) => {
        // API call not succeed set error to display
        if (!res.response) {
          this.setState({
            errors: {
              error: "Network Error",
            },
          });
        } else {
          this.setState({ errors: res.response.data });
        }
        console.log(this.state);
      });
  };

  // render the jsx with proper data
  render() {
    const errors = this.state.errors;

    //if redirect is set ti true, redirect to dashboard
    const redirect = this.state.redirect;
    if (redirect) {
      return <Redirect to='/dashboard' />;
    }

    return (
      <div>
        <Navbar />
        <div className='container'>
          <form onSubmit={this.handleSubmit}>
            <h3>Log In</h3>
            <hr />
            <div className='form-group'>
              <label htmlFor='email'>Email address:</label>
              <input
                type='email'
                className='form-control'
                placeholder='Enter email'
                id='email'
                onChange={this.handleChange}
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
              />
            </div>
            <div className='form-group form-check'>
              <label className='form-check-label'>
                <input className='form-check-input' type='checkbox' /> Remember
                me
              </label>
            </div>
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
            {errors ? (
              <span className='error red-text text-darken-2'>
                {errors.error}
              </span>
            ) : (
              ""
            )}
          </form>
        </div>
        
      </div>
    );
  }
}

export default SignIn;
