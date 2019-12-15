import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profile";
import { useParams, useLocation, withRouter } from "react-router-dom";

const Profile = ({ getProfileById, profile: { profile, loading }, auth, match }) => {
	useEffect(() => {
		getProfileById(match.params.id);
	}, [getProfileById, match.params.id]);
	// Get params

	return <div>profile</div>;
};

Profile.propTypes = {
	getProfileById: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth
});
export default connect(mapStateToProps, { getProfileById })(
	withRouter(Profile)
);
