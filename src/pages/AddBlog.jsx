import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function AddBlog() {
	const { formData, setFormData, isEdit, setIsEdit } =
		useContext(GlobalContext);
	const navigate = useNavigate();
	const location = useLocation();

	async function handleSaveBlogToDatabase() {
		const response = isEdit
			? await axios.put(
					`http://localhost:8080/api/blogs/update/${location.state.getCurrentBlog._id}`,
					{
						title: formData.title,
						description: formData.description,
					}
			  )
			: await axios.post("http://localhost:8080/api/blogs/add", {
					title: formData.title,
					description: formData.description,
			  });

		const result = await response.data;
		console.log(result);
		if (result) {
			setIsEdit(false);
			setFormData({
				title: "",
				description: "",
			});
			navigate("/");
		}
	}

	useEffect(() => {
		if (location.state) {
			const { getCurrentBlog } = location.state;
			setIsEdit(true);
			setFormData({
				title: getCurrentBlog.title,
				description: getCurrentBlog.description,
			});
		}
	}, [location]);

	return (
		<div className="add-blog-container">
			<h1>{isEdit ? "Edit A Blog" : "Add A Blog"}</h1>
			<div className="form-container">
				<input
					name="title"
					placeholder="Enter the blog title"
					id="title"
					type="text"
					value={formData.title}
					onChange={(e) =>
						setFormData({
							...formData,
							title: e.target.value,
						})
					}
				/>
				<textarea
					name="description"
					placeholder="Enter the blog description"
					id="description"
					value={formData.description}
					onChange={(e) =>
						setFormData({
							...formData,
							description: e.target.value,
						})
					}
				/>
				<button onClick={handleSaveBlogToDatabase}>
					{isEdit ? "Edit A Blog" : "Add New Blog"}
				</button>
			</div>
		</div>
	);
}

export default AddBlog;
