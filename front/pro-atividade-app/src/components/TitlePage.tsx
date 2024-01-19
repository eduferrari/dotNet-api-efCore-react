import React from "react";

interface TitlePageProps {
	title: string;
	children?: React.ReactNode;
}

const TitlePage: React.FC<TitlePageProps> = ({ title, children }: TitlePageProps) => {
	return (
		<div className="d-flex justify-content-between align-itens-end mt-2 pb-3 border-bottom border-1">
			<h3 className="m-0 p-0">{title}</h3>
			{children}
		</div>
	);
}

export default TitlePage;