import React from "react";

export default class PageLayout extends React.Component {

    static propTypes = {
        header: React.PropTypes.string.isRequired,
        body: React.PropTypes.element.isRequired,
    };

    render() {
        return <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col-xs-6">
                        <span className="text-xxxl">{this.props.header}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        {this.props.body}
                    </div>
                </div>
            </div>
        </div>
    }
}