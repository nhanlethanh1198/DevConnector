import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isisAuthenticated, loading }, logout }) => {
	const authLinks = (
		<ul>
			<li>
				<a onClick={logout} href='!#'>
					<i className='fas fa-sign-out'></i>
					Developers
				</a>
			</li>
		</ul>
	);
	const guestLinks = (
		<ul>
			<li>
				<Link href='!#'>Developers</Link>
			</li>
			<li>
				<Link href='/register'>Register</Link>
			</li>
			<li>
				<Link href='/login'>Login</Link>
			</li>
		</ul>
	);

	return (
		<nav className='navbar bg-dark'>
			<h1>
				<Link to='/'>
					<i className='fas fa-code' /> DevConnector
				</Link>
			</h1>
		</nav>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
