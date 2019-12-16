import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGithubRepos } from "../../actions/profile";
import Spinner from "../layout/Spinner";

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
	useEffect(() => {
		getGithubRepos(username);
	}, [getGithubRepos]);

	console.log(repos);

	return (
		<div className='profile-github'>
			<h2 className='text-primary my-1'>Github Repos</h2>
			{repos !== [] ? (
				<Fragment>
					<Spinner />
					{/* <h2>Github Repository Error!</h2>{" "} */}
				</Fragment>
			) : (
				repos.map(repo => (
					<div key={repo._id} className='repo bg-white p-1 my-1'>
						<div>
							<h4>
								<a
									href={repo.html_url}
									target='_blank'
									rel='noopener noreferrer'>
									{repo.name}
								</a>
							</h4>
						</div>
					</div>
				))
			)}
		</div>
	);
};

ProfileGithub.propTypes = {
	getGithubRepos: PropTypes.func.isRequired,
	repos: PropTypes.array.isRequired,
	username: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
	repos: state.profile.repos
});
export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
