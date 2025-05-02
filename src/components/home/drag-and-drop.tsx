import { useState, useRef } from "react"

export default function DragAndDrop() {
	const [isDragging, setIsDragging] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setIsDragging(true);
	};
	const handleDragLeave = () => {
		setIsDragging(false);
	};
	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setIsDragging(false);
		const files = event.dataTransfer.files;
		console.log("Archivos soltados: ", files);
	};
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files) {
			console.log("Archivos seleccionados: ", files);
		}
	};
	const handleClick = () => {
		inputRef.current?.click();
	};
	return (
		<div
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
			onClick={handleClick}
			className={`flex flex-col gap-3 items-center justify-center w-full mt-8 mb-6 border-2 border-dashed bg-white/5 backdrop-blur-2xl rounded-xl p-4 min-h-36 h-full cursor-pointer transition-colors duration-200 ${isDragging ? "border-green" : "border-gray-400"}`}
		>
			<input
				type="file"
				ref={inputRef}
				onChange={handleFileChange}
				multiple
				className="hidden"
			/>
			<span>
				<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="#E0F15B" d="M11 16V7.85l-2.6 2.6L7 9l5-5l5 5l-1.4 1.45l-2.6-2.6V16zm-5 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"/></svg>
			</span>
			<span className="text-center text-gray-300 text-sm"><span className="font-semibold text-gray-200 hover:underline cursor-pointer">Elige un archivo</span> o arrastre y suelte aquí</span>
		</div>
	)
}