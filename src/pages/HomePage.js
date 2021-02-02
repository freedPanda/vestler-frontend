import React, {useEffect} from 'react';
import {Jumbotron} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {gotUser} from '../actions/user';

function HomePage(){

    const dispatch = useDispatch();
    const history = useHistory();

  useEffect(()=>{

    function checkLocalStorage(){
      
        let user = window.localStorage.getItem('user');
        user = JSON.parse(user);
        if(user){
            dispatch(gotUser(user));
            history.push('/profile');
        }
    }

    checkLocalStorage();

  },[])
    return(
        <>
        <head>
            Vestler is a community of investers who want to connect with each other to discuss stocks.
        </head>
        <body>
            <main>
                <Jumbotron>
                    <h1>Welcome to Vestler</h1>
                    <p>
                        Vestler is a web app stock simulator. 
                        Every investor is provided with $50,000 pretend dollars to buy and sell stock on the US exchange.
                        There is also a modified version of options. 
                    </p>
                    <p>
                        Signup is free for anyone. After signup you are granted access to view information about stocks on the
                        U.S. exchange.
                    </p>
                </Jumbotron>
            </main>
        </body>
        </>
    )
}
export default HomePage;