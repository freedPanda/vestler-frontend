import React from 'react';
import StocksPage from './StocksPage';
import ProfilePage from './ProfilePage';
import StockDetails from './StockDetails';
import PurchasePage from './PurchasePage';
import SalePage from './SalePage';

function ProtectedPage({component,stock}){

    /**
     * Proctected Page - used by Protected route
     * component to return the requested page
     */

    switch(component){
        case 'stocks':
            return(
                <>
                <StocksPage />
                </>
            )
        case 'profile':
            return(
                <>
                <ProfilePage />
                </>
            )
        case 'stock':
            return(
                <>
                <StockDetails stockInfo={stock}/>
                </>
            )
        case 'purchase/success':
            return(
                <>
                <PurchasePage />
                </>
            )
        case 'stock/sell':
            return(
                <>
                <SalePage stockInfo={stock}/>
                </>
            )
        default:
            return(
                <>
                </>
            )
    }
}
export default ProtectedPage;