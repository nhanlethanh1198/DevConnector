import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({
	education: { school, degree, fieldofstudy, current, from, to, description }
}) => (
	<div className='text-dark'>
		{school}
		<p>
			<Moment format='YYYY/MM/DD'>{from}</Moment> -{" "}
			{!current ? " Now" : <Moment format='YYYY/MM/DD'>{to} </Moment>}
		</p>
		<p>
			<strong>Degree:</strong> {degree}
		</p>
		<p>
			<strong>Field of study:</strong> {fieldofstudy}
		</p>
		<p>
			<strong>Description:</strong> {description}
		</p>
	</div>
);
ProfileEducation.propTypes = {
	education: PropTypes.object.isRequired
};

export default ProfileEducation;
