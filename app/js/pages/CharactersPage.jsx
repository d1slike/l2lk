import React from "react";
import PageLayout from "../components/PageLayout";
import {connect} from "react-redux";
import Spinner from "../components/Spinner";

export class CharactersPage extends React.Component {

    static propTypes = {
        players: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        isFetched: React.PropTypes.bool.isRequired,
    };

    renderTabs = () => {
        return <ul className="card-head nav nav-tabs tabs-accent-dark">
            {this.props.players.map((player, i) => {
                return <li key={player.name} className={!i ? 'active' : ''}>
                    <a href={'#' + player.name}>
                        {player.name}
                    </a>
                </li>
            })}
        </ul>
    };

    renderPlayersCards = () => {
        return <div className="card-body tab-content style-default-bright">

        </div>
    };

    renderBody = () => {
        return <div className="col-xs-12">
            { this.props.players.length ?
                <div className="card tabs-left style-default-light">
                    {this.renderTabs()}
                    {this.renderPlayersCards()}
                </div> : <i className="text-xxxl">Нет персонажей</i>
            }
        </div>
    };

    render() {
        return <PageLayout header="Персонажи" body={
            this.props.isFetched ? this.renderBody() : <Spinner/>
        }/>
    }

}

function mapStateToProps(state) {
    return {
        players: state.players.data,
        isFetched: state.account.dataIsFetched,
    }
}

export default connect(mapStateToProps)(CharactersPage);