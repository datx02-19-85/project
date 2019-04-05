import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gen: false,
      ver: false
    };
  }

  setGen = () => {
    this.setState({
      gen: true,
      ver: false
    });
  };

  setVer = () => {
    this.setState({
      gen: false,
      ver: true
    });
  };

  render() {
    const { state, setGen, setVer } = this;
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink active={state.gen}>
              <Link to="/generate" onClick={setGen}>
                Generate
              </Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active={state.ver}>
              <Link to="/verifier" onClick={setVer}>
                Verifier
              </Link>
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default Header;
