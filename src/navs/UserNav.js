import React from 'react';
import {Navbar,NavItem} from 'reactstrap';
import {NavLink} from 'react-router-dom';

function UserNav(){

    return(
        <Navbar>
            <NavItem>
                <NavLink className={'navlink'} exact to="/stocks">Stocks</NavLink>
            </NavItem>
            <NavItem>
                <NavLink className={'navlink'} exact to="/trades">Trades</NavLink>
            </NavItem>
            <NavItem>
                <NavLink className={'navlink'} exact to="/news">News</NavLink>
            </NavItem>
            <NavItem>
                <NavLink className={'navlink'} exact to='/profile'>Dashboard</NavLink>
            </NavItem>
            <NavItem>
                <NavLink className={'navlink'} exact to="/logout">Logout</NavLink>
            </NavItem>
        </Navbar>
    )
}
export default UserNav;