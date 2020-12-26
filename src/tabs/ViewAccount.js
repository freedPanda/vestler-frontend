import React, { useState, useEffect } from 'react';
import {Table} from 'reactstrap'
import { useSelector } from 'react-redux';
import axios from 'axios';
import {v4 as uuid} from 'uuid';

function ViewAccount({display}){

    const username = useSelector(st => st.user.username);
    const token = useSelector(st => st.user.token);
    const BASE_API_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

    const [balance, setBalance] = useState(null);
    const [netGains, setNetGains] = useState(null);

    useEffect(()=>{
        async function getBalance(){
            let res = await axios.get(`${BASE_API_URL}/transactions/balance/${username}?_token=${token}`);
            setBalance(res.data);
            console.log('balance',balance);
        };
        async function getNetGains(){
            let res = await axios.get(`${BASE_API_URL}/transactions/netgains/${username}?_token=${token}`);
            setNetGains([...res.data]);
            console.log('netgains',netGains);
        };
        getBalance();
        getNetGains();
    },[])

    function setProfitColor(profit){
        if(profit > 0){
            return 'green';
        }
        else if(profit < 0){
            return 'red';
        }
        return 'black';
    }

    if(display !== 'account'){
        return(
            <div style={{display:'none'}}></div>
        )
    }
    if(!balance || !netGains){
        return(
            <h1>Loading...</h1>
        )
    }

    return(
        <div>
            <h6>Account Balance: ${balance.toFixed(2)}</h6>
            <Table striped size='sm'>
                <thead>
                    <tr>
                        <th>Sell Date</th>
                        <th>Ticker</th>
                        <th>Market Value</th>
                        <th>Purchase Value</th>
                        <th>Shares</th>
                        <th>Profit</th>
                    </tr>
                </thead>
                <tbody>
                    {netGains.map(sale => (
                        <tr key={uuid()}>
                            <td>{sale.month}-{sale.day}-{sale.year}</td>
                            <td>{sale.symbol}</td>
                            <td>${sale.market_price.toFixed(2)}</td>
                            <td>${sale.price.toFixed(2)}</td>
                            <td>{sale.qty}</td>
                            <td style={{color:setProfitColor(sale.profit)}}>${sale.profit.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
export default ViewAccount;