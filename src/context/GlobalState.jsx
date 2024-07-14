import React, { createContext, useState } from "react";

export const GlobalContext = createContext(null);

function GlobalState({ children }) {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
	});

	const [blogList, setBlogList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [isEdit, setIsEdit] = useState(false);

	return (
		<GlobalContext.Provider
			value={{
				formData,
				setFormData,
				blogList,
				setBlogList,
				loading,
				setLoading,
				isEdit,
				setIsEdit,
			}}>
			{children}
		</GlobalContext.Provider>
	);
}

export default GlobalState;
