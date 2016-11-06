import {render} from "react-dom";
import {Provider} from "react-redux";
import React from "react";
import {Router, Route, IndexRoute, useRouterHistory} from "react-router";
import MainPage from "./pages/MainPage";
import AccountPage from "./pages/AccountPage";
import CashPage from "./pages/CashPage";
import CharactersPage from "./pages/CharactersPage";
import ShopPage from "./pages/ShopPage";
import StatisticPage from "./pages/StatisticPage";
import configureStore from "./store/Store";
import * as pathConst from "./const/PathConstats";
import {createHistory} from "history";
import injectTapEventPlugin from "react-tap-event-plugin";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "../css/base.css";

injectTapEventPlugin(); //for material ui

const store = configureStore({});

const routes = <Route path={pathConst.ROOT} component={MainPage}>
    <IndexRoute component={AccountPage}/>
    <Route path={pathConst.CHARS} component={CharactersPage}/>
    <Route path={pathConst.STATISTIC} component={StatisticPage}/>
    <Route path={pathConst.SHOP} component={ShopPage}/>
    <Route path={pathConst.CASH} component={CashPage}/>
</Route>;
const appHistory = useRouterHistory(createHistory)({
    queryKey: false,
    basename: ''
});

class Main extends React.Component {

    render() {
        return <MuiThemeProvider>
            <Provider store={store}>
                <Router history={appHistory}>
                    {routes}
                </Router>
            </Provider>
        </MuiThemeProvider>
    }
}

render(
    <Main/>, document.getElementById("container")
);
