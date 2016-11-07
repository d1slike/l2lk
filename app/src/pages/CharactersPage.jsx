import React from "react";
import {connect} from "react-redux";
import CircularProgress from "material-ui/CircularProgress";
import {Tabs, Tab} from "material-ui/Tabs";

export class CharactersPage extends React.Component {
    static propTypes = {
        account: React.PropTypes.object.isRequired,
    };

    render() {
        let element;
        if (!this.props.account.players) {
            element = <CircularProgress size={80} thickness={5}/>;
        } else {
            const size = this.props.account.players.length;
            if (size === 0) {
                element = <h1>Нет персонажей</h1>;
            } else {
                const tabs = [];
                this.props.account.players.forEach(player => {
                    let tab = <Tab label={player.name} key={player.name}>
                    </Tab>;
                    tabs.push(tab);
                });
                element = <Tabs>{tabs}</Tabs>
            }
        }
        return element;
    }
}

function mapStateToProps(state) {
    return {
        account: state.account,
    }
}

export default connect(mapStateToProps)(CharactersPage);