"use client";

import { useRouter } from "next/navigation";
import Icon from "@/components/icon"
import Loading from "@/components/loading";
import { useState } from "react";

export default function Auth() {
	const [showLoading, setShowLoading] = useState<boolean>(false);
	const router = useRouter();
	const handleLogIn = async () => {
		try {
			setShowLoading(true);
			setTimeout(() => {
				router.push(
					"/home",
					{
						scroll: false,
					}
				);
			}, 3000);
		} catch (error: unknown) {
			throw new Error(`Hubo un error al iniciar sesión. ${error}`);
		}
	}
	return (
		<>
			{
				showLoading ? (
					<Loading />
				) : (
					<div className="flex flex-col items-center justify-center gap-6 w-full h-full p-6">
						<Icon />
						<h2 className="text-white text-xl sm:text-3xl font-bold text-center">Iniciar Sesión</h2>
						<p className="text-base md:text-md text-gray-300 text-center max-w-lg w-full">Debes iniciar sesión para acceder al panel web y visualizar tus finanzas.</p>
						<div className="flex justify-center items-center gap-4 w-fit border border-gray-300 hover:border-green cursor-pointer rounded-xl px-4 py-3">
							<div className="flex justify-center items-center">
								<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"/><path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.9 11.9 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"/></svg>
							</div>
							<span className="text-gray-300 text-base md:text-md">Iniciar Sesión con Google</span>
						</div>
						<button
							type="button"
							onClick={handleLogIn}
							className="bg-green w-fit px-4 py-3 rounded-xl flex justify-center items-center cursor-pointer gap-3 border border-green hover:border-gray-200"
						>
							<span className="text-base md:text-md font-medium">Iniciar Sesión</span>
							<div>
								<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="#000000" d="m16 8.4l-8.9 8.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7L14.6 7H7q-.425 0-.712-.288T6 6t.288-.712T7 5h10q.425 0 .713.288T18 6v10q0 .425-.288.713T17 17t-.712-.288T16 16z"/></svg>
							</div>
						</button>
					</div>
				)
			}
		</>
	)
}