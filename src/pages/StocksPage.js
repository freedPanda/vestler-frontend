import React, { useEffect, useState } from 'react';
import { Container, InputGroup, Input, InputGroupAddon, Table, InputGroupText, Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import StockCard from '../StockCard';
import PaginationComponent from '../helpers/PaginationComponent';
import {getStocks} from '../actions/stocks';
import {gotUser} from '../actions/user';
import '../css/pages.css';
import axios from 'axios';
import {v4 as uuid} from 'uuid';

function StocksPage(){

    const token = useSelector(state => state.user.token);
    const dispatch = useDispatch();
    const stocksInReduxStore = useSelector(state => Object.keys(state.stocks));
    const BASE_API_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

    const [stocks,setStocks] = useState([]);
    const [index,setIndex] = useState(200);
    const [searchTerm,setSearchTerm] = useState("");
    const [searched, setSearched] = useState(false);
    const [searchResults, setSearchResults] = useState(false);
     
    useEffect(()=>{
        //retrieve stocks from RESTful API
        if(stocksInReduxStore.length < 1){
            dispatch(getStocks(token));
        }
        
        
    },[dispatch])
    if(stocksInReduxStore.length > 0){
        if(stocks.length < 1){
            addStocks();
        }
    }

    //this passed to the Pagination component which uses this tell the stocks page
    //which stocks to display
    function changeIndex(num){
        setIndex(num);
        console.log('index', index, num);
        let arr = [];
        for(let i = num - 200; i < num; i++){
            arr.push(stocksInReduxStore[i]);
        }
        setStocks(arr);
    }

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
    if(!token){
        checkLocalStorage();
    }

    //this uses the index to get the next 200 stocks
    function addStocks(){
        let arr = [];
            for(let i = index - 200; i < index; i++){
                arr.push(stocksInReduxStore[i]);
            }
            setStocks(arr);
    }
   
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
        if(evt.key == 'Enter' || evt.target.id === 'button-search'){
            setSearched(true);
            let res = await axios.get(`${BASE_API_URL}/stocks/search/${searchTerm}?_token=${token}`)
            
            setSearchResults(res.data ? [...res.data] : null)
        }
    }

    //is user has searched then display search results
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

    //when there isn't a search term then display a number of stocks based upon the index value
    return(
        <Container fluid={'true'}>
            <div style={{display:'flex',justifyContent:'center'}}>
                <InputGroup>
                    <InputGroupAddon addonType='append' onClick={handleSearch} >
                        <InputGroupText id='button-search'>Search</InputGroupText>
                    </InputGroupAddon>
                    <Input onChange={handleChange} onKeyPress={handleSearch} type='text' name='term' placeholder='Search...'/>
                </InputGroup>
            </div>
            <div style={{display:'flex'}}>
                <PaginationComponent qty={stocksInReduxStore.length / 200} setIndex={changeIndex}/>
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
                    {stocks.map(stock =>(
                        <StockCard key={uuid()} symbol={stock}/>
                    ))}
                </tbody>
            </Table>
        </Container>
    )

}

export default StocksPage;