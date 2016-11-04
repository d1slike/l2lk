import React from "react";

export default class MainPage extends React.Component {

    static propTypes = {
        children: React.PropTypes.element //from router
    };

    render() {
        return this.props.children;
    };
}
