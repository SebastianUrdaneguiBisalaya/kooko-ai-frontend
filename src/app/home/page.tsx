"use client";

import Icon from "@/components/icon";
import UserProfile from "@/components/home/user-profile";
import Breadcrumbs from "@/components/home/breadcrumbs";
import Table from "@/components/home/table";
import CardAnalytics from "@/components/home/card-analytics";

const dataCardDetail = [
	 {
		 id: 1,
		 title: "Factura N° 00001 - Restaurante ABC",
		 description: "Egreso del mes",
		 month: "05/2025",
		 total: 1950,
		 percentage: 25,
	 },
	 {
		 id: 2,
		 title: "Factura N° 00002 - Tienda de Ropa ZYX",
		 description: "Egreso del mes",
		 month: "05/2025",
		 total: 1950,
		 percentage: 25,
	 },
	 {
		 id: 3,
		 title: "Factura N° 00003 - Transporte Colectivo",
		 description: "Egreso del mes",
		 month: "05/2025",
		 total: 1950,
		 percentage: 25,
	 },
	 {
		 id: 4,
		 title: "Factura N° 00004 - Transporte Colectivo",
		 description: "Egreso del mes",
		 month: "05/2025",
		 total: 1950,
		 percentage: 25,
	 },
	 {
		 id: 5,
		 title: "Factura N° 00005 - Transporte Colectivo",
		 description: "Egreso del mes",
		 month: "05/2025",
		 total: 1950,
		 percentage: 25,
	 },
	 {
		 id: 6,
		 title: "Factura N° 00006 - Transporte Colectivo",
		 description: "Egreso del mes",
		 month: "05/2025",
		 total: 1950,
		 percentage: 25,
	 },
	 {
		 id: 7,
		 title: "Factura N° 00007 - Transporte Colectivo",
		 description: "Egreso del mes",
		 month: "05/2025",
		 total: 1950,
		 percentage: 25,
	 }
]

export default function Home() {
	return (
		<div className="flex flex-col w-full p-4">
			<header className="flex flex-row justify-between items-center w-full p-4">
				<div className="flex flex-col items-start gap-3">
					<Icon />
					<Breadcrumbs name="Sebastian Urdanegui" title="Dashboard" />
				</div>
				<UserProfile name="Sebastian Urdanegui" email="sebasurdanegui@gmail.com" />
			</header>
			<main className="flex flex-col items-start p-4 overflow-x-hidden">
				<div className="flex flex-col items-start gap-2 w-full">
					<h1 className="font-bold text-white text-lg sm:text-xl md:text-3xl">Bienvenido, Sebastian</h1>
					<h2 className="text-gray-300 text-base md:text-md">Te encuentras en tu panel web de facturación.</h2>
					<div className="flex gap-4 w-full overflow-x-auto scrollbar py-4">
						{
							dataCardDetail.map((item) => (
								<CardAnalytics
									key={item.id}
									id={item.id}
									title={item.title.toUpperCase()}
									description={item.description}
									month={item.month}
									total={item.total}
									percentage={item.percentage}
								/>
							))
						}
					</div>
					<Table />
				</div>
			</main>
		</div>
	)
}