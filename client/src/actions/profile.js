import axios from "axios";
import { setAlert } from "./alert";

import * as types from "./types";

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
	try {
		const res = await axios.get("api/profile/me");

		dispatch({
			type: types.GET_PROFILE,
			payload: res.data // Object
		});
	} catch (error) {
		dispatch({
			type: types.PROFILE_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status
			}
		});
	}
};

// Create and update profile
export const createProfile = (
	formData,
	history,
	edit = false
) => async dispatch => {
	try {
		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		};

		const res = await axios.post("/api/profile", formData, config);

		dispatch({
			type: types.GET_PROFILE,
			payload: res.data
		});
		dispatch(
			setAlert(edit ? "Profile Updated" : "Profile Created", "success")
		);

		if (!edit) {
			history.push("/dashboard");
		}
	} catch (error) {
		const errors = error.response.data.errors;
		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
		}

		dispatch({
			type: types.PROFILE_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status
			}
		});
	}
};

// Get profile by ID
export const getProfileById = userId => async dispatch => {
	try {
		const res = axios.get(`/api/profile/user/${userId}`);
		dispatch({
			type: types.GET_PROFILE,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: types.PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};

// Get all profiles
export const getProfiles = () => async dispatch => {
	dispatch({
		type: types.CLEAR_PROFILE
	});

	try {
		const res = await axios.get("/api/profile");
		dispatch({
			type: types.GET_PROFILES,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: types.PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};

// Get Github repos
export const getGithubRepos = username => async dispatch => {
	try {
		const res = await axios.get(`api/profile/github/${username}`);
		dispatch({
			type: types.GET_REPOS,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: types.PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};

// Add Education
export const addEducation = (formData, history) => async dispatch => {
	try {
		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		};

		const res = await axios.put("/api/profile/education", formData, config);
		dispatch({
			type: types.GET_PROFILE,
			payload: res.data
		});
		dispatch(setAlert("Education Added!", "success"));
		history.push("/dashboard");
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
		}
	}
};

// Add Experience
export const addExperience = (formData, history) => async dispatch => {
	try {
		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		};

		const res = await axios.put(
			"/api/profile/experience",
			formData,
			config
		);
		dispatch({
			type: types.GET_PROFILE,
			payload: res.data
		});
		dispatch(setAlert("Experience Added!", "success"));
		history.push("/dashboard");
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
		}
	}
};

// Delete experience
export const deleteExperience = id => async dispatch => {
	try {
		const res = await axios.delete(`/api/profile/experience/${id}`);

		dispatch({
			type: types.UPDATE_PROFILE,
			payload: res.data
		});

		dispatch(setAlert("Experience Removed", "success"));
	} catch (err) {
		dispatch({
			type: types.PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};

// Delete experience
export const deleteEducation = id => async dispatch => {
	try {
		const res = await axios.delete(`/api/profile/education/${id}`);

		dispatch({
			type: types.UPDATE_PROFILE,
			payload: res.data
		});

		dispatch(setAlert("Education Removed", "success"));
	} catch (err) {
		dispatch({
			type: types.PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};

// Delete Account & profile
export const deleteAccount = id => async dispatch => {
	if (window.confirm("Are you sure? This can NOT be undone!")) {
		try {
			const res = await axios.delete("/api/profile");

			dispatch({ type: types.CLEAR_PROFILE });
			dispatch({ type: types.ACCOUNT_DELETED });

			dispatch(
				setAlert(
					"Your account has been permanantly deleted.",
					"success"
				)
			);
		} catch (err) {
			dispatch({
				type: types.PROFILE_ERROR,
				payload: {
					msg: err.response.statusText,
					status: err.response.status
				}
			});
		}
	}
};
