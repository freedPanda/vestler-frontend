import React from 'react';
import {Alert} from 'reactstrap';
import {useSelector} from 'react-redux';
import {v4 as uuid} from 'uuid';
import {Container} from 'reactstrap';

function ErrorAlerts(){

    const errors = useSelector(st => st.errors || []);

    if(errors.length > 0){
        return(
            <Container style={{textAlign:'center',width:'60%'}}>
                {
                errors.map(error =>(
                    <Alert key={uuid()} style={{width:'100%'}}color='warning'>
                        {error.split('.')[1]}
                    </Alert>
                ))}
            </Container>
            )
    }
    return(
        <>
        </>
    )

}
export default ErrorAlerts;