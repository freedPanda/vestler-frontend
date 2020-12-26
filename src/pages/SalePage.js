import React, { useEffect, useState } from 'react';
import { Card, Container, CardText,CardTitle, CardBody } from 'reactstrap';
import SellForm from '../forms/SellForm';
import '../css/pages.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

function SalePage(){

    const location = useLocation();
    let stock = location.state;
    const [stockData,setStockData] = useState(null);

    const BASE_API_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

    const token = useSelector(state => state.user.token);

    useEffect(()=>{
        async function getStock(){
            let res = await axios.get(`${BASE_API_URL}/stocks/data/${stock.symbol}?_token=${token}`)
            setStockData({...res.data.stock_data});
        }
        getStock();
    },[])

    if(!stockData){
        return(
            <Container>
                <h1>Loading...</h1>
            </Container>
        )
    }

    return(
        <Container fluid={true} style={{marginLeft:'2rem',marginRight:'2rem',borderLeft:'solid 1px maroon'}}>
            <Card style={{textAlign:'start', border:'none'}}>
                <CardBody style={{display:'flex'}}>
                    <CardText className={'item-stock'}><b>Current market value ${stockData.price.toFixed(2)}</b></CardText>             
                    <p className={'item-stock'} tag='h5'>{stock.symbol}</p>
                    <CardTitle className={'item-stock'} >{stock.name}</CardTitle>
                    <CardText className={'item-stock'} >{stock.qty} shares at ${stock.price.toFixed(2)}</CardText>
                    <CardText className={'item-stock'} >Total: ${(stock.qty * stock.price.toFixed(2)).toFixed(2)}</CardText>

                </CardBody>
            </Card>
            <SellForm stock={stock} currentPrice={stockData.price}/>
        </Container>
    )
}

export default SalePage;