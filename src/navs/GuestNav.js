import React from 'react';
import {NavLink} from 'react-router-dom';
import {NavItem} from 'reactstrap';

function GuestNav(){
    return(
        <>
            <NavItem>
                <NavLink className={'navlink'} exact to='/'>Home</NavLink>
            </NavItem>
            <NavItem>
                <NavLink className={'navlink'} exact to='/login'>Login</NavLink>
            </NavItem>
            <NavItem>
                <NavLink className={'navlink'} exact to='/signup'>SignUp</NavLink>
            </NavItem>
        </>
    )
}
export default GuestNav;