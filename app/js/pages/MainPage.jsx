import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {bindActionCreators} from "redux";
import Header from "./_MainPage/Header";
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
                <div id="menubar" className="menubar-inverse animate">
                    <div className="menubar-fixed-panel">
                        <div>
                            <a className="btn btn-icon-toggle btn-default menubar-toggle ink-reaction"
                               data-toggle="menubar"
                               href="javascript:void(0);">
                                <i className="fa fa-bars"></i>
                            </a>
                        </div>
                        <div className="expanded">
                            <a href="../../html/dashboards/dashboard.html">
                                <span className="text-lg text-bold text-primary ">MATERIAL ADMIN</span>
                            </a>
                        </div>
                    </div>
                    <div className="menubar-scroll-panel">
                        <ul id="main-menu" className="gui-controls">
                            <li>
                                <a href="../../html/dashboards/dashboard.html" className="active">
                                    <div className="gui-icon"><i className="fa fa-home"></i></div>
                                    <span className="title">Dashboard</span>
                                </a>
                            </li>
                            <li>
                                <a href="../../html/layouts/builder.html">
                                    <div className="gui-icon"><i className="fa fa-web"></i></div>
                                    <span className="title">Layouts</span>
                                </a>
                            </li>
                        </ul>
                        <div className="menubar-foot-panel">
                            <small className="no-linebreak hidden-folded">
                                <span className="opacity-75">Copyright &copy; 2014</span> <strong>CodeCovers</strong>
                            </small>
                        </div>
                    </div>
                </div>
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

