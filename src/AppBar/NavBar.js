import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';

class NavbarPage extends Component {
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

render() {
  return (
    
    <nav class="navbar navbar-expand-lg navbar-light bg-light ">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Features</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Pricing</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown link
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>

    // <Router>
    //   <MDBNavbar color="default-color" dark expand="md">
    //     <MDBNavbarBrand>
    //       <strong className="white-text">Navbar</strong>
    //     </MDBNavbarBrand>
    //     <MDBNavbarToggler onClick={this.toggleCollapse} />
    //     <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
    //       <MDBNavbarNav left>
    //         <MDBNavItem active>
    //           <MDBNavLink to="#!">Home</MDBNavLink>
    //         </MDBNavItem>
    //         <MDBNavItem>
    //           <MDBNavLink to="#!">Features</MDBNavLink>
    //         </MDBNavItem>
    //         <MDBNavItem>
    //           <MDBNavLink to="#!">Pricing</MDBNavLink>
    //         </MDBNavItem>
    //         <MDBNavItem>
    //           <MDBDropdown>
    //             <MDBDropdownToggle nav caret>
    //               <div className="d-none d-md-inline">Dropdown</div>
    //             </MDBDropdownToggle>
    //             <MDBDropdownMenu className="dropdown-default">
    //               <MDBDropdownItem href="#!">Action</MDBDropdownItem>
    //               <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
    //               <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
    //               <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
    //             </MDBDropdownMenu>
    //           </MDBDropdown>
    //         </MDBNavItem>
    //       </MDBNavbarNav>
    //       <MDBNavbarNav right>
    //         <MDBNavItem>
    //           <MDBNavLink className="waves-effect waves-light" to="#!">
    //             <MDBIcon fab icon="twitter" />
    //           </MDBNavLink>
    //         </MDBNavItem>
    //         <MDBNavItem>
    //           <MDBNavLink className="waves-effect waves-light" to="#!">
    //             <MDBIcon fab icon="google-plus-g" />
    //           </MDBNavLink>
    //         </MDBNavItem>
    //         <MDBNavItem>
    //           <MDBDropdown>
    //             <MDBDropdownToggle nav caret>
    //               <MDBIcon icon="user" />
    //             </MDBDropdownToggle>
    //             <MDBDropdownMenu className="dropdown-default">
    //               <MDBDropdownItem href="#!">Action</MDBDropdownItem>
    //               <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
    //               <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
    //               <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
    //             </MDBDropdownMenu>
    //           </MDBDropdown>
    //         </MDBNavItem>
    //       </MDBNavbarNav>
    //     </MDBCollapse>
    //   </MDBNavbar>
    // </Router>
    );
  }
}

export default NavbarPage;