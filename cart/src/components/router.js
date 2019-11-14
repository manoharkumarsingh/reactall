import React from 'react';
import { BrowserRouter, Route,Switch} from "react-router-dom";
import ProductDetail from '../containers/active-product';
import Adduser from '../containers/add-user';
import Navbar from './navbar';
import {NotificationContainer} from 'react-notifications';

import App from '../App';

const Router = () => (
    <BrowserRouter>
    <div>
      <Route component={Navbar}></Route>
      <Switch>
        <Route exact path="/" component={App}></Route>
        <Route path="/userdeatils/:id" component={ProductDetail}></Route>
        <Route path="/adduser" component={Adduser}></Route>
      </Switch>
      <NotificationContainer></NotificationContainer>
      </div>
    </BrowserRouter>
);
export default Router;

