import React, { useEffect, useState } from 'react';
import { Container, InputGroup, Input, InputGroupAddon, Table, InputGroupText, Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import StockCard from '../StockCard';
import {getStocks} from '../actions/stocks';
import '../css/pages.css';
import axios from 'axios';
import {v4 as uuid} from 'uuid';

function StocksPage(){

    const token = useSelector(state => state.user.token);
    const dispatch = useDispatch();
    const stocks = useSelector(state => Object.keys(state.stocks));
    const BASE_API_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

    const [searchTerm,setSearchTerm] = useState("");
    const [searched, setSearched] = useState(false);
    const [searchResults, setSearchResults] = useState(false);
    
    //THE NEXT THREE LINES ARE IN USE FOR NOW
    let test = [];
    for(let i = 0; i < 20; i++){
        test.push(stocks[i]);
    }

    useEffect(()=>{
        if(stocks.length < 1){
            dispatch(getStocks(token));
        }
    },[dispatch])
    if(stocks.length < 1){
        return(
            <Container fluid={true}>
                <h1>Loading...</h1>
            </Container>
        )
    }

    function handleChange(evt){
        setSearchTerm(evt.target.value);
    }

    async function handleSearch(evt){
        console.log(evt);
        if(evt.key == 'Enter' || evt.target.id === 'button-search'){
            setSearched(true);
            let res = await axios.get(`${BASE_API_URL}/stocks/search/${searchTerm}?_token=${token}`)
            console.log(res.data);
            setSearchResults(res.data ? [...res.data] : null)
        }
    }
    if(searched){
        if(searchResults){
            return(
                <Container fluid={true}>
                    <Button color='info' onClick={()=>setSearched(false)}>All Stocks</Button>
                    <div style={{display:'flex',justifyContent:'center'}}>
                        <InputGroup>
                            <InputGroupAddon addonType='append' onClick={handleSearch} >
                                <InputGroupText id='button-search'>Search</InputGroupText>
                            </InputGroupAddon>
                            <Input onChange={handleChange} onKeyPress={handleSearch} type='text' name='term' placeholder='Search...'/>
                        </InputGroup>
                    </div>
                    <Table size='sm'>
                        <thead>
                            <tr>
                                <th>Logo</th>
                                <th>Ticker</th>
                                <th>Company</th>
                                <th>Type</th>
                                <th>Market Cap</th>
                                <th>Currency</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchResults.length > 0 
                            ? searchResults.map(stock =>(
                                <StockCard key={uuid()} symbol={stock.symbol}/>
                            )) 
                            : <h2>None found...</h2>}
                        </tbody>
                    </Table>
                </Container>
            )
        }
        return(
            <Container>
                <h3>Loading...</h3>
            </Container>
        )
    }

    return(
        <Container fluid={true}>
            <div style={{display:'flex',justifyContent:'center'}}>
                <InputGroup>
                    <InputGroupAddon addonType='append' onClick={handleSearch} >
                        <InputGroupText id='button-search'>Search</InputGroupText>
                    </InputGroupAddon>
                    <Input onChange={handleChange} onKeyPress={handleSearch} type='text' name='term' placeholder='Search...'/>
                </InputGroup>
            </div>
            <Table size='sm'>
                <thead>
                    <tr>
                        <th>Logo</th>
                        <th>Ticker</th>
                        <th>Company</th>
                        <th>Type</th>
                        <th>Market Cap</th>
                        <th>Currency</th>
                    </tr>
                </thead>
                <tbody>
                    {test.map(stock =>(
                        <StockCard key={uuid()} symbol={stock}/>
                    ))}
                </tbody>
            </Table>
        </Container>
    )

}

export default StocksPage;