import React from "react";

export default function TitlePage({ title, children }) {
	return (
		<div className="d-flex justify-content-between align-itens-end mt-2 pb-3 border-bottom border-1">
			<h3 className="m-0 p-0">{title}</h3>
			{children}
		</div>
	);
}
