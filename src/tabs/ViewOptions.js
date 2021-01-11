import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import { Table } from 'reactstrap';
import {v4 as uuid} from 'uuid';

function ViewOptions({display}){

    /**
     * View Options Tab - meant to display all options
     * the user has placed ever. If the option has not completed
     * then the result price displays pending
     */

    const BASE_API_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
    const username = useSelector(state =>state.user.username);
    const token = useSelector(state => state.user.token);

    const [options, setOptions] = useState(null);

    useEffect(()=>{
        async function getOptions(){
            let res = await Axios.get(`${BASE_API_URL}/options/all/${username}?_token=${token}`);
            setOptions([...res.data]);
        }
        getOptions();
    },[])

    if(!options){
        return(
            <h2 style={{display:display === 'options' ? 'inline-block':'none'}}>Options loading...</h2>
        )
    }
    function getDate(date){
        let de = new Date(Number(date));
        return de.toLocaleDateString();
    }
    function getTime(date){
        let de = new Date(Number(date));
        return de.toLocaleTimeString();
    }
    return(
        <div style={{display:display === 'options' ? 'inline-block':'none'}}>
            <Table striped size='sm'>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Target</th>
                        <th>Result</th>
                        <th>Amount</th>
                        <th>End Date</th>
                        <th>End Time</th>
                        <th>Symbol</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {options.map(option=>(
                        <tr key={uuid()}>
                            <td>{option.o_type}</td>
                            <td>${option.target.toFixed(2)}</td>
                            <td>{option.result_price ? `$${option.result_price.toFixed(2)}` : 'pending'}</td>
                            <td>${option.amount.toFixed(2)}</td>
                            <td>{getDate(option.end_date)}</td>
                            <td>{getTime(option.end_date)}</td>
                            <td>{option.symbol}</td>
                            <td>{getDate(option.p_date)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
    
}
export default ViewOptions;