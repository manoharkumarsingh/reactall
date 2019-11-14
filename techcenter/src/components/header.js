import React from 'react';
import { NavLink } from "react-router-dom";
class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-default navbar-doublerow navbar-trans navbar-fixed-top">
                    <nav className="navbar navbar-top" style={{ borderRadius: "0px" }}>
                        <div className="container">
                            <ul className="nav navbar-nav pull-left">
                                <li><a href="#"><span className="glyphicon glyphicon glyphicon-bold text-white" /></a></li>
                                <li><a href="#"><span className="glyphicon glyphicon-globe text-white" /></a></li>
                                <li><a href="#"><span className="glyphicon glyphicon-pushpin text-white" /></a></li>
                            </ul>
                            <ul className="nav navbar-nav pull-right" style={{ padding: 9 }}>
                                <li><NavLink to={"/react"}><span className="text-white" />React Js</NavLink></li>
                                <li><NavLink to={"/vue"}><span className="text-white" />Vue Js</NavLink></li>
                                <li><NavLink to={"/javascript"}><span className="text-white" />Java Script</NavLink></li>
                                <li><NavLink to={"/angular"}><span className="text-white" />Angular Js</NavLink></li>
                            </ul>
                        </div>
                    </nav>

                    <nav className="navbar navbar-down">
                        <div className="container">
                            <div className="flex-container">
                                <div className="navbar-header flex-item">
                                    <div className="navbar-brand" href="#">Tech Connect</div>
                                </div>
                                <ul className="nav navbar-nav flex-item hidden-xs">
                                    <li><NavLink to={"/"}>Home</NavLink></li>
                                    <li><NavLink to={"/course"}>Courses</NavLink></li>
                                    <li><NavLink to={"/about"}>About</NavLink></li>
                                    <li><NavLink to={"/contact"}>Contact</NavLink></li>
                                </ul>
                                <ul className="nav navbar-nav flex-item hidden-xs pull-right">
                                    <li><a href="#" /></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </nav>
            </div>
        )
    }
}
export default Header;
