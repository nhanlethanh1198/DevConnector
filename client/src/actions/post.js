import axios from "axios";
import { setAlert } from "./alert";
import * as types from "./types";

// Get all posts
export const getPosts = () => async dispatch => {
	try {
		const res = await axios.get("/api/posts");
		dispatch({
			type: types.GET_POSTS,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: types.POST_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};

// Get post
export const getPost = id => async dispatch => {
	try {
		const res = await axios.get(`/api/posts/${id}`);
		dispatch({
			type: types.GET_POST,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: types.POST_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};

// Add like
export const addLike = postId => async dispatch => {
	try {
		const res = await axios.put(`/api/posts/like/${postId}`);
		dispatch({
			type: types.UPDATE_LIKES,
			payload: { postId, likes: res.data }
		});
	} catch (err) {
		dispatch({
			type: types.POST_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};

// Remove like
export const removeLike = postId => async dispatch => {
	try {
		const res = await axios.put(`/api/posts/unlike/${postId}`);
		dispatch({
			type: types.UPDATE_LIKES,
			payload: { postId, likes: res.data }
		});
	} catch (err) {
		dispatch({
			type: types.POST_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};
