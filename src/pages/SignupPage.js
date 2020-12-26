import React from 'react';
import SignUpForm from '../forms/SignUpForm';
import {Container,Card,CardText} from 'reactstrap';
import '../css/pages.css';
import ErrorAlerts from '../ErrorAlerts';

function SignupPage(){

    return(
        <div>
            <Card style={{border:'none'}}>
                <h2>
                    Sign Up with Vestler!
                </h2>
                <CardText>
                    Join Vestler and become part of a community of people on a journey to become investors.
                </CardText>
            </Card>
            <ErrorAlerts />
            <Container fluid={true} className={'form-container'}>
                <SignUpForm />
            </Container>
        </div>
       
    )

}
export default SignupPage;