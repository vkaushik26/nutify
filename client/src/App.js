// import required modules
import React, { Component } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
// import user defined modules
import Dashboard from "./components/dashboard/Dashboard";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import CreateMeal from "./components/meals/CreateMeal";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import UserProfile from "./components/auth/UserProfile";

// App class which will be rendered in root DOM
class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <Switch>
            <PublicRoute exact path='/' component={SignIn} />
            <PublicRoute exact path='/signup' component={SignUp} />
            <PrivateRoute path='/dashboard' component={Dashboard} />
            <PrivateRoute path='/create' component={CreateMeal} />
            <PrivateRoute path='/profile' component={UserProfile} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
