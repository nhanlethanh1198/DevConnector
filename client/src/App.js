import React, { useEffect, Fragment } from "react";
// Redux
import { Provider } from "react-redux";
import {
	BrowserRouter as Router,
	Route,
	Switch
	// useParams
} from "react-router-dom";
import { loadUser } from "./actions/auth";
import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Alert from "./components/layout/Alert";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import PrivateRoute from "./components/routing/PrivateRoute";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
// import NotFound from "./components/layout/NotFound";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import Profiles from "./components/proflies/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import PostForm from "./components/posts/PostForm";

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
				<Switch>
					<Fragment>
						<section className='container'>
							<Alert />
							<Route path='/register' component={Register} />
							<Route exact path='/login' component={Login} />
							<Route
								exact
								path='/profiles'
								component={Profiles}
							/>

							<Route
								path='/profile/:id'
								exact
								render={({ match }) => <Profile />}
							/>

							<PrivateRoute
								auth
								path='/dashboard'
								component={Dashboard}
							/>
							<PrivateRoute
								auth
								path='/create-profile'
								component={CreateProfile}
							/>
							<PrivateRoute
								auth
								path='/edit-profile'
								component={EditProfile}
							/>
							<PrivateRoute
								auth
								path='/add-experience'
								component={AddExperience}
							/>
							<PrivateRoute
								auth
								path='/add-education'
								component={AddEducation}
							/>
							<PrivateRoute
								auth
								path='/posts'
								component={Posts}
							/>
							<PrivateRoute
								exact
								auth
								path='/posts/:id'
								component={PostForm}
							/>

							{/* <Route component={NotFound} /> */}
						</section>
					</Fragment>
				</Switch>
			</Router>
		</Provider>
	);
};

export default App;
