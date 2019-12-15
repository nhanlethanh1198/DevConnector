import React from "react";
import PropTypes from "prop-types";

const ProfilesItem = ({
	profile: {
		user: { _id, name, avatar },
		status,
		company,
		location,
		skills
	}
}) => {
	return (
		<div className='profile bg-light'>
			<img src={avatar} alt='' className='round-img' />
			{/* Video 54 13:25 */}
		</div>
	);
};

ProfilesItem.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfilesItem;
