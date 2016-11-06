import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {bindActionCreators} from "redux";
import Toolbar from "./_MainPage/Toolbar";
import * as accountActions from "../actions/accountActions";
import * as Paths from "../const/PathConstats";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";

class MainPage extends React.Component {

    static propTypes = {
        children: React.PropTypes.element, //from router
        router: React.PropTypes.object, //from withRouter
        dataIsFetched: React.PropTypes.bool,
        account: React.PropTypes.object,
        menu: React.PropTypes.object,
        menuActions: React.PropTypes.any,
        accountActions: React.PropTypes.any,
    };

    componentDidMount() {
        if (!this.props.dataIsFetched) {
            this.props.accountActions.fetchAccountData();
        }
    }

    moveTo(target) {
        this.props.router.push(target);
    }

    render() {
        return <div id="wrapper">
            <Toolbar
                balance={this.props.account.data.balance || 0.0}
                showButtons={this.props.account.dataIsFetched || false}
            />
            <div id="sidebar-wrapper">
                <ul className="sidebar-nav">
                    <li>
                        <Menu>
                            <MenuItem primaryText={"Главная"} onClick={this.moveTo.bind(this, Paths.ROOT)}/>
                            <MenuItem primaryText={"Персонажи"} onClick={this.moveTo.bind(this, Paths.CHARS)}/>
                            <MenuItem primaryText={"Статистика"} onClick={this.moveTo.bind(this, Paths.STATISTIC)}/>
                            <MenuItem primaryText={"Магазин"} onClick={this.moveTo.bind(this, Paths.SHOP)}/>
                            <MenuItem primaryText={"Счет"} onClick={this.moveTo.bind(this, Paths.CASH)}/>
                        </Menu>;
                    </li>
                </ul>
            </div>
            <div className="page-content-wrapper">
                <div className="container-fluid">
                    {this.props.children}
                </div>
            </div>
        </div>
    };
}

function mapStateToProps(state) {
    return {
        account: state.account
    }
}

function mapDispatchToProps(dispatch) {
    return {
        accountActions: bindActionCreators(accountActions, dispatch),
    }
}
MainPage = withRouter(MainPage);
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
