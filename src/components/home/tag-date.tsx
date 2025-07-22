type TagDateProps = {
	id: number;
	date: string,
	onClick?: (id: number) => void;
	dateIndexSelected: number;
}

export default function TagDate({ id, date, onClick, dateIndexSelected }: TagDateProps) {
	return (
		<span
			onClick={() => onClick && onClick(id)}
			className={`text-xs px-3 py-1 rounded-xl text-center cursor-pointer hover:bg-green hover:text-dark border border-gray-400 ${id === dateIndexSelected ? "bg-green text-dark" : "bg-blue-dark text-gray-300"}`}
		>
			{date}
		</span>
	)
}