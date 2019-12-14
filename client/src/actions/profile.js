import axios from "axios";
import { setAlert } from "./alert";

import * as types from "./types";

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
	try {
		const res = await axios.get("api/profile/me");

		dispatch({
			type: types.GET_PROFILE,
			payload: res.data
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
		dispatch(setAlert(edit ? "Profile Updated" : "Profile Created" , 'success'));

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
