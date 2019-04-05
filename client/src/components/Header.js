import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gen: false,
      ver: false,
      ele: false
    };
  }

  setGen = () => {
    this.setState({
      gen: true,
      ver: false,
      ele: false
    });
  };

  setVer = () => {
    this.setState({
      gen: false,
      ver: true,
      ele: false
    });
  };

  setEle = () => {
    this.setState({
      gen: false,
      ver: false,
      ele: true
    });
  };

  render() {
    const { state, setGen, setVer, setEle } = this;
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
          <NavItem>
            <NavLink active={state.ele}>
              <Link to="/election" onClick={setEle}>
                Election
              </Link>
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default Header;
