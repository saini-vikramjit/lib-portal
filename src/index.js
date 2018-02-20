import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import AppRouter from './components/AppRouter';
import './css/style.css';

const Root = () => {
    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    )
} 

render(<Root/>,document.querySelector('#root'));