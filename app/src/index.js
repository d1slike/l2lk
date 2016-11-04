import {render} from "react-dom";
import {Provider} from "react-redux";
import React from "react";
import {Router, Route, IndexRoute, useRouterHistory} from "react-router";
import MainPage from "./pages/MainPage";
import AccountPage from "./pages/AccountPage";
import configureStore from "./store/Store";
import * as pathConst from "./const/PathConstats";
import {createHistory} from "history";

const store = configureStore({});
const routes = <Route path={pathConst.ROOT} component={MainPage}>
    <IndexRoute component={AccountPage}/> //TODO add components
    <Route path={pathConst.CHARS}/>
    <Route path={pathConst.STATISTIC}/>
    <Route path={pathConst.SHOP}/>
    <Route path={pathConst.CASH}/>
</Route>;
const appHistory = useRouterHistory(createHistory)({
    queryKey: false,
    basename: ''
});

class Main extends React.Component {

    render() {
        return <Provider store={store}>
            <Router history={appHistory}>
                {routes}
            </Router>
        </Provider>
    }
}

render(
    <Main/>, document.getElementById("container")
);
