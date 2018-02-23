import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';

import App from './App';
import StorePicker from './StorePicker';
import Contact from './Contact';
import NoMatch from './NoMatch';

//import '../css/navigation.css';


const Navigation = () => (
    <nav>
        <ul>
            <li><NavLink activeClassName='current' to='/'>Home</NavLink></li>
            <li><NavLink activeClassName='current' to='/contact'>Contact Us</NavLink></li>
        </ul>    
    </nav>    
);

const Switching= () => (
    <div>
        <Switch>
            <Route exact path="/" component={StorePicker} />
            <Route exact path="/store/:storeId" component={App} />
            <Route exact path="/contact" component={Contact} />
            <Route component={NoMatch} />
        </Switch>
    </div>
);

const AppRouter = () => (
    <div className='app'>
        {/* <h1>Application Router</h1>
        <Navigation /> */}
        <Switching />
    </div>
);

export default AppRouter;