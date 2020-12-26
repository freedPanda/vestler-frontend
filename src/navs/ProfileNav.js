import React, { useState } from 'react';
import {Button,Navbar,NavItem} from 'reactstrap';
import '../css/navbar.css';

function ProfileNav({show}){

    const [activeTab,setActiveTab] = useState('stocks');

    function handleClick(evt){
        const {name} = evt.target;
        setActiveTab(name);
        show(name);
    }

    return(
        <Navbar id='nav-profile'>
            <NavItem>
                <button className={activeTab==='stocks' ? 'active-profilelink' : 'profilelink'} name='stocks' onClick={handleClick}>Investments</button>
            </NavItem>
            <NavItem>
                <button className={activeTab==='trades' ? 'active-profilelink' : 'profilelink'} name='account' onClick={handleClick}>Account</button>
            </NavItem>
            <NavItem>
                <button className={activeTab==='options' ? 'active-profilelink' : 'profilelink'} name='options' onClick={handleClick}>Option Calls</button>
            </NavItem>
            <NavItem>
                <button className={activeTab==='profile' ? 'active-profilelink' : 'profilelink'} name='profile' onClick={handleClick}>Profile</button>
            </NavItem>
        </Navbar>
    )
}
export default ProfileNav;