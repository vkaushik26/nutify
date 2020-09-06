import React from "react";
import { NavLink } from "react-router-dom";

const SignedOutlinks = () => {
  return (
    <ul className='navbar-nav'>
      <li className='nav-item'>
        <NavLink className='nav-link' to='/signup' style={{ color: "Blue" }}>
          SignUp
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink className='nav-link' to='/' style={{ color: "Blue" }}>
          LogIn
        </NavLink>
      </li>
    </ul>
  );
};

export default SignedOutlinks;
