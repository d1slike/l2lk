import React from "react";

export default class Header extends React.Component {

    static propTypes = {};

    render() {
        return <header id="header">
            <div className="headerbar">
                <div className="headerbar-left">
                    <ul className="header-nav header-nav-options">
                        <li className="header-nav-brand">
                            <div className="brand-holder">
                                <a href="">
                                    <span className="text-lg text-bold text-primary">L2LK</span>
                                </a>
                            </div>
                        </li>
                        <li>
                            <a className="btn btn-icon-toggle menubar-toggle" data-toggle="menubar"
                               href="javascript:void(0);">
                                <i className="fa fa-bars"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="headerbar-right">
                    <ul className="header-nav header-nav-options">
                    </ul>
                </div>
            </div>
        </header>
    }
}
        

