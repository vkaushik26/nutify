import React, { Component } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { Redirect } from "react-router-dom";
import Navbar from "../layout/Navbar";

class UserProfile extends Component {
  state = {
    username: cookie.get("username"),
    limit: cookie.get("max_calorie"),
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
      Max_calories: this.state.limit,
    };
    const token = cookie.get("token"); //set token for request
    const old_username = cookie.get("username"); //set username for request
    // axiosfunction to make API call
    axios({
      method: "put",
      url: `api/v1/users/${old_username}`,
      data: data,
      headers: {
        Authorization: `Basic ${token}`,
      },
    })
      .then((res) => {
        // axiosfunction to make API call
        this.setState({ redirect: true });
        cookie.set("username", res.data.user.username);
        cookie.set("max_calorie", res.data.user.Max_calories);
      })
      .catch((err) => {
        // API call not succeed set error to display
        console.log(err.response);
      });
  };

  // render the jsx with proper data
  render() {
    const username = cookie.get("username");
    const limit = cookie.get("max_calorie");
    // if redirect true , redirect to dashboards
    const redirect = this.state.redirect;
    if (redirect) {
      return <Redirect to='/dashboard' />;
    }

    // render jsx with proper data
    return (
      <div>
        <Navbar />
        <div className='container'>
          <form onSubmit={this.handleSubmit}>
            <h3>Update Profile</h3>
            <hr />
            <div className='form-group'>
              <label htmlFor='username'>Username:</label>
              <input
                type='text'
                className='form-control'
                placeholder={username}
                id='username'
                onChange={this.handleChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='limit'>Calorie Limit:</label>
              <input
                type='number'
                className='form-control'
                placeholder={limit}
                id='limit'
                onChange={this.handleChange}
              />
            </div>

            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default UserProfile;
