import React, { Component } from "react";
import cookie from "js-cookie";
import axios from "axios";
import { Redirect } from "react-router-dom";
import UpdateMeal from "../meals/UpdateMeal";

class MealSummary extends Component {
  state = {
    redirect: false,
    meal: this.props.meal,
    show: false,
  };

  // funtion to hide modal
  hideModal = () => {
    this.setState({ redirect: true });
  };

  //functon to delete particular meal
  handleDelete = () => {
    var date = this.props.meal.date; // set date from props from parent
    var token = cookie.get("token"); // set token from cookie
    var payload = this.props.meal._id; // set meal id from props from parent
    // API call to delete particular meal
    axios
      .delete(`api/v1/meals/${date}`, {
        data: {
          payload,
        },
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((res) => {
        // if successful call getdata function from parent
        this.props.getdata();
      });
  };

  // render jsx
  render() {
    const meal = this.props.meal;

    // redirect to "/" if true
    const redirect = this.state.redirect;
    if (redirect) {
      return <Redirect to='/' />;
    }

    return (
      <div>
        <div className='modal' id={`myModal${meal._id}`}>
          <div className='modal-dialog modal-xl'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h4 className='modal-title'>Update Meal</h4>
                <button
                  type='button'
                  className='close'
                  data-dismiss='modal'
                  onClick={this.hideModal}
                >
                  &times;
                </button>
              </div>

              <div className='modal-body'>
                <UpdateMeal children={meal} refresh={this.hideModal} />
              </div>
            </div>
          </div>
        </div>

        <div className='card bg-light'>
          <div className='card-header'>
            <h3>{meal.meal_name}</h3>
          </div>
          <div className='card-body'>
            <span className='black-text right'>
              <h5>Calories: {meal.calorie}</h5>
            </span>
            <h6>{meal.meal_type}</h6>
            <p>{meal.description}</p>
          </div>
          <div className='card-footer'>
            <button
              type='button'
              className='btn btn-link'
              data-toggle='modal'
              data-target={`#myModal${meal._id}`}
              style={{ paddingLeft: "20%", paddingRight: "20%" }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
              >
                <path d='M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z' />
              </svg>
            </button>
            <button
              className='btn btn-link'
              onClick={this.handleDelete}
              style={{ paddingLeft: "20%", paddingRight: "20%" }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
              >
                <path d='M24 3.752l-4.423-3.752-7.771 9.039-7.647-9.008-4.159 4.278c2.285 2.885 5.284 5.903 8.362 8.708l-8.165 9.447 1.343 1.487c1.978-1.335 5.981-4.373 10.205-7.958 4.304 3.67 8.306 6.663 10.229 8.006l1.449-1.278-8.254-9.724c3.287-2.973 6.584-6.354 8.831-9.245z' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default MealSummary;
