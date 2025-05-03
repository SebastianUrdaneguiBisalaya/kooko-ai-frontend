type UploadStatus = "pending" | "uploading" | "success" | "error";

type Files = {
	file: File;
	error: string | null;
	status?: UploadStatus;
}

type CardUploadFileProps = {
	file: Files;
}

export default function CardUploadFile({ file }: CardUploadFileProps) {
	return (
		<div className="w-full flex flex-row items-center gap-2 border border-gray-400 rounded-md px-4 py-2">
			<div className="w-full flex flex-row items-center gap-2">
				<span>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="#cccccc" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2"/></g></svg>
				</span>
				<div className="flex flex-col gap-0.5">
					<p className="text-sm text-gray-300">{file.file.name}</p>
					<p className="text-xs text-gray-400">{file.error ? file.error : "Archivo válido."}</p>
				</div>
			</div>
			{
				file.status == "uploading" && (
					<span>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#E0F15B" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity=".5"/><path fill="#E0F15B" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"><animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"/></path></svg>
					</span>
				)
			}
			{
				file.status == "success" && (
					<span>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48"><circle cx="24" cy="24" r="21" fill="#4CAF50"/><path fill="#CCFF90" d="M34.6 14.6L21 28.2l-5.6-5.6l-2.8 2.8l8.4 8.4l16.4-16.4z"/></svg>
					</span>
				)
			}
			{
				file.status == "error" && (
					<span>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#e11d48" d="M12 17q.425 0 .713-.288T13 16t-.288-.712T12 15t-.712.288T11 16t.288.713T12 17m-1-4h2V7h-2zm1 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>
					</span>
				)
			}
		</div>
	)
}