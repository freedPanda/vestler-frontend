import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import {Card,CardBody,Button,CardTitle,CardText} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../css/pages.css';
import {v4 as uuid} from 'uuid';

function ViewMyStocks({display}){

    /**
     * View My Stocks Tab - meant for users to see
     * their current investments(what stocks the user
     * is still holding)
     */

    const BASE_API_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
    const history = useHistory();
    const username = useSelector(state => state.user.username);
    const token = useSelector(state => state.user.token);
    const [stocks,setStocks] = useState([]);

    useEffect(()=>{
        async function getUserStocks(){
            let res = await axios.get(`${BASE_API_URL}/transactions/investments/${username}?_token=${token}`);
            setStocks(res.data);
        }
        getUserStocks();
    },[])

    if(display !== 'stocks'){
        return(
            <div style={{display:'none'}}></div>
        )
    }

    if(stocks.length < 1){
        return(
            <Card>
                <h1>Start Investing!</h1>
                <Button onClick={()=>history.push('/stocks')}>View Stocks</Button>
            </Card>
        )
    }

    return(
        stocks.map(stock => (
            <Card key={uuid()} style={{border:'none'}}>
                <CardBody style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <p className={'item-stock'} tag='h5'>{stock.symbol}</p>
                    <CardTitle className={'item-stock'} >{stock.name}</CardTitle>
                    <CardText className={'item-stock'} >{stock.qty} shares at ${stock.price.toFixed(2)}</CardText>
                    <button color="info" className={'item-stock'} 
                    onClick={()=>history.push(`/stocks/${stock.symbol}`,stock)}>View</button> 
                    <button color="info"className={'item-stock'} 
                    onClick={()=>history.push(`/stocks/sell/${stock.symbol}`,stock)}>Sell</button>
                </CardBody>
            </Card>
        ))
    )
}
export default ViewMyStocks;