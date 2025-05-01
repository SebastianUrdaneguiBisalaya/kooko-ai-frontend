type TagDateProps = {
	date: string,
}

export default function TagDate({ date }: TagDateProps) {
	return (
		<span
			className="bg-blue-dark text-gray-300 text-xs px-3 py-1 rounded-xl text-center cursor-pointer hover:bg-green hover:text-dark border border-gray-400"
		>
			{date}
		</span>
	)
}