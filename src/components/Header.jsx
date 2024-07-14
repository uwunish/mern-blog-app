import React from "react";
import { Link } from "react-router-dom";

function Header() {
	return (
		<div className="header-container">
			<Link className="link" to="/">
				<h3>BlogApp</h3>
			</Link>
			<ul>
				<li>
					<Link className="link" to="/">
						Home
					</Link>
				</li>
				<li>
					<Link className="link" to="add-blog">
						Add Blog
					</Link>
				</li>
			</ul>
		</div>
	);
}

export default Header;
