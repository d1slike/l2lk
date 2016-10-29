import * as React from "react";
import * as ReactDOM from "react-dom";
class Simple extends React.Component {
    render() {
        return (React.createElement("div", null, "Hello world!"));
    }
}
ReactDOM.render(React.createElement(Simple), document.getElementById('content'));
//# sourceMappingURL=index.js.map