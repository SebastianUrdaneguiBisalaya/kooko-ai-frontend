"use client";

import Icon from "@/components/icon";
import UserProfile from "@/components/home/user-profile";
import Breadcrumbs from "@/components/home/breadcrumbs";
import Table from "@/components/home/table";
import CardAnalytics from "@/components/home/card-analytics";
import TagDate from "@/components/home/tag-date";

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

const tags = [
	{id: 1, date: "Hoy"},
	{id: 2, date: "Ayer"},
	{id: 3, date: "7 días"},
	{id: 4, date: "1 mes"},
	{id: 5, date: "3 meses"},
	{id: 6, date: "6 meses"},
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
			<main className="flex flex-col gap-4 items-start p-4 overflow-x-hidden w-full">
				<div className="flex flex-row items-center justify-between w-full">
					<div className="py-4">
						<h1 className="font-bold text-white text-lg sm:text-xl md:text-3xl">Bienvenido, Sebastian</h1>
						<h2 className="text-gray-300 text-base md:text-md">Te encuentras en tu panel web de facturación.</h2>
					</div>
					<div className="flex gap-4 items-center">
						<div className="flex gap-2 items-center">
							{
								tags.map((item) => (
									<TagDate
										key={item.id}
										date={item.date}
									/>
								))
							}
						</div>
					</div>
				</div>
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
			</main>
		</div>
	)
}