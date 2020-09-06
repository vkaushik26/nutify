import React, { Component } from "react";
import MealList from "../meals/MealList";
import Navbar from "../layout/Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Dashboard extends Component {
  state = {
    startDate: new Date(),
  };

  // function to change state when an event is happened
  handleChange = (date) => {
    this.setState({ startDate: date });
  };

  // render the jsx with proper data
  render() {
    const date = this.state.startDate;
    return (
      <div>
        <Navbar />
        <div className='mealList'>
          <div className='row' style={{ marginRight: "0px" }}>
            <div className='col-3'>
              <div
                class='card'
                style={{
                  margin: "10%",
                  width: "100%",
                  position: "sticky",
                  top: "10%",
                }}
              >
                <div class='card-header'>
                  <b>Get by date:</b>
                </div>
                <ul
                  class='list-group list-group-flush'
                  style={{ listStyle: "none" }}
                >
                  <li class='list-group-item' style={{ alignSelf: "center" }}>
                    <DatePicker
                      selected={this.state.startDate}
                      onSelect={this.handleChange}
                    />
                  </li>
                </ul>
              </div>
            </div>
            <div className='col-9'>
              <div className='meals'>
                <MealList date={date} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
