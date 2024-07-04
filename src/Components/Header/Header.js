import React from 'react';
import "./Header.css"
import { Nav, NavItem, Navbar, NavbarBrand } from 'reactstrap'
import { NavLink }  from 'react-router-dom'
import Logo from "../../assets/logo.png"


const Header = () => {
  return (
    <div className='Navigation'>
        <Navbar style={{
        backgroundColor: "#D70F64",
        height: "70px",
        }}>
        <NavbarBrand href="/" className="mr-auto ml-md-5 Brand"><img src={Logo} alt='Logo' height="80px"/></NavbarBrand>
        <Nav className='mr-md-5'>
            <NavItem>
                <NavLink to="/" className='NavLink'>Burger Builder</NavLink>
            </NavItem>
            <NavItem>
                <NavLink to="/orders" className='NavLink'>Orders</NavLink>
            </NavItem>
        </Nav>
    </Navbar>
    </div>
  )
}

export default Header