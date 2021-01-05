import React, { useEffect, useState } from 'react';
import {Card,Container, CardImg, CardBody} from 'reactstrap';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import BuyForm from '../forms/BuyForm';
import OptionForm from '../forms/OptionForm';
import {gotUser} from '../actions/user';

function StockDetails({stockInfo}){

    const BASE_API_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
    const dispatch = useDispatch();
    const history = useHistory();

    const stock = stockInfo;
    const token = useSelector(state => state.user.token);
    
    const [stockData,setStockData] = useState(null);

    /**check local storage  */
    function checkLocalStorage(){
        try{
          let user = window.localStorage.getItem('user');
          user = JSON.parse(user);
          if(user.token){
              console.log('local storage result',user);
              dispatch(gotUser(user));
              history.push(`/stocks/${stock.symbol}`,stock)
          }
        }catch(err){
          console.log(err);
        }
      }
    if(!token){
        checkLocalStorage();
    }

    useEffect(()=>{
        
        async function getStock(){
            let res = await axios.get(`${BASE_API_URL}/stocks/data/${stock.symbol}?_token=${token}`);
            
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
        <Container>
            <Card style={{border:'none'}}>
                <div style={{display:'flex'}}>
                    <div>
                        <CardImg src={stock.image_url} style={{width:'200px'}} alt='Company Logo'></CardImg>
                        <CardBody src={{padding:'2rem'}}>
                            <h2>
                                {stock.name}
                            </h2>
                            <h2>
                                Ticker:{stock.symbol}
                            </h2>
                        </CardBody>
                    </div>
                    
                    <div style={{textAlign:'right',padding:'2rem',display:'flex',flexWrap:'wrap'}}>
                        <h1 style={{width:'100%'}}><b>Current:</b> ${stockData.price.toFixed(2)}</h1>
                    
                        <h4 style={{width:'100%'}}><b>Low: </b>${stockData.low_day.toFixed(2)}</h4>
                        <h4 style={{width:'100%'}}><b>High: </b>${stockData.high_day.toFixed(2)}</h4>
                        <h4 style={{width:'100%'}}><b>Open: </b>${stockData.price_open.toFixed(2)}</h4>
                        <h4 style={{width:'100%'}}><b>Previous Close: </b>${stockData.previous_close.toFixed(2)}</h4>
                    </div>
                </div> 
                <div style={{display:'flex'}}>
                    <BuyForm stock={{...stock,...stockData}}/>
    
                </div>   
                <OptionForm stock={{...stock}}/>
            </Card>
        </Container>
    )
}

export default StockDetails;