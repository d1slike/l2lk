import React from "react";
import * as Path from "./../../const/PathConstats";
import {Link} from "react-router";

export default class Menu extends React.Component {

    static items = [
        {name: "Аккаунт", link: Path.ROOT, icon: "fa fa-address-card", subitems: []},
        {name: "Персонажи", link: Path.CHARS, icon: "fa fa-group", subitems: []},
        {name: "Статистика", link: Path.STATISTIC, icon: "fa fa-bar-chart", subitems: []},
        {name: "Магазин", link: Path.SHOP, icon: "fa fa-shopping-cart", subitems: []},
        {name: "Баланс", link: Path.CASH, icon: "fa fa-rub", subitems: []},
    ];

    static propTypes = {
        location: React.PropTypes.string.isRequired,
    };

    static contextTypes = {
        router: React.PropTypes.object
    };

    render() {
        return <div id="menubar" className="menubar-inverse animate">
            <div className="menubar-fixed-panel">
                <div>
                    <a className="btn btn-icon-toggle btn-default menubar-toggle ink-reaction"
                       data-toggle="menubar">
                        <i className="fa fa-bars"/>
                    </a>
                </div>
            </div>
            <div className="menubar-scroll-panel">
                <ul id="main-menu" className="gui-controls">
                    {Menu.items.map((item, i) => {
                        const hasSubItems = item.subitems.length;
                        return <li key={i} className={(hasSubItems ? 'gui-folder' : '')
                        + (this.props.location === item.link ? 'active' : '')}>
                            <Link to={item.link} activeClassName={"active"}>
                                <div className="gui-icon"><i className={item.icon}/></div>
                                <span className="title">{item.name}</span>
                            </Link>
                            {hasSubItems ?
                                <ul>
                                    {item.subitems.map((subitem, j)=> <li key={i + " " + j}>
                                        <Link to={subitem.link}><span className="title">{subitem.name}</span></Link>
                                    </li>)}
                                </ul> : null
                            }
                        </li>;
                    })}
                </ul>
                <div className="menubar-foot-panel">
                    <small className="no-linebreak hidden-folded">
                        <span className="opacity-75">Copyright &copy; 2014</span> <strong>CodeCovers</strong>
                    </small>
                </div>
            </div>
        </div>
    }
}