import React, { useState, useEffect } from 'react';
import {Container,Card, Nav} from 'reactstrap';
import {useSelector, useDispatch} from 'react-redux';
import ProfileNav from '../navs/ProfileNav';
import ViewProfile from '../tabs/ViewProfile';
import ViewMyStocks from '../tabs/ViewMyStocks';
import ViewAccount from '../tabs/ViewAccount';
import ViewOptions from '../tabs/ViewOptions';
import {useHistory } from 'react-router-dom';
import {gotUser} from '../actions/user';

function ProfilePage(){

    /**
     * Profile Page - uses the variable called tab
     * to manage which tab user is trying to view
     */

    const user = useSelector(st => st.user);

    //tab is manipulated by user input to change the
    //users display
    const [tab,setTab] = useState('stocks');

    const history = useHistory();
    const dispatch = useDispatch();

    //check local storage is used in case page is
    //browser refreshed
    function checkLocalStorage(){
        try{
          let user = window.localStorage.getItem('user');
          user = JSON.parse(user);
          if(user.token){
              dispatch(gotUser(user));
              history.push('/profile');
          }
          else{
              history.push('/signup');
          }
        }catch(err){
          console.log(err);
        }
      }
    if(!Object.keys(user).length){
        checkLocalStorage();
    }

    return(
        <Container>
            <Card >
                <h1>Welcome back {user.username}</h1>
                <Nav className="mr-auto" style={{textAlign:'center'}} navbar>
                    <ProfileNav show={setTab}/>
                </Nav>
            </Card>
            <ViewMyStocks display={tab}/>
            <ViewOptions display={tab}/>
            <ViewProfile display={tab}/>
            <ViewAccount display={tab}/>
        </Container>
    )

}
export default ProfilePage;