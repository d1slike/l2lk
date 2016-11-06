import React from "react";
import FontIcon from "material-ui/FontIcon";

export default class Icon extends React.Component {

    static propTypes = {
        name: React.PropTypes.string.isRequired,
        color: React.PropTypes.string,
        style: React.PropTypes.object
    };

    render() {
        return <FontIcon className="material-icons"
                         style={this.props.style}
                         color={this.props.color}>{this.props.name}</FontIcon>
    };
};