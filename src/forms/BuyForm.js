import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {Form,FormGroup,Label,Input,Button, Col, Progress} from 'reactstrap';
import { useHistory } from 'react-router-dom';

function BuyForm({stock}){

    //TODO: ensure only whole numbers for qty. use onInput={} 

    const BASE_API_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
    const token = useSelector(state => state.user.token);
    const username = useSelector(state => state.user.username);
    const history = useHistory();

    const [total, setTotal] = useState(0);
    const [qty, setQty] = useState(0);
    const [purchasing, setPurchasing] = useState(false);

    const handleChange = (evt) => {
        const {value} = evt.target;
        setQty(parseInt(value));
        setTotal(value * stock.price);
    }

    async function handleSubmit(evt){
        evt.preventDefault();
        setPurchasing(true);
        let body = {price:stock.price,total:total,symbol:stock.symbol,qty:qty}
        let res = await axios.post(`${BASE_API_URL}/transactions/${username}/purchase/${stock.symbol}?_token=${token}`,body)
        if(res.status === 201){
            let location = {pathname:'/purchase/success',state:{...res.data}}
            history.push(location);
        }
        console.log(res.status);
    }
    /** use current price, allow user to buy shares, display total price */
    return(
        <Form onSubmit={handleSubmit} style={{}}>
            <h6>Buy Stock</h6>
            <FormGroup row>
                <Label for='qty'>Qty: </Label>
                <Col>
                    <Input onChange={handleChange} type='number' id='qty' name='qty' min='0' step='1' required />
                </Col>
                <Label>Total: ${total.toFixed(2)}</Label>
            </FormGroup>
            <Button color='success' style={{display: purchasing ? 'none' : 'inline'}}>Purchase</Button>
            <div style={{display: purchasing ? 'inline' : 'none'}}>
                <Progress animated color='success' value='100' />
            </div>
        </Form>
    )

}

export default BuyForm;