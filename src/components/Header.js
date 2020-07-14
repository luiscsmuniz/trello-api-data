import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

const Header = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="info" dark expand="md">
        <Link to="/">
          <NavbarBrand>Trello Data</NavbarBrand>
        </Link>
        {localStorage.getItem("trello_token") ? (
          <>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar />
              <Nav navbar>
                <NavItem className="navbar-right">
                  <NavLink href="" onClick={props.logout}>
                    Sair
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </>
        ) : null}
      </Navbar>
    </div>
  );
};

export default Header;
