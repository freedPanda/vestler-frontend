import React from 'react';
import {useSelector} from 'react-redux';
import {Container,Card, CardText,CardImg, CardBody} from 'reactstrap';

function ViewProfile({display}){

    /**
     * Profile Page - Displays user info
     */

    const user = useSelector(st => st.user);

    if(display !== 'profile'){
        return(
            <div style={{display:'none'}}></div>
        )
    }

    return(
        <Container>
            <Card>
                <CardBody>
                    <CardImg src={`${user.photo}`} style={{width:'200px',display:'inline',float:'left'}}/>
                    <div style={{display:'flex', justifyContent:'space-evenly'}}>
                        <CardText style={{}}>
                            {user.email}
                        </CardText>
                        <CardText>
                        {user.firstname}
                        </CardText>
                        <CardText>
                        {user.username}
                        </CardText>
                    </div>
                </CardBody>
            </Card>
        </Container>
    )
    
}
export default ViewProfile;