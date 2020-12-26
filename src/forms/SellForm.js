import React, { useState } from 'react';
import {Form, FormGroup, Label, Input, Button, Col} from 'reactstrap';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useLocation} from 'react-router-dom';
import axios from 'axios';

function SellForm({stock, currentPrice}){

    //SellForm needs how much the user currently has of the stock at that price,
    //what the current market rate of that stock is,

    const BASE_API_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
    const history = useHistory();

    const username = useSelector(state => state.user.username);
    const token = useSelector(state => state.user.token);
    
    //total is used to display dollar amount of the total sale using stocks current value
    //and the chosen qty.
    //sell is used to send the data to the server
    const [total, setTotal] = useState(0);
    const [sell, setSell] = useState({...stock,qty:0,currentPrice:currentPrice})
    const [profit, setProfit] = useState(0);

    const handleChange = (evt) => {
        //value is qty use chosen to sell
        const {value, name} = evt.target;
        setSell({...sell,[name]:`-${value}`})
        //total is total dollar value of user has chosen to sell
        //which is value=qty times price the user purchased at
        setTotal(value * stock.price);
        //profit is current market value * chosen qty - total
        setProfit(currentPrice * value - (value * stock.price));
        
    }
    async function handleSubmit(evt){
        evt.preventDefault();
        try{
            sell.total = total;
            let res = await axios.post(`${BASE_API_URL}/transactions/${username}/sell/${stock.symbol}?_token=${token}`,sell)
            if(res.status === 201){
                history.push('/profile');
            }
        }catch(err){
            console.log('sell error', err);
        }
        
        console.log()
    }

    return(
        <>
            <Form onSubmit={handleSubmit} style={{textAlign:'start',marginLeft:'8px'}}>
            <h2 style={{marginLeft:'0px'}}>Sell Stock</h2>
            <FormGroup row style={{alignItems:'center'}}>
                <Label for='qty'>Qty: </Label>
                <Col style={{maxWidth:'100px'}}>
                    <Input onChange={handleChange} type='number' id='qty' name='qty' min='0' max={stock.qty} step='1' required />
                </Col>
                <Label>Total(invested price): ${total.toFixed(2)}</Label>
                <Label style={{color: profit >= 0 ? 'green' : 'red', marginLeft:'8px'}}>Profit: ${profit.toFixed(2)}</Label>
                <Button color='success' size='sm' style={{marginLeft:'8px'}}>Sell {sell.qty * -1} shares</Button>
            </FormGroup>
            </Form>
        </>
    )

}

export default SellForm;