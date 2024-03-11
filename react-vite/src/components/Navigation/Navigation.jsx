import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux";
import "./Navigation.css";
import { useDispatch } from "react-redux";
import { thunkLogin } from "../../redux/session";
import { useState } from "react";

function Navigation() {
  const currentUser = useSelector((state)=>state.session.user)
  const dispatch = useDispatch()


  const demoLogin = async (e) => {
    e.preventDefault()
    await dispatch(
    thunkLogin({
      email: "demo@aa.io",
      password: "password"
    }))
  }

  return (
    <nav>
    <ul>
      <li>
        <NavLink to="/" className="links">Jungle</NavLink>
      </li>
      <li>
        <NavLink to='/all-items' className="links">All Items</NavLink>
      </li>
      <li className="nav-search">
        <input className="nav-search-input"
        type="text"
        placeholder="Search"
        onClick={()=>window.alert("Incoming Feature!")}>
        </input>
      </li>
      <li>
        {
          currentUser &&
        <NavLink to='/create-item' className="links">Create Item</NavLink>
        }
      </li>
      <li className="Profile-Button-Nav">
        <ProfileButton />
      </li>
      <button className="Demo-Button" onClick={demoLogin}>
        Demo User
      </button>
    </ul>
    </nav>
  );
}

export default Navigation;
