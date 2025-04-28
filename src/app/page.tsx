import Image from "next/image";
import CardDetailLandingPage from "@/components/card-detail-landing-page";

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
  return (
    <div className="flex flex-col w-full h-full min-h-screen max-w-6xl px-4">
			<header className="flex flex-row items-center gap-2 w-full py-4 text-2xl font-semibold">
			<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 512 512"><path fill="#ffffff" d="M179.125 20.625c-28.052.12-54.046 5.813-66.72 9.78c0 0 114.968 19.51 124.532 98.876C149.573 3.32 54.28 155.657 54.28 155.657c19.868-5.212 76.76-20.682 114.75-14.156c25.992 4.465 51.33 28.03 50.236 27.733c-61.943 15.24-160.35 290.92-143.64 313.308c14.9 17.12 29.816 11.28 44.718 2.595c7.376-58.425 64.938-314.765 135.375-294.072c.01.003.02-.003.03 0c5.93 2.03 11.54 5.59 11.844 11.03c.58 10.363-6.11 27.3-4.53 39.063c3.662 27.296 9.007 36.79 16.78 46.313c18.564-10.435 36.326-48.057 40-67.564c16.634 7.284 43.373 24.155 65.187 86.813c11.404-58.716-5.042-105.03-59.03-125.595c23.38-10.105 125.142 41.03 137.563 69.53C475.648 199.264 390.167 136.378 319 139.72c13.644-3.56 28.638.6 42.906-9.907c19.146-14.098 41.474-26.24 62.28-39.282c-69.972-30.435-134.545-15.407-139.092 16.095c-3.573-69.916-57.83-86.204-105.97-86z"/></svg>
				<span className="text-white">kooko.ai</span>
			</header>
			<main className="flex w-full h-full justify-center items-center grow">
				<div className="flex flex-row gap-6 w-full h-full py-4">
					<div className="basis-[70%] flex flex-col gap-6">
						<h1 className="text-white text-5xl font-bold">
							¿Cansado de registrar los comprobantes manualemente?
						</h1>
						<h2 className="text-white text-xl font-light">
							Olvídate del papeleo y los errores. Envía una foto a nuestro chat de Telegram, el modelo de IA extrae los datos y los tienes disponibles en tu panel web. <span className="font-semibold">¡Inscríbete y obtén acceso prioritario!</span>
						</h2>
						<div className="flex flex-col gap-3">
								<label
									htmlFor="join-waitlist"
									className="text-gray-400 text-sm font-medium"
								>
										Únete a la lista de espera con tu correo
								</label>
								<div className="flex flex-row gap-4 w-full">
									<input
										id="join-waitlist"
										type="text"
										placeholder="sebas@gmail.com"
										className="max-w-80 w-full p-3 !border !border-gray-400 text-md text-white bg-background rounded-lg focus:ring-0 focus:outline-0 placeholder-gray-400"
									/>
									<button
										className="bg-green rounded-full flex flex-col justify-center items-center cursor-pointer"
									>
										<svg xmlns="http://www.w3.org/2000/svg" width="50" height="30" viewBox="0 0 24 24"><path fill="#000000" d="M6.4 18L5 16.6L14.6 7H6V5h12v12h-2V8.4z"/></svg>
									</button>
								</div>
						</div>
						<div className="flex flex-row w-full gap-3">
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
								<div className="flex flex-col justify-between bg-gray/10 w-full h-full rounded-xl p-4">
									<p className="text-gray-200 font-semibold text-md">
										Total
									</p>
									<div className="flex flex-row justify-between items-center gap-2">
										<span className="text-gray-400 font-normal text-xs">Egreso del mes</span>
										<span className="text-gray-400 font-normal text-xs">05/2025</span>
									</div>
									<p className="text-white font-extrabold text-2xl">S/. 1,950.00</p>
									<div className="flex flex-row items-end gap-4">
										<div className="flex flex-col justify-center items-center">
											<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16"><path fill="#E0F15B" d="M5 11h3v5H5zm-4 3h3v2H1zm12-2h3v4h-3zM9 9h3v7H9zm7-8.93l-5.68 4.97l-5.47-1.7L0 7.1V9l5.15-4l5.53 1.72L16 2.06z"/></svg>
										</div>
										<span className="text-gray-400 font-semibold text-sm">25%<span className="font-normal"> al mes anterior</span></span>
									</div>
								</div>
								<div className="relative bg-dark w-full rounded-xl h-full overflow-hidden">
									<div className="flex flex-col p-4">
										<p className="text-gray-200 font-semibold text-md">
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
					<div className="basis-[30%]">
						<div className="flex flex-col w-full h-full bg-[url('/grid.png')] bg-cover bg-center rounded-xl overflow-hidden border border-gray-700 shadow-2xl shadow-gray-900">
							
						</div>
					</div>
				</div>
			</main>
    </div>	
  );
}
