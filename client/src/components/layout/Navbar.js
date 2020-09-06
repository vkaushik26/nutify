import React from "react";
import { Link } from "react-router-dom";
import SignedInlinks from "./SignedInlinks";
import SignedOutlinks from "./SignedOutlinks";
import cookie from "js-cookie";

const Navbar = () => {
  // set link according to user login status
  const links = cookie.get("user_id") ? <SignedInlinks /> : <SignedOutlinks />;
  // set logo according to device
  const logo =
    window.innerWidth <= 500 && cookie.get("user_id") ? (
      <></>
    ) : (
      <Link to='/' className='navbar-brand'>
        <h2>nutrify</h2>
      </Link>
    );
  // render proper jsx
  return (
    <nav className='navbar navbar-expand-sm fixed-top'>
      <div className='container'>
        {logo}
        {links}
      </div>
    </nav>
  );
};

export default Navbar;
