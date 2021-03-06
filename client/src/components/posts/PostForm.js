import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addPost } from "../../actions/post";

const PostForm = ({ addPost }) => {
	const [text, setText] = useState("");

	return (
		<div className='post-form'>
			<div className='bg-primary p'>
				<h3>Say Something...</h3>
			</div>
			<form
				className='form my-1'
				onSubmit={e => {
					e.preventDefault();
					addPost({ text });
					setText("");
				}}>
				<textarea
					name='text'
					cols={30}
					rows={5}
					placeholder='Create a post'
					value={text}
					onChange={e => setText(e.target.value)}
				/>
				<input
					type='submit'
					className='btn btn-dark my-1'
					defaultValue='Submit'
				/>
			</form>
		</div>
	);
};

export default connect(null, { addPost })(withRouter(PostForm));
