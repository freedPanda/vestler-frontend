import React, { useState } from 'react';
import {Container,Card, CardText,CardImg, CardBody,Nav} from 'reactstrap';
import {useSelector} from 'react-redux';
import ProfileNav from '../navs/ProfileNav';
import ViewProfile from '../tabs/ViewProfile';
import ViewMyStocks from '../tabs/ViewMyStocks';
import ViewAccount from '../tabs/ViewAccount';
import ViewOptions from '../tabs/ViewOptions';
import {Redirect } from 'react-router-dom';

function ProfilePage(){

    const user = useSelector(st => st.user || null);

    const [tab,setTab] = useState('stocks');

    if(!user){
        return(
            <Redirect to='/login'/>
        )
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