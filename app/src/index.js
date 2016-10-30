"use strict";
var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
var React = require("react");
var ReactDOM = require("react-dom");
var Simple = (function (_super) {
    __extends(Simple, _super);
    function Simple() {
        _super.apply(this, arguments);
    }

    Simple.prototype.render = function () {
        return (<div>Hello world!</div>);
    };
    return Simple;
}(React.Component));
ReactDOM.render(React.createElement(Simple), document.getElementById('content'));
//# sourceMappingURL=index.js.map