import React, {useEffect, useState} from 'react';
import { Container, Card, CardText } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {gotUser} from '../actions/user';

function PurchasePage(){

    const location = useLocation();

    
    const [stock, setStock] = useState(location.state);

    const dispatch = useDispatch();

    useEffect(()=>{

        function checkLocalStorage(){
          try{
            let user = window.localStorage.getItem('user');
            user = JSON.parse(user);
            if(user.token){
                dispatch(gotUser(user));
            }
          }catch(err){
            console.log(err);
          }
        }
    
        checkLocalStorage();
    
      },[])

    if(stock.o_type){
        return(
            <Container flex={true} style={{paddingLeft:'4rem',paddingRight:'4rem'}}>
                <h1>Transaction Complete!</h1>
                <Card>
                    <CardText>
                        {stock.o_type} {stock.symbol} Target:${stock.target.toFixed(2)}
                         Date:{stock.eDate} {stock.eTime} 
                    </CardText>
                </Card>
            </Container>
        )
    }

    return(
        <Container flex={true} style={{paddingLeft:'4rem',paddingRight:'4rem'}}>
            <h1>Transaction complete!</h1>
            <Card>
                <CardText>
                    {stock.qty} share(s) of {stock.symbol} at ${stock.price.toFixed(2)} for ${stock.total.toFixed(2)}
                </CardText>
            </Card>
        </Container>
    )

}

export default PurchasePage;