import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {bindActionCreators} from "redux";
import Toolbar from "./_MainPage/Toolbar";
import * as accountActions from "../actions/accountActions";
import * as balanceActions from "../actions/balanceActions";
import * as Paths from "../const/PathConstats";
import Icon from "../components/Icon";
import MenuItem from "material-ui/MenuItem";

class MainPage extends React.Component {

    static propTypes = {
        children: React.PropTypes.element, //from router
        router: React.PropTypes.object, //from withRouter
        account: React.PropTypes.object.isRequired,
        balance: React.PropTypes.object.isRequired,
        accountActions: React.PropTypes.any.isRequired,
        balanceActions: React.PropTypes.any.isRequired,
    };

    componentDidMount() {
        if (!this.props.dataIsFetched) {
            this.props.accountActions.fetchAccountData();
        }
        this.props.balanceActions.fetchBalanceData();
    }

    moveTo(target) {
        this.props.router.push(target);
    }

    render() {
        return <div id="wrapper">
            <Toolbar
                balance={this.props.balance.balance || 0.0}
                showButtons={this.props.account.dataIsFetched || false}
            />
            <div id="sidebar-wrapper">
                <ul className="sidebar-nav">
                    <li>
                        <MenuItem leftIcon={<Icon name="account_box"/>} primaryText={"Главная"}
                                  onClick={this.moveTo.bind(this, Paths.ROOT)}/>
                        <MenuItem leftIcon={<Icon name="supervisor_account"/>} primaryText={"Персонажи"}
                                  onClick={this.moveTo.bind(this, Paths.CHARS)}/>
                        <MenuItem leftIcon={<Icon name="show_chart"/>} primaryText={"Статистика"}
                                  onClick={this.moveTo.bind(this, Paths.STATISTIC)}/>
                        <MenuItem leftIcon={<Icon name="shopping_cart"/>} primaryText={"Магазин"}
                                  onClick={this.moveTo.bind(this, Paths.SHOP)}/>
                        <MenuItem leftIcon={<Icon name="account_balance_wallet"/>} primaryText={"Счет"}
                                  onClick={this.moveTo.bind(this, Paths.CASH)}/>
                    </li>
                </ul>
            </div>
            <div className="page-content-wrapper">
                    {this.props.children}
            </div>
        </div>
    };
}

function mapStateToProps(state) {
    return {
        account: state.account,
        balance: state.balance
    }
}

function mapDispatchToProps(dispatch) {
    return {
        accountActions: bindActionCreators(accountActions, dispatch),
        balanceActions: bindActionCreators(balanceActions, dispatch)
    }
}
MainPage = withRouter(MainPage);
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
