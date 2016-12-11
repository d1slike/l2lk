import React from "react";
import PageLayout from "../components/PageLayout";
import {connect} from "react-redux";
import Spinner from "../components/Spinner";
import * as accountActions from "../actions/accountActions";
import {bindActionCreators} from "redux";

class AccountPage extends React.Component {

    static propTypes = {
        account: React.PropTypes.object.isRequired,
        isFetched: React.PropTypes.bool.isRequired,
    };

    renderActions = () => {
        return <div className="card-actionbar">
            <div className="card-actionbar-row">
                <a href="javascript:void(0);" className="btn btn-flat btn-accent ink-reaction waves-effect waves-dark">
                    Сменить пароль
                </a>
                <a href="javascript:void(0);" className="btn btn-flat btn-default ink-reaction waves-effect waves-dark">
                    Выйти
                </a>
            </div>
        </div>
    };

    renderState = () => {
        const banned = this.props.account.state.ban;
        return <span className={banned ? 'text-danger' : 'text-success'}>
            <b>{banned ? 'Заблокирован' : 'Не заблокирован'}</b>
            {banned && <span>
                <br/>Дата разблокирования: {this.props.account.state.banExpireDate || '---'}</span>}
        </span>
    };

    renderUnbanBuyButton = () => {
        const banned = this.props.account.state.ban;
        return banned ? <a className="btn btn-flat ink-reaction waves-effect waves-dark"
                           onClick={() => {
                           }}>
            <i className="fa fa-user-times"></i>
        </a> : null;
    };

    renderPremiumState = () => {
        const premium = this.props.account.premiumState.premium;
        return <span className={premium ? 'text-accent' : 'text-warning'}>
            <b>{premium ? 'Активирована' : 'Не активирована'}</b>
            {premium && <span>
                <br/>Дата окончания: {this.props.account.premiumState.premiumExpireDate || '---'}
            </span>}
        </span>
    };

    renderPremiumBuyButton = () => {
        const premium = this.props.account.premiumState.premium;
        return !premium ? <a className="btn btn-flat ink-reaction waves-effect waves-dark"
                             onClick={() => {
                             }}>
            <i className="fa fa-shopping-cart"></i>
        </a> : null;
    };

    renderBody() {
        return <div className="col-md-offset-3 col-md-6">
            <div className="card">
                <div className="card-head card-head-lg style-primary">
                    <header>{this.props.account.login}</header>
                </div>
                <div className="card-body">
                    <ul className="list divider-full-bleed">
                        <li className="tile">
                            <a className="tile-content waves-effect waves-dark">
                                <div className="tile-icon">
                                    <i className="fa fa-envelope"/>
                                </div>
                                <div className="tile-text">
                                    <b>E-mail</b>
                                    <br/>
                                    {this.props.account.email}
                                </div>
                            </a>
                            <a className="btn btn-flat ink-reaction waves-effect waves-dark">
                                <i className="fa fa-pencil"></i>
                            </a>
                        </li>
                        <li className="tile">
                            <a className="tile-content waves-effect waves-dark">
                                <div className="tile-icon">
                                    <i className="fa fa-calendar-plus-o"/>
                                </div>
                                <div className="tile-text">
                                    <b>Дата регистрации</b>
                                    <br/>
                                    {this.props.account.registrationDate}
                                </div>
                            </a>
                        </li>
                        <li className="tile">
                            <a className="tile-content waves-effect waves-dark">
                                <div className="tile-icon">
                                    <i className="fa fa-lock"/>
                                </div>
                                <div className="tile-text">
                                    <b>Последний заход в игру</b>
                                    <br/>
                                    {this.props.account.lastAccessDate || '---'}
                                </div>
                            </a>
                        </li>
                        <li className="tile">
                            <a className="tile-content waves-effect waves-dark">
                                <div className="tile-icon">
                                    <i className="fa fa-check-square-o"/>
                                </div>
                                <div className="tile-text">
                                    <b>Последний IP адресс</b>
                                    <br/>
                                    {this.props.account.lastIp || '---'}
                                </div>
                            </a>
                        </li>
                        <li className="tile">
                            <a className="tile-content waves-effect waves-dark">
                                <div className="tile-icon">
                                    <i className="fa fa-lightbulb-o"/>
                                </div>
                                <div className="tile-text">
                                    <b>Статус</b>
                                    <br/>
                                    {this.renderState()}
                                </div>
                            </a>
                            {this.renderUnbanBuyButton()}
                        </li>
                        <li className="tile">
                            <a className="tile-content waves-effect waves-dark">
                                <div className="tile-icon">
                                    <i className="fa fa-gift"/>
                                </div>
                                <div className="tile-text">
                                    <b>Премиальная подписка</b>
                                    <br/>
                                    {this.renderPremiumState()}
                                </div>
                            </a>
                            {this.renderPremiumBuyButton()}
                        </li>
                    </ul>
                </div>
                {this.renderActions()}
            </div>
        </div>
    }

    render() {
        return <PageLayout header="Аккаунт" body={
            this.props.isFetched ? this.renderBody() : <Spinner/>
        }/>
    }
}

function mapStateToProps(state) {
    return {
        account: state.account.data,
        isFetched: state.account.dataIsFetched,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        accountActions: bindActionCreators(accountActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage)