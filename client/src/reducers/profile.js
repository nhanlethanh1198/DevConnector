import * as types from "../actions/types";

const initialState = {
	profile: null,
	profiles: [],
	repos: [],
	loading: true,
	error: {}
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case types.GET_PROFILE:
		case types.UPDATE_PROFILE:
			return {
				...state,
				profile: payload,
				loading: false
			};
		case types.GET_PROFILES:
			return {
				...state,
				profiles: payload,
				loading: false
			}
		case types.PROFILE_ERROR:
			return {
				...state,
				error: payload,
				loading: false
			};
		case types.CLEAR_PROFILE:
			return {
				...state,
				profile: null,
				repos: [],
				loading: false
			};
			case types.GET_REPOS:
				return {
					...state,
					repos: payload,
					loading: false 
				}
		default:
			return state;
	}
}
