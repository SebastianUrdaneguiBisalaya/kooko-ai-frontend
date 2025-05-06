import { useState, useEffect } from "react"
import CardProductDetail from "@/components/home/card-product-detail";

const dataCardProducts = [
	{
		id: "1",
		productName: "iPhone 14 Pro Max",
		productPrice: 1000,
		productQuantity: 1,
	},
	{
		id: "2",
		productName: "iPhone 14 Pro Max",
		productPrice: 1000,
		productQuantity: 1,
	},
	{
		id: "3",
		productName: "iPhone 14 Pro Max",
		productPrice: 1000,
		productQuantity: 1,
	},
];


type SidebarDetailProps = {
	setShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SidebarDetail({ setShowDetail }: SidebarDetailProps) {
	const [expanded, setExpanded] = useState<Record<string, boolean>>(
		{
			payment: true,
			client: true,
			products: true,
			financial: true,
		}
	);
	const handleToggleSection = (section: string) => {
		setExpanded((prev) => ({
			...prev,
			[section]: !prev[section],
		}));
	}

	useEffect(() => {
		document.body.style.overflowY = "hidden";
		return () => {
			document.body.style.overflowY = "auto";
		}
	}, []);
	return (
		<div className="overflow-hidden">
			<div
				className="fixed inset-0 bg-background/50 z-[60]"
				onClick={() => setShowDetail(false)}
			></div>
			<aside
				className="absolute top-0 right-0 w-1/3 min-h-screen h-full overflow-y-auto bg-blue-dark scrollbar border-l border-l-gray-600 z-[100]"
			>
				<div className="p-6">
					<button
						type="button"
						className="cursor-pointer"
						onClick={() => setShowDetail(false)}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="#cccccc" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16M9.879 8.464L12 10.586l2.121-2.122a1 1 0 1 1 1.415 1.415l-2.122 2.12l2.122 2.122a1 1 0 0 1-1.415 1.415L12 13.414l-2.121 2.122a1 1 0 0 1-1.415-1.415L10.586 12L8.465 9.879a1 1 0 0 1 1.414-1.415"/></g></svg>
					</button>

					<div className="flex items-center justify-between mb-8 w-full">
						<h2 className="text-lg sm:text-xl md:text-2xl text-white font-semibold">Factura # 12345678</h2>
						<span className="px-3 py-1 text-xs font-medium bg-gray-800 rounded-full text-gray-300">EUR</span>
					</div>

					<div className="grid grid-cols-2 gap-3 mb-6 pb-6 border-b border-gray-600 w-full">
						<div className="flex items-center gap-2">
							<span className="flex items-center justify-center">
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="#E0F15B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 4V2m0 2v2m0-2h-4.5M3 10v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9zm0 0V6a2 2 0 0 1 2-2h2m0-2v4m14 4V6a2 2 0 0 0-2-2h-.5"/></svg>
							</span>
							<div className="flex flex-col items-start">
								<span className="text-gray-400 text-xs font-medium">Fecha</span>
								<span className="text-gray-200 text-sm">2025-05-02</span>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<span className="flex items-center justify-center">
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="#E0F15B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 4V2m0 2v2m0-2h-4.5M3 10v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9zm0 0V6a2 2 0 0 1 2-2h2m0-2v4m14 4V6a2 2 0 0 0-2-2h-.5"/></svg>
							</span>
							<div className="flex flex-col items-start">
								<span className="text-gray-400 text-xs font-medium">Hora</span>
								<span className="text-gray-200 text-sm">15:59:00</span>
							</div>
						</div>
					</div>

					<div className="w-full flex flex-col gap-3 border-b border-gray-600 pb-6 mb-6">
						<button
							type="button"
							onClick={() => handleToggleSection("payment")}
							className="flex items-center justify-between gap-2 cursor-pointer"
						>
							<h3 className="text-gray-200 text-md font-semibold">Información de pago</h3>
							{
								expanded.payment ? (
									<span>
										<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#cccccc" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6l-6 6z"/></svg>
									</span>
								) : (
									<span>
										<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#cccccc" d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6z"/></svg>
									</span>
								)
							}
						</button>
						{
							expanded.payment && (
								<div className="flex flex-col gap-4 items-start w-full">
									<div className="flex items-center gap-2 w-full">
										<span>
											<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="#E0F15B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 4V2m0 2v2m0-2h-4.5M3 10v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9zm0 0V6a2 2 0 0 1 2-2h2m0-2v4m14 4V6a2 2 0 0 0-2-2h-.5"/></svg>
										</span>
										<div className="flex flex-col items-start">
											<span className="text-gray-400 text-xs font-medium">Fecha de Pago</span>
											<span className="text-gray-200 text-sm">2025-05-02</span>
										</div>
									</div>
									<div className="flex items-center gap-2 w-full">
										<span>
											<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#E0F15B" d="M15.75 14.5a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5zM2 8.25A3.25 3.25 0 0 1 5.25 5h13.5A3.25 3.25 0 0 1 22 8.25v7.5A3.25 3.25 0 0 1 18.75 19H5.25A3.25 3.25 0 0 1 2 15.75zM20.5 9.5V8.25a1.75 1.75 0 0 0-1.75-1.75H5.25A1.75 1.75 0 0 0 3.5 8.25V9.5zM3.5 11v4.75c0 .966.784 1.75 1.75 1.75h13.5a1.75 1.75 0 0 0 1.75-1.75V11z"/></svg>
										</span>
										<div className="flex flex-col items-start">
											<span className="text-gray-400 text-xs font-medium">Método de Pago</span>
											<span className="text-gray-200 text-sm">Pago en efectivo</span>
										</div>
									</div>
								</div>
							)
						}
					</div>

					<div className="w-full flex flex-col gap-3 border-b border-gray-600 pb-6 mb-6">
						<button
							type="button"
							onClick={() => handleToggleSection("client")}
							className="flex items-center justify-between gap-2 cursor-pointer"
						>
							<h3 className="text-gray-200 text-md font-semibold">Cliente y Vendedor</h3>
							{
								expanded.client ? (
									<span>
										<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#cccccc" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6l-6 6z"/></svg>
									</span>
								) : (
									<span>
										<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#cccccc" d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6z"/></svg>
									</span>
								)
							}
						</button>
						{
							expanded.client && (
								<>
									<div className="grid grid-cols-2 gap-2 w-full">
										<div className="flex items-center gap-2 w-full">
											<span>
												<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="#E0F15B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></g></svg>
											</span>
											<div className="flex flex-col items-start">
												<span className="text-gray-400 text-xs font-medium">ID Vendedor</span>
												<span className="text-gray-200 text-sm">20989379804</span>
											</div>
										</div>
										<div className="flex items-center gap-2 w-full">
											<span>
												<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="#E0F15B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></g></svg>
											</span>
											<div className="flex flex-col items-start">
												<span className="text-gray-400 text-xs font-medium">Vendedor</span>
												<span className="text-gray-200 text-sm">Rústica S.A.C.</span>
											</div>
										</div>
									</div>

									<div className="grid grid-cols-2 gap-2 w-full">
										<div className="flex items-center gap-2 w-full">
											<span>
												<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="#E0F15B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></g></svg>
											</span>
											<div className="flex flex-col items-start">
												<span className="text-gray-400 text-xs font-medium">ID Cliente</span>
												<span className="text-gray-200 text-sm">20183464804</span>
											</div>
										</div>
										<div className="flex items-center gap-2 w-full">
											<span>
												<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="#E0F15B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></g></svg>
											</span>
											<div className="flex flex-col items-start">
												<span className="text-gray-400 text-xs font-medium">Cliente</span>
												<span className="text-gray-200 text-sm">Apple I.N.C.</span>
											</div>
										</div>
									</div>
								</>
							)
						}
					</div>

					<div className="w-full flex flex-col gap-3 border-b border-gray-600 pb-6 mb-6">
						<button
							type="button"
							onClick={() => handleToggleSection("products")}
							className="flex items-center justify-between gap-2 cursor-pointer"
						>
							<h3 className="text-gray-200 text-md font-semibold">Productos</h3>
							{
								expanded.products ? (
									<span>
										<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#cccccc" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6l-6 6z"/></svg>
									</span>
								) : (
									<span>
										<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#cccccc" d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6z"/></svg>
									</span>
								)
							}
						</button>
						{
							expanded.products && (
								<div className="flex flex-col gap-2 w-full items-start">
									{
										dataCardProducts.map((item) => (
											<CardProductDetail
												key={item.id}
												id={item.id}
												productName={item.productName}
												productPrice={item.productPrice}
												productQuantity={item.productQuantity}
											/>
										))
									}
								</div>
							)
						}
					</div>

					<div className="w-full flex flex-col gap-3 border-b border-gray-600 pb-6 mb-6">
						<button
							type="button"
							onClick={() => handleToggleSection("financial")}
							className="flex items-center justify-between gap-2 cursor-pointer"
						>
							<h3 className="text-gray-200 text-md font-semibold">Información financiera</h3>
							{
								expanded.financial ? (
									<span>
										<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#cccccc" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6l-6 6z"/></svg>
									</span>
								) : (
									<span>
										<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#cccccc" d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6z"/></svg>
									</span>
								)
							}
						</button>
						{
							expanded.financial && (
								<div className="flex flex-col gap-2 w-full items-start">
									<div className="flex items-center justify-between gap-2 w-full pt-2 pb-3">
										<span className="text-gray-400 text-sm">Total</span>
										<span className="text-gray-300 text-sm font-semibold">S/. 1,950.00</span>
									</div>
									<div className="flex items-center justify-between gap-2 w-full pt-4 border-t border-t-gray-600">
										<span className="text-gray-400 text-sm">Op. Gravada</span>
										<span className="text-gray-300 text-sm font-semibold">S/. 1,950.00</span>
									</div>
									<div className="flex items-center justify-between gap-2 w-full pt-4 border-t border-t-gray-600">
										<span className="text-gray-400 text-sm">I.G.V.</span>
										<span className="text-gray-300 text-sm font-semibold">S/. 195.00</span>
									</div>
									<div className="flex items-center justify-between gap-2 w-full pt-4 border-t border-t-gray-600">
										<span className="text-gray-400 text-sm">I.S.C.</span>
										<span className="text-gray-300 text-sm font-semibold">S/. 195.00</span>
									</div>
									<div className="flex items-center justify-between gap-2 w-full pt-4 border-t border-t-gray-600">
										<span className="text-gray-400 text-sm">Op. No Afectada</span>
										<span className="text-gray-300 text-sm font-semibold">S/. 195.00</span>
									</div>
									<div className="flex items-center justify-between gap-2 w-full pt-4 border-t border-t-gray-600">
										<span className="text-gray-400 text-sm">Op. Exonerada</span>
										<span className="text-gray-300 text-sm font-semibold">S/. 195.00</span>
									</div>
									<div className="flex items-center justify-between gap-2 w-full pt-4 border-t border-t-gray-600">
										<span className="text-gray-400 text-sm">Op. Exportación</span>
										<span className="text-gray-300 text-sm font-semibold">S/. 195.00</span>
									</div>
									<div className="flex items-center justify-between gap-2 w-full pt-4 border-t border-t-gray-600">
										<span className="text-gray-400 text-sm">Op. Gratuita</span>
										<span className="text-gray-300 text-sm font-semibold">S/. 195.00</span>
									</div>
									<div className="flex items-center justify-between gap-2 w-full pt-4 border-t border-t-gray-600">
										<span className="text-gray-400 text-sm">Descuento</span>
										<span className="text-gray-300 text-sm font-semibold">S/. 195.00</span>
									</div>
									<div className="flex items-center justify-between gap-2 w-full pt-4 border-t border-t-gray-600">
										<span className="text-gray-400 text-sm">Otros Cargos</span>
										<span className="text-gray-300 text-sm font-semibold">S/. 195.00</span>
									</div>
									<div className="flex items-center justify-between gap-2 w-full pt-4 border-t border-t-gray-600">
										<span className="text-gray-400 text-sm">Otros Impuestos</span>
										<span className="text-gray-300 text-sm font-semibold">S/. 195.00</span>
									</div>
								</div>
							)
						}
					</div>

					<button
						type="button"
						className="bg-gray-600 text-gray-200 hover:text-dark hover:bg-green rounded-xl w-full px-4 py-3 cursor-pointer text-sm"
					>
						Descargar boleta o factura
					</button>
				</div>
			</aside>
		</div>
	)
}