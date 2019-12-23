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

// Add post
export const addPost = formData => async dispatch => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	};

	try {
		const res = await axios.post("/api/posts", formData, config);
		dispatch({
			type: types.ADD_POST,
			payload: res.data
		});
		dispatch(setAlert("Post created successfully", "success"));
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
export const addLike = id => async dispatch => {
	try {
		const res = await axios.put(`/api/posts/like/${id}`);
		dispatch({
			type: types.UPDATE_LIKES,
			payload: { id, likes: res.data }
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
export const removeLike = id => async dispatch => {
	try {
		const res = await axios.put(`/api/posts/unlike/${id}`);
		dispatch({
			type: types.UPDATE_LIKES,
			payload: { id, likes: res.data }
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

// Delete post
export const deletePost = id => async dispatch => {
	try {
		await axios.delete(`/api/posts/${id}`);
		dispatch({
			type: types.DELETE_POST,
			payload: id
		});
		dispatch(setAlert("Post Removed", "success"));
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

// Add Comment
export const addComment = (postId, formData) => async dispatch => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	};

	try {
		const res = await axios.post(
			`/api/posts/comment/${postId}`,
			formData,
			config
		);
		dispatch({
			type: types.ADD_COMMENT,
			payload: res.data
		});

		console.log(res.data);
		dispatch(setAlert("Comment Added!", "success"));
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

// Delete Comment
export const deleteComment = (postId, commentId) => async dispatch => {
	try {
		await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
		dispatch({
			type: types.REMOVE_COMMENT,
			payload: commentId
		});
		dispatch(setAlert("Comment Removed!", "success"));
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
