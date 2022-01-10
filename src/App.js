import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from './styles/GlobalStyle';
import Header from './components/Header';
import Routes from './routes';

function App() {

  return (
    
    <React.Fragment>
      <GlobalStyle />
      <BrowserRouter basename='/sonhobets'>
        <Routes />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
