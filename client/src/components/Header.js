import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'reactstrap';

const Header = () => {
  return (
    <div>
      <Navbar color="dark">
        <Nav>
          <NavItem>
            <Link to="/generate">Generate</Link>
          </NavItem>
          <NavItem>
            <Link to="/verifier">Verifier</Link>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};

export default Header;
