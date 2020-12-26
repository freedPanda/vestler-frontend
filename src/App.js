import logo from './logo.svg';
import './App.css';
import {BrowserRouter} from 'react-router-dom'

import NavBar from "./navs/NavBar";
import Routes from './Routes';

import {Provider} from 'react-redux';
import {store} from './store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
          <Routes />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
