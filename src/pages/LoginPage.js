import React from 'react';
import LoginForm from '../forms/LoginForm';
import {Container} from 'reactstrap';
import '../css/pages.css';
function LoginPage(){
    return(
        <Container fluid={true} className={'form-container'}>
            <LoginForm />
        </Container>
    )
}
export default LoginPage;