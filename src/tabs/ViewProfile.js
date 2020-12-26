import React from 'react';
import {useSelector} from 'react-redux';
import {Container,Card, CardText,CardImg, CardBody} from 'reactstrap';

function ViewProfile({display}){

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
                    <CardText style={{float:'right'}}>
                        {user.email}
                        {user.firstname}
                    </CardText>
                </CardBody>
            </Card>
        </Container>
    )
    
}
export default ViewProfile;