const express = require("express");
const blogRouter = express.Router();
const mongoose = require("mongoose");

mongoose
	.connect("mongodb://localhost:27017/blogDB")
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((err) => {
		console.error("Error connecting to MongoDB:", err);
	});

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
	},
	description: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const Blog = mongoose.model("Blog", blogSchema);

const fetchListofBlogs = async (req, res) => {
	let blogList;
	try {
		blogList = await Blog.find();
	} catch (e) {
		console.log(e);
	}

	if (!blogList) {
		return res.status(404).json({ message: "No Blogs Found" });
	}

	return res.status(200).json({ blogList });
};

const addNewBlog = async (req, res) => {
	const { title, description } = req.body;
	const currentDate = new Date();
	const newlyCreatedBlog = new Blog({
		title,
		description,
		date: currentDate,
	});

	try {
		await newlyCreatedBlog.save();
	} catch (err) {
		console.log(err);
	}

	return res.status(200).json({ newlyCreatedBlog });
};

const deleteBlog = async (req, res) => {
	const id = req.params.id;
	try {
		const findCurrentBlog = await Blog.findByIdAndDelete(id);
		if (!findCurrentBlog) {
			return res.status(404).json({ message: "Blog not found" });
		}
		return res.status(200).json({ message: "Successfully deleted" });
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ message: "Unable to delete... Please try again" });
	}
};

const updateBlog = async (req, res) => {
	const id = req.params.id;
	const { title, description } = req.body;
	let currentBlogToUpdate;
	try {
		currentBlogToUpdate = await Blog.findByIdAndUpdate(id, {
			title,
			description,
		});
	} catch (err) {
		console.log(err);

		return res.status(500).json({
			message: "Something went wrong while updating! Please try again",
		});
	}

	if (!currentBlogToUpdate) {
		return res.status(500).json({ message: "Unable to update" });
	}

	return res.status(200).json({ currentBlogToUpdate });
};

blogRouter.get("/", fetchListofBlogs);
blogRouter.post("/add", addNewBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.delete("/delete/:id", deleteBlog);

module.exports = Blog;
module.exports = { fetchListofBlogs, addNewBlog, deleteBlog, updateBlog };
module.exports = blogRouter;
