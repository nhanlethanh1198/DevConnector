import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPost } from "../../actions/post";
import { withRouter } from "react-router-dom";


const PostForm = ({ pathMatch, getPost, auth: { user } }) => {
	useEffect(() => {
		getPost(pathMatch.params.id);
	}, [getPost]);

	return <div>Post </div>;
};

PostForm.propTypes = {
	getPost: PropTypes.func.isRequired
};

export default connect(null, { getPost })(withRouter(PostForm));
