import React from "react";
import FlatButton from "material-ui/FlatButton";
import IconButton from "material-ui/IconButton";
import Icon from "../../components/Icon";

export default class Toolbar extends React.Component {

    static propTypes = {
        balance: React.PropTypes.number.isRequired,
        showButtons: React.PropTypes.bool.isRequired,
    };

    render() {
        return <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand">L2LK</a>
                </div>
                <ul className="nav navbar-nav navbar-left">
                    <li>
                        <IconButton id="menu-toggle" href="#menu-toggle" onClick={(e) => {
                            e.preventDefault();
                            $("#wrapper").toggleClass("toggled");
                        }}><Icon name="list"/></IconButton>
                    </li>
                </ul>
                { this.props.showButtons &&
                <ul className="nav navbar-nav navbar-right">
                    <li className="navbar-btn">
                        <FlatButton label={"Баланс: " + this.props.balance + " руб."}/>
                    </li>
                    <li className="navbar-btn">
                        <FlatButton label="Выйти" primary={true}/>
                    </li>
                </ul>
                }
            </div>
        </nav>
    };
}