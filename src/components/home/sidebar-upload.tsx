import { useState, useEffect } from "react"
import DragAndDrop from "@/components/home/drag-and-drop";
import ProgressBar from "@/components/home/progress-bar";
import CardUploadFile from "@/components/home/card-upload-file";

type SidebarUploadProps = {
	setShowUpload: React.Dispatch<React.SetStateAction<boolean>>;
}

type UploadStatus = "pending" | "uploading" | "success" | "error";

type Files = {
	file: File;
	error: string | null;
	status?: UploadStatus;
}

export default function SidebarUpload({ setShowUpload }: SidebarUploadProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [quantityTotal, setQuantityTotal] = useState<number>(0);
	const [quantityUploaded, setQuantityUploaded] = useState<number>(0);
	const [validFiles, setValidFiles] = useState<Files[]>([]);

	const handleUploadFiles = () => {
		if (validFiles.length === 0) return;
		setQuantityUploaded(0);
		setValidFiles([]);
		setIsLoading(true);
		const updatedFiles = validFiles.map((file) => ({
			...file,
			status: "uploading" as UploadStatus,
		}));
		setValidFiles(updatedFiles);
		updatedFiles.forEach((file, index) => {
			setTimeout(() => {
				const isSuccess = Math.random() > 0.2;
				setValidFiles((prevFiles) => 
					prevFiles.map((f, i) => 
						i === index ? {
							...f,
							status: isSuccess ? "success" : "error",
							error: isSuccess ? null : "Error al subir el archivo.",
						} : f
					)
				);
				setQuantityUploaded((prev) => isSuccess ? prev + 1 : prev);
			}, 1500 + index * 500);
		});
		setTimeout(() => {
			setIsLoading(false);
		}, 1500 + validFiles.length * 500);
	};

	useEffect(() => {
		document.body.style.overflowY = "hidden";
		return () => {
			document.body.style.overflowY = "unset";
		}
	}, []);

	return (
		<div className="overflow-hidden">
			<div
				onClick={() => setShowUpload(false)}
				className="fixed inset-0 bg-background/50 z-[60]"
			></div>
			<aside
				className="absolute top-0 right-0 w-1/3 min-h-screen h-full overflow-hidden bg-blue-dark scrollbar border-l border-l-gray-600 z-[100]"
			>
				<div className="flex flex-col justify-between h-full p-6">
					<div className="flex flex-col grow">
						<button
							type="button"
							className="cursor-pointer"
							onClick={() => setShowUpload(false)}
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="#cccccc" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16M9.879 8.464L12 10.586l2.121-2.122a1 1 0 1 1 1.415 1.415l-2.122 2.12l2.122 2.122a1 1 0 0 1-1.415 1.415L12 13.414l-2.121 2.122a1 1 0 0 1-1.415-1.415L10.586 12L8.465 9.879a1 1 0 0 1 1.414-1.415"/></g></svg>
						</button>
						<h2 className="text-lg sm:text-xl md:text-2xl text-white font-semibold">Subir boletas y/o facturas</h2>
						<DragAndDrop
							setQuantityTotal={setQuantityTotal}
							setValidFiles={setValidFiles}
						/>
						{
							isLoading && (
								<ProgressBar
									value={quantityUploaded}
									max={quantityTotal}
								/>
							)
						}
					</div>
					{
						validFiles.length > 0 && (
							<div className="flex flex-col gap-2 mb-4 items-start w-full h-full grow overflow-y-auto scrollbar">
								{
									validFiles.map((file) => (
										<CardUploadFile
											key={file.file.name}
											file={file}
										/>
									))
								}
							</div>
						)
					}
					<button
						type="button"
						onClick={handleUploadFiles}
						className="flex flex-col w-full text-center bg-gray-600 text-gray-200 hover:bg-green hover:text-dark rounded-xl px-4 py-3 cursor-pointer text-sm font-semibold"
					>
						Subir boletas y/o facturas
					</button>
				</div>
			</aside>
		</div>
	)
}