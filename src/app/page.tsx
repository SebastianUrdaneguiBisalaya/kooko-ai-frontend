"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import CardDetailLandingPage from "@/components/card-detail-landing-page";
import ModalJoinWaitlist from "@/components/modal-join-waitlist";
import ModalCredit from "@/components/modal-credits";
import { validateEmailJoinWaitlist } from "@/utils/validate-email-joinwaitlist";

const dataCardDetail = [
	{
		id: 1,
		title: "Factura N° 00001 - Restaurante ABC",
		total: "S/. 250.00",
	},
	{
		id: 2,
		title: "Factura N° 00002 - Tienda de Ropa ZYX",
		total: "S/. 450.00",
	},
	{
		id: 3,
		title: "Factura N° 00003 - Transporte Colectivo",
		total: "S/. 650.00",
	},
]

export default function Home() {
	const [isModalCredit, setIsModalCredit] = useState<boolean>(false);
	const [isModalJoinWaitlist, setIsModalJoinWaitlist] = useState<boolean>(false);
	const [triggerPosition, setTriggerPosition] = useState<{ x: number, y: number } | undefined>(undefined);
	const [email, setEmail] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const openButtonRef = useRef<HTMLButtonElement>(null);

	const handleOpenModalCredit = (event: React.MouseEvent<HTMLButtonElement>) => {
		const rect = event.currentTarget.getBoundingClientRect();
		setTriggerPosition({
			x: rect.left + rect.width / 2,
			y: rect.top + rect.height / 2,
		});
		setIsModalCredit(true);
	}

	const handleCloseModalCredit = () => {
		setIsModalCredit(false);
		setTriggerPosition(undefined);
	}


	const handleCloseModalJoinWaitlist = () => {
		setIsModalJoinWaitlist(false);
		setTriggerPosition(undefined);
	}

	const handleSubmitJoinWaitlist = async (event: React.MouseEvent<HTMLButtonElement>) => {
		const button = event.currentTarget;
		if (!email) return;
		if (!validateEmailJoinWaitlist(email)) {
			setErrorMessage("El correo ingresado no es válido.");
			return;
		}
		setIsLoading(true);
		const response = await fetch("/api/joinwaitlist", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
			}),
		});
		let data;
		try {
			data = await response.json();
		} catch (error: unknown) {
			setErrorMessage(`Hubo un problema con la solicitud al servidor. Por favor, inténtalo de nuevo más tarde. ${error}`);
			alert("Hubo un problema con la solicitud al servidor. Por favor, inténtalo de nuevo más tarde.");
			return;
		} finally {
			setIsLoading(false);
		}
		if (!response.ok) {
			setErrorMessage("Hubo un problema con la solicitud al servidor. Por favor, inténtalo de nuevo más tarde.");
			alert("Hubo un problema con la solicitud al servidor. Por favor, inténtalo de nuevo más tarde.");
			return;
		}
		if (data.contact.id) {
			const rect = button.getBoundingClientRect();
			setTriggerPosition({
				x: rect.left + rect.width / 2,
				y: rect.top + rect.height / 2,
			});
			setIsModalJoinWaitlist(true);
			setErrorMessage(null);
		}
	}

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.playbackRate = 2;
		}
	}, []);

  return (
    <div className="flex flex-col w-full h-full min-h-screen max-w-6xl px-4">
			<header className="flex flex-row items-center gap-2 w-full py-4">
				<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 512 512"><path fill="#ffffff" d="M179.125 20.625c-28.052.12-54.046 5.813-66.72 9.78c0 0 114.968 19.51 124.532 98.876C149.573 3.32 54.28 155.657 54.28 155.657c19.868-5.212 76.76-20.682 114.75-14.156c25.992 4.465 51.33 28.03 50.236 27.733c-61.943 15.24-160.35 290.92-143.64 313.308c14.9 17.12 29.816 11.28 44.718 2.595c7.376-58.425 64.938-314.765 135.375-294.072c.01.003.02-.003.03 0c5.93 2.03 11.54 5.59 11.844 11.03c.58 10.363-6.11 27.3-4.53 39.063c3.662 27.296 9.007 36.79 16.78 46.313c18.564-10.435 36.326-48.057 40-67.564c16.634 7.284 43.373 24.155 65.187 86.813c11.404-58.716-5.042-105.03-59.03-125.595c23.38-10.105 125.142 41.03 137.563 69.53C475.648 199.264 390.167 136.378 319 139.72c13.644-3.56 28.638.6 42.906-9.907c19.146-14.098 41.474-26.24 62.28-39.282c-69.972-30.435-134.545-15.407-139.092 16.095c-3.573-69.916-57.83-86.204-105.97-86z"/></svg>
				<span className="text-white text-base sm:text-2xl font-semibold">kooko.ai</span>
			</header>
			<main className="flex w-full h-full justify-center items-center grow">
				<div className="flex flex-col lg:flex-row gap-6 w-full h-full py-4">
					<div className="basis-[70%] flex flex-col gap-6">
						<h1 className="text-white text-3xl sm:text-5xl font-bold animate-zoom-in">
							¿Cansado de registrar los comprobantes manualemente?
						</h1>
						<h2 className="text-white text-base sm:text-xl font-light animate-zoom-in animate-delay-400">
							Olvídate del papeleo. Envía una foto a nuestro chat de Telegram, el modelo de IA extrae los datos y los tienes disponibles en tu panel web. <span className="font-semibold">¡Inscríbete y obtén acceso prioritario!</span>
						</h2>
						<div className="flex flex-col gap-3 animate-zoom-in animate-delay-800">
								<label
									htmlFor="join-waitlist"
									className="text-gray-400 text-sm font-medium"
								>
										Únete a la lista de espera con tu correo
								</label>
								<div className="flex flex-row gap-4 w-full">
									<input
										id="join-waitlist"
										type="email"
										placeholder="sebas@gmail.com"
										onChange={(event) => setEmail(event.target.value)}
										className="max-w-80 w-full p-3 !border !border-gray-400 text-base text-white bg-background rounded-lg focus:ring-0 focus:outline-0 placeholder-gray-400"
									/>
									<button
										type="button"
										onClick={handleSubmitJoinWaitlist}
										className="bg-green rounded-full flex flex-col justify-center items-center cursor-pointer"
									>
										{
											isLoading ? (
												<svg xmlns="http://www.w3.org/2000/svg" width="50" height="30" viewBox="0 0 24 24"><path fill="#000000" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity=".5"/><path fill="#000000" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"><animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"/></path></svg>
											) : (
												<svg xmlns="http://www.w3.org/2000/svg" width="50" height="30" viewBox="0 0 24 24"><path fill="#000000" d="M6.4 18L5 16.6L14.6 7H6V5h12v12h-2V8.4z"/></svg>
											)
										}
									</button>
								</div>
								<p className="text-gray-300 font-semibold text-base">{errorMessage}</p>
						</div>
						<div className="flex flex-col sm:flex-row w-full gap-3">
							<div className="flex flex-col gap-2 w-full bg-gray/10 rounded-xl p-4 backdrop-blur-2xl mask-fade-bottom">
								{
									dataCardDetail.map((item) => (
										<CardDetailLandingPage
											key={item.id}
											id={item.id}
											title={item.title}
											total={item.total}
										/>
									))
								}
							</div>
							<div className="flex flex-col gap-3 w-full">
								<div className="flex flex-col justify-between bg-gray/10 w-full h-full rounded-xl p-4 animate-fade-in-down animate-delay-[2000ms]">
									<p className="text-gray-200 font-semibold text-sm sm:text-base">
										Total
									</p>
									<div className="flex flex-row justify-between items-center gap-2">
										<span className="text-gray-400 font-normal text-xs">Egreso del mes</span>
										<span className="text-gray-400 font-normal text-xs">05/2025</span>
									</div>
									<p className="text-white font-extrabold text-xl sm:text-2xl">S/. 1,950.00</p>
									<div className="flex flex-row items-end gap-4">
										<div className="flex flex-col justify-center items-center">
											<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16"><path fill="#E0F15B" d="M5 11h3v5H5zm-4 3h3v2H1zm12-2h3v4h-3zM9 9h3v7H9zm7-8.93l-5.68 4.97l-5.47-1.7L0 7.1V9l5.15-4l5.53 1.72L16 2.06z"/></svg>
										</div>
										<span className="text-gray-400 font-semibold text-xs sm:text-sm">25%<span className="font-normal"> al mes anterior</span></span>
									</div>
								</div>
								<div className="relative bg-dark w-full rounded-xl h-full overflow-hidden animate-fade-in-up animate-delay-[2000ms] min-h-32">
									<div className="flex flex-col p-4">
										<p className="text-gray-200 font-semibold text-sm sm:text-base">
											Comportamiento
										</p>
										<span className="text-gray-400 font-normal text-xs">Mensual de Egresos</span>
									</div>
									<div className="absolute bottom-0 w-full">
										<Image src="/line-bar.png" width={464} height={60} alt="line-bar" />
									</div>
									<div className="absolute top-5 right-5">
										<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 512 512"><path fill="#E0F15B" d="M432 64H16v320h416Zm-32 288H48V96h352Z"/><path fill="#E0F15B" d="M464 144v272H96v32h400V144z"/><path fill="#E0F15B" d="M224 302.46c39.7 0 72-35.137 72-78.326s-32.3-78.326-72-78.326s-72 35.136-72 78.326s32.3 78.326 72 78.326m0-124.652c22.056 0 40 20.782 40 46.326s-17.944 46.326-40 46.326s-40-20.782-40-46.326s17.944-46.326 40-46.326M80 136h32v176H80zm256 0h32v176h-32z"/></svg>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="basis-[30%] self-center">
						<div className="flex flex-col min-w-40 max-w-80 w-full h-fit lg:w-full lg:h-full bg-[url('/grid.png')] bg-cover bg-center rounded-xl overflow-hidden border border-gray-700 shadow-2xl shadow-gray-900 animate-fade-in-left animate-delay-[2000ms]">
							<div className="w-full h-full rounded-xl border border-gray-500 p-4">
								<video
									ref={videoRef}
									autoPlay
									loop
									muted
									className="w-full h-full rounded-xl"
								>
									<source src="https://res.cloudinary.com/drzumfcdp/video/upload/Landing%20Page%20Sebastian/demo-kooko.ai_ql0maz.mp4" type="video/mp4" />
								</video>
							</div>
						</div>
					</div>
				</div>
			</main>
			<footer className="flex flex-col sm:flex-row justify-between items-start gap-4 w-full py-4">
				<div className="flex flex-row items-center justify-start gap-2 py-4">
					<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 512 512"><path fill="#ffffff" d="M179.125 20.625c-28.052.12-54.046 5.813-66.72 9.78c0 0 114.968 19.51 124.532 98.876C149.573 3.32 54.28 155.657 54.28 155.657c19.868-5.212 76.76-20.682 114.75-14.156c25.992 4.465 51.33 28.03 50.236 27.733c-61.943 15.24-160.35 290.92-143.64 313.308c14.9 17.12 29.816 11.28 44.718 2.595c7.376-58.425 64.938-314.765 135.375-294.072c.01.003.02-.003.03 0c5.93 2.03 11.54 5.59 11.844 11.03c.58 10.363-6.11 27.3-4.53 39.063c3.662 27.296 9.007 36.79 16.78 46.313c18.564-10.435 36.326-48.057 40-67.564c16.634 7.284 43.373 24.155 65.187 86.813c11.404-58.716-5.042-105.03-59.03-125.595c23.38-10.105 125.142 41.03 137.563 69.53C475.648 199.264 390.167 136.378 319 139.72c13.644-3.56 28.638.6 42.906-9.907c19.146-14.098 41.474-26.24 62.28-39.282c-69.972-30.435-134.545-15.407-139.092 16.095c-3.573-69.916-57.83-86.204-105.97-86z"/></svg>
					<span className="text-white text-base sm:text-2xl font-semibold">kooko.ai</span>
				</div>
				<div className="flex flex-col gap-3">
					<p className="text-base sm:text-lg text-white font-semibold">Contacto</p>
					<p
						className="flex flex-row gap-3 items-center"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="#E0F15B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="m3 7l9 6l9-6"/></g></svg>
					  <span className="text-sm sm:text-base text-gray-300">sebasurdanegui@gmail.com</span>
					</p>
					<a
						href="https://www.linkedin.com/in/sebastianurdaneguibisalaya/"
						target="_blank"
						className="flex flex-row gap-3 items-center cursor-pointer hover:underline hover:text-white"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#E0F15B" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"/></svg>
						<span className="text-sm sm:text-base text-gray-300">in/sebastianurdaneguibisalaya</span>
					</a>
				</div>
				<div className="flex flex-col gap-3">
					<p className="text-base sm:text-lg text-white font-semibold">Founder</p>
					<button
						ref={openButtonRef}
						type="button"
						onClick={handleOpenModalCredit}
						className="flex flex-row gap-3 items-center cursor-pointer"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="#E0F15B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></g></svg>
					  <span className="text-sm sm:text-base text-gray-300">Créditos</span>
					</button>
				</div>
			</footer>
			<ModalCredit
				isOpen={isModalCredit}
				onClose={handleCloseModalCredit}
				triggerPosition={triggerPosition}
			/>
			<ModalJoinWaitlist
				isOpen={isModalJoinWaitlist}
				onClose={handleCloseModalJoinWaitlist}
				triggerPosition={triggerPosition}
			/>
    </div>	
  );
}
