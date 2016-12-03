import React from "react";
import {connect} from "react-redux";

export class CharactersPage extends React.Component {
    static propTypes = {
        account: React.PropTypes.object.isRequired,
    };

    render() {
        {
            "Players"
        }
    }
}

function mapStateToProps(state) {
    return {
        account: state.account,
    }
}

export default connect(mapStateToProps)(CharactersPage);