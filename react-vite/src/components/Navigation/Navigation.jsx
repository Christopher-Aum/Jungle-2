import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux";
import "./Navigation.css";
import { useDispatch } from "react-redux";
import { thunkLogin } from "../../redux/session";
import { useState } from "react";
import OpenModalMenuItem from "./OpenModalMenuItem";
import { useModal } from "../../context/Modal";
import ComingSoonModal from "../ComingSoonModal/ComingSoonModal";
import { useNavigate } from "react-router-dom";


function Navigation() {
  const currentUser = useSelector((state)=>state.session.user)
  const dispatch = useDispatch()
  const {closeModal, setModalContent} = useModal()
  const navigate = useNavigate()


  const demoLogin = async (e) => {
    e.preventDefault()
    await dispatch(
    thunkLogin({
      email: "demo@aa.io",
      password: "password"
    }))
  }
const comingSoon = () => {
setModalContent(
  <ComingSoonModal/>
)
}
  return (
    <nav>
    <ul>
      <li>
        <img className="icon-img" src="https://jungle-capstone.s3.amazonaws.com/leaf.png"></img>
        <NavLink to="/" className="links Jungle">Jungle</NavLink>
      </li>
      <li>
        <NavLink to='/all-items' className="links">All Items</NavLink>
      </li>
      <li className="nav-search">
        <input className="nav-search-input"
        type="text"
        placeholder="Search"
        onClick={()=>comingSoon()}>
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
      {!currentUser &&
      <button className="Demo-Button" onClick={demoLogin}>
        Demo User
      </button>}
      <li className="outside-links">
        <img className="icon-img-links" src="https://jungle-capstone.s3.amazonaws.com/github.png" onClick={()=> window.open('https://github.com/Christopher-Aum','_blank')}  />
        <img className="icon-img-links" src="https://jungle-capstone.s3.amazonaws.com/linkedin.png" onClick={()=>window.open('https://www.linkedin.com/in/christopher-aumonte/','_blank') }/>
        <img className="icon-img-links" src="https://jungle-capstone.s3.amazonaws.com/portfolio.png" onClick={()=>window.open('https://www.christopheraumonte.com/','_blank') }/>
      </li>
    </ul>
    </nav>
  );
}

export default Navigation;
