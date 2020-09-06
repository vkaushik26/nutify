import React, { Component } from "react";
import MealSummary from "./MealSummary";
import cookie from "js-cookie";
import axios from "axios";
import JumboTron from "../dashboard/Jumbotron";

class MealList extends Component {
  state = {
    meals: [],
  };
  // function to get ameals list
  getdata = () => {
    const date = this.props.date; // set date passed as props from parent
    const datestring =
      date.getDate() +
      "-" +
      parseInt(date.getMonth() + 1) +
      "-" +
      date.getFullYear(); // convert date object into string
    const token = cookie.get("token"); // set token from cookie
    // API call to get data
    axios
      .get(`api/v1/meals/${datestring}`, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((res) => {
        // store meals list in state
        this.setState({ meals: res.data });
      });
  };

  // function to execute when component is mounted
  componentDidMount() {
    this.getdata(); // fetch data function
  }

  // function to execute when component is updated
  componentDidUpdate(prevProps) {
    // Check if it's a new date
    if (this.props.date !== prevProps.date) {
      this.getdata(); // fetch data function
    }
  }

  //render jsx
  render() {
    const data = this.state.meals;
    // calculate sum of calories from the meal list
    var sum = 0;
    data.forEach(function (obj) {
      sum += obj.calorie;
    });

    if (data.length > 0) {
      return (
        <div className='project-list section'>
          <JumboTron currentSum={sum} />
          <div className='card-columns'>
            {data &&
              data.map((meal) => {
                return (
                  <div key={meal._id}>
                    <MealSummary meal={meal} sum={sum} getdata={this.getdata} />
                  </div>
                );
              })}
          </div>
        </div>
      );
    } else {
      return <div>Sorry... No meals added yet...</div>;
    }
  }
}
export default MealList;
