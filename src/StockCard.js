import React from 'react';
import { Card, CardTitle, CardBody, CardText, NavItem, NavLink, CardImg, CardHeader } from 'reactstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './css/pages.css';

function StockCard({symbol}){

    const stock = useSelector(state => state.stocks[symbol]);
    const history = useHistory();

    return(
        
        <tr className={'row-stock'} onClick={()=>history.push(`/stocks/${stock.symbol}`,stock)}>
            <td ><img style={{height:'50px', maxWidth:'50px'}}src={stock.image_url} alt={'company logo'}/></td>
            <td>{stock.symbol}</td>
            <td>{stock.name}</td>
            <td>{stock.type}</td>
            <td>{stock.market_cap ? `$${stock.market_cap.toFixed(2)}`: 'unknown'}</td>
            <td>{stock.currency}</td>
        </tr>
    
    )

}
export default StockCard;