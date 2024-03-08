import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux";
import "./Navigation.css";

function Navigation() {
  const currentUser = useSelector((state)=>state.session.user)
  return (
    <nav>
    <ul>
      <li>
        <NavLink to="/">Jungle</NavLink>
      </li>
      <li>
        <NavLink to='/all-items'>All Items</NavLink>
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
        <NavLink to='/create-item'>Create Item</NavLink>
        }
      </li>
      <li>
        <ProfileButton />
      </li>
    </ul>
    </nav>
  );
}

export default Navigation;
