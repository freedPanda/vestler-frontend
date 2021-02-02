import logo from './logo.svg';
import './App.css';
import {BrowserRouter} from 'react-router-dom'

import NavBar from "./navs/NavBar";
import Routes from './Routes';

import {Provider} from 'react-redux';
import {store} from './store';
import { Container } from 'reactstrap';

function App() {

  return (
    <Container>
        <div className="App">
        <Provider store={store}>
          <BrowserRouter>
            <NavBar />
            <Routes />
          </BrowserRouter>
        </Provider>
      </div>
    </Container>
    
  );
}

export default App;
