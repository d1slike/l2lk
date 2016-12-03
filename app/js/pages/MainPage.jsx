import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {bindActionCreators} from "redux";
import Header from "./_MainPage/Header";
import Menu from "./_MainPage/Menu";
import * as accountActions from "../actions/accountActions";
import * as balanceActions from "../actions/balanceActions";

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

    render() {
        return <div>
            <Header/>
            <div id="base">
                <div className="offcanvas">
                </div>
                <div id="content">
                    <section>
                        <div className="section-body">
                            {this.props.children}
                        </div>
                    </section>
                </div>
                <Menu location={this.props.location.pathname}/>
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
export default connect(mapStateToProps, mapDispatchToProps)(MainPage)

