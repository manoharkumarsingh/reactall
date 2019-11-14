import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from './header'
import About from './about'
import App from "../App";
import Contact from "./contact";
import Reactjs from "../containers/react";
import Angularjs from "../containers/angular";
import Javascript from "../containers/javascript";
import Vuejs from "../containers/vue";
import Course from "../containers/course";
const Router = () => (
    <BrowserRouter>
        <div>
            <Header></Header>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/about" component={About} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/react/:id" component={Reactjs} />
                <Route exact path="/angular/:id" component={Angularjs} />
                <Route exact path="/javascript/:id" component={Javascript} />
                <Route exact path="/vue/:id" component={Vuejs} />
                <Route exact path="/course" component={Course} />
            </Switch>
        </div>
    </BrowserRouter>
);
export default Router;
