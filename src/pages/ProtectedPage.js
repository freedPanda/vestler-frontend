import React from 'react';
import StocksPage from './StocksPage';
import ProfilePage from './ProfilePage';
import StockDetails from './StockDetails';
import PurchasePage from './PurchasePage';

function ProtectedPage({component}){


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
                <StockDetails />
                </>
            )
        case 'purchase/success':
            return(
                <>
                <PurchasePage />
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