import React from "react";
import {connect} from "react-redux";

export class CharactersPage extends React.Component {
    static propTypes = {
        account: React.PropTypes.object.isRequired,
    };

    render() {
        return <div className="row">
            players
        </div>
    }

}

function mapStateToProps(state) {
    return {
        account: state.account,
    }
}

export default connect(mapStateToProps)(CharactersPage);