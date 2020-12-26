import React from 'react';
import {useSelector} from 'react-redux';
import GuestNav from './GuestNav';
import UserNav from './UserNav';
import {NavbarBrand,Nav,Navbar} from 'reactstrap';
import '../css/navbar.css';

//import './NavBar.css';
import { useHistory } from 'react-router-dom';

function NavBar(){

    const loggedIn = useSelector(state => state.user.token !== undefined);
    const history = useHistory();

    return(
        <Navbar color="light" light expand="md">
            <NavbarBrand onClick={()=>history.push('/')}>
                Vestler
            </NavbarBrand>
            <Nav className="mr-auto" navbar>
                {loggedIn ? (
                    <UserNav /> 
                ) : (
                    <GuestNav />)
                }
            </Nav>
        </Navbar>
    )
}
export default NavBar;