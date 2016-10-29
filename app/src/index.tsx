import * as React from "react";
import * as ReactDOM from "react-dom";

class Simple extends React.Component<any, any> {
    render() {
        return (<div>Hello world!</div>);
    }
}

ReactDOM.render(React.createElement(Simple), document.getElementById('content'));