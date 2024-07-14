import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Home() {
	const { blogList, setBlogList, loading, setLoading } =
		useContext(GlobalContext);
	const navigate = useNavigate();

	async function fetchBlogs() {
		setLoading(true);
		const response = await axios.get("http://localhost:8080/api/blogs");
		const result = response.data;

		if (result && result.blogList && result.blogList.length) {
			setBlogList(result.blogList);
			setLoading(false);
		} else {
			setLoading(false);
			setBlogList([]);
		}
	}

	async function handleDeleteBlog(getCurrentId) {
		const response = await axios.delete(
			`http://localhost:8080/api/blogs/delete/${getCurrentId}`
		);
		const result = await response.data;
		console.log(result);

		if (result.message) {
			fetchBlogs();
		}
	}

	async function handleEditBlog(getCurrentBlog) {
		navigate("/add-blog", { state: { getCurrentBlog } });
	}

	useEffect(() => {
		fetchBlogs();
	}, []);

	return (
		<div className="home-container">
			<h1>Blog List</h1>
			{loading ? (
				<h1>Loading Blogs... Please Wait</h1>
			) : (
				<div className="blog-list-container">
					{blogList && blogList.length ? (
						blogList.map((blogItem) => (
							<div
								className="blog-item-container"
								key={blogItem._id}>
								<h3>{blogItem.title}</h3>
								<p>{blogItem.description}</p>
								<div className="edit-delete-icon-container">
									<FaEdit
										onClick={() => handleEditBlog(blogItem)}
										size={25}
									/>
									<FaTrash
										onClick={() =>
											handleDeleteBlog(blogItem._id)
										}
										size={25}
									/>
								</div>
							</div>
						))
					) : (
						<h3>No Blogs to show</h3>
					)}
				</div>
			)}
		</div>
	);
}

export default Home;
