import React, { useEffect } from "react";
// Redux
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { loadUser } from "./actions/auth";
import "./App.css";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Routes from "./components/routing/Routes";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";

// Check token
if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<Navbar />
				<Route exact path='/' component={Landing} />
				<Route component={Routes} />
			</Router>
		</Provider>
	);
};

export default App;
