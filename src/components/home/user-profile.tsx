import Image from "next/image";
import { useState } from "react";

type UserProfileProps = {
	name: string;
	email: string;
}

export default function UserProfile({ name, email }: UserProfileProps) {
	const [showOptions, setShowOptions] = useState<boolean>(false);
	const handleShowOptions = () => {
		setShowOptions(!showOptions);
	}
	return (
		<div className="relative">
			<div className="flex items-center gap-2 w-fit border border-gray-300 shadow-lg shadow-gray-700 p-2 rounded-lg">
				<div className="relative">
					<Image
						src="/profile-pic.png"
						width={35}
						height={35}
						className="rounded-full"
						alt="User profile"
					/>
					<div className="w-[10px] h-[10px] border border-white bg-green-500 rounded-full absolute bottom-0 right-0"></div>
				</div>
				<div className="flex flex-col items-start">
					<span className="text-white text-sm font-semibold">{name}</span>
					<span className="text-gray-300 text-xs">{email}</span>
				</div>
				<div
					className="cursor-pointer"
					onClick={handleShowOptions}
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 1024 1024"><path fill="#FFFFFF" d="M388.8 896.4v-27.198c.6-2.2 1.6-4.2 2-6.4c8.8-57.2 56.4-102.4 112.199-106.2c62.4-4.4 115.2 31.199 132.4 89.199c2.2 7.6 3.8 15.6 5.8 23.4v27.2c-.6 1.8-1.6 3.399-1.8 5.399c-8.6 52.8-46.6 93-98.6 104.4c-4 .8-8 2-12 3h-27.2c-1.8-.6-3.6-1.6-5.4-1.8c-52-8.4-91.599-45.4-103.6-96.8c-1.2-5-2.6-9.6-3.8-14.2zm252.4-768.797l-.001 27.202c-.6 2.2-1.6 4.2-1.8 6.4c-9 57.6-56.8 102.6-113.2 106.2c-62.2 4-114.8-32-131.8-90.2c-2.2-7.401-3.8-15-5.6-22.401v-27.2c.6-1.8 1.6-3.4 2-5.2c9.6-52 39.8-86 90.2-102.2c6.6-2.2 13.6-3.4 20.4-5.2h27.2c1.8.6 3.6 1.6 5.4 1.8c52.2 8.6 91.6 45.4 103.6 96.8c1.201 4.8 2.401 9.4 3.601 13.999m-.001 370.801v27.2c-.6 2.2-1.6 4.2-2 6.4c-9 57.4-58.6 103.6-114.6 106c-63 2.8-116.4-35.2-131.4-93.8c-1.6-6.2-3-12.4-4.4-18.6v-27.2c.6-2.2 1.6-4.2 2-6.4c8.8-57.4 58.6-103.601 114.6-106.2c63-3 116.4 35.2 131.4 93.8c1.6 6.4 3 12.6 4.4 18.8"/></svg>
				</div>
			</div>
			{
				showOptions && (
					<div className="absolute top-16 w-full bg-blue-dark border border-gray-300 rounded-lg">
						<button
							type="button"
							className="text-gray-300 hover:text-white text-sm font-semibold p-2 flex items-center gap-2 cursor-pointer w-full"
						>
							<span>
								<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="#E0F15B" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"/></svg>
							</span>
							Cerrar Sesión
						</button>
					</div>
				)
			}
		</div>
	)
}