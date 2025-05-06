"use client";

import { useState } from "react";
import Icon from "@/components/icon";
import UserProfile from "@/components/home/user-profile";
import Breadcrumbs from "@/components/home/breadcrumbs";
import Table from "@/components/home/table";
import CardAnalytics from "@/components/home/card-analytics";
import TagDate from "@/components/home/tag-date";
import DateRange from "@/components/home/date-range";
import SidebarDetail from "@/components/home/sidebar-detail";
import { Dayjs } from "dayjs";
import { SignOutWithGoogle } from "@/app/auth/actions";
import { useGetInvoiceDetailById } from "@/utils/api/hooks/useGet";

type UserPage = {
	user: {
		user_id: string;
		user_email: string;
		user_name: string;
		user_avatar: string;
	}
}

type Item = {
	id: number;
	date: string;
	time: string;
	payment_date: string;
	currency_type: string;
	payment_method: string;
	category_type: string;
	id_seller: string;
	name_seller: string;
	id_client: string;
	name_client: string;
	address: string;
	total: number;
	recorded_operation: number;
	igv: number;
	isc: number;
	unaffected: number;
	exonerated: number;
	export: number;
	free: number;
	discount: number;
	others_charge: number;
	others_taxes: number;
}

type ItemDetail = {
	id: string;
	id_invoice: string;
	product_name: string;
	unit_price: number;
	quantity: number;
}

type ItemDetailResponse = {
	prev: Item | null;
	next: ItemDetail[] | null;
}

const dataCardDetail = [
	 {
		 id: 1,
		 title: "Egreso mensual",
		 description: "Total del mes",
		 month: "05/2025",
		 total: 1950.00,
		 percentage: 25,
	 },
	 {
		 id: 2,
		 title: "Op. Gravada",
		 description: "Sub total del mes",
		 month: "05/2025",
		 total: 1950.00,
		 percentage: 25,
	 },
	 {
		 id: 3,
		 title: "Impuestos",
		 description: "Total del mes",
		 month: "05/2025",
		 total: 1950.00,
		 percentage: 25,
	 },
	 {
		 id: 4,
		 title: "Alimentación",
		 description: "Egreso del mes",
		 month: "05/2025",
		 total: 1950.00,
		 percentage: 25,
	 },
	 {
		 id: 5,
		 title: "Transporte",
		 description: "Egreso del mes",
		 month: "05/2025",
		 total: 1950.00,
		 percentage: 25,
	 },
	 {
		 id: 6,
		 title: "Servicios básicos",
		 description: "Egreso del mes",
		 month: "05/2025",
		 total: 1950.00,
		 percentage: 25,
	 },
	 {
		 id: 7,
		 title: "Salud",
		 description: "Egreso del mes",
		 month: "05/2025",
		 total: 1950.50,
		 percentage: 25,
	 },
	 {
		id: 8,
		title: "Educación",
		description: "Egreso del mes",
		month: "05/2025",
		total: 1950.50,
		percentage: 25,
	},
	{
		id: 9,
		title: "Tecnología",
		description: "Egreso del mes",
		month: "05/2025",
		total: 1950.50,
		percentage: 25,
	},
	{
		id: 10,
		title: "Entretenimiento",
		description: "Egreso del mes",
		month: "05/2025",
		total: 1950.50,
		percentage: 25,
	},
	{
		id: 11,
		title: "Hogar y oficina",
		description: "Egreso del mes",
		month: "05/2025",
		total: 1950.50,
		percentage: 25,
	},
]

const tags = [
	{id: 1, date: "Hoy"},
	{id: 2, date: "Ayer"},
	{id: 7, date: "7 días"},
	{id: 30, date: "1 mes"},
	{id: 90, date: "3 meses"},
	{id: 180, date: "6 meses"},
]

type DateRangeValue = [Dayjs | null, Dayjs | null] | null;

export default function Home({ user }: UserPage) {
	const [dateRange, setDateRange] = useState<{ startDate: string | null, endDate: string | null }>({ startDate: null, endDate: null });
	const [showDetail, setShowDetail] = useState<boolean>(false);
	const [dateIndexSelected, setDateIndexSelected] = useState<number>(0);
	const [shouldFetchData, setShouldFetchData] = useState<boolean>(false);
	const [selectedInvoice, setSelectedInvoice] = useState<Item | null>(null);

	const {
			data: invoiceDetail,
			isLoading: isLoadingInvoiceDetail,
			isError: isErrorInvoiceDetail
		} = useGetInvoiceDetailById({
			id: selectedInvoice?.id.toString() || "",
			enabled: !!selectedInvoice?.id.toString(),
		});

	const onChangeDateRange = (_dates: DateRangeValue, dateString: [string, string]) => {
		if (dateString && dateString[0] && dateString[1]) {
			setDateRange({
				startDate: dateString[0],
				endDate: dateString[1],
			});
		} else {
			setDateRange({
				startDate: null,
				endDate: null,
			});
		}
	}
	const handleSearchDataByFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		console.log(dateRange);
		setShouldFetchData(true);
	}
	const handleTagDateClick = (id: number) => {
		const today = new Date();
		today.setDate(today.getDate() - id);
		setDateIndexSelected(id);
		setDateRange({
			startDate: today.toISOString().split("T")[0],
			endDate: null,
		})
		setShouldFetchData(true);
	}
	return (
		<div className="flex flex-col w-full p-4">
			<header className="flex flex-row justify-between items-center w-full p-4">
				<div className="flex flex-col items-start gap-3">
					<Icon />
					<Breadcrumbs name="Sebastian Urdanegui" title="Dashboard" />
				</div>
				<UserProfile
					name="Sebastian Urdanegui"
					email="sebasurdanegui@gmail.com"
					signOutWithGoogle={SignOutWithGoogle}
				/>
			</header>
			<main className="flex flex-col gap-4 items-start p-4 overflow-x-hidden w-full">
				<div className="flex flex-row items-center justify-between w-full">
					<div className="py-4">
						<h1 className="font-bold text-white text-lg sm:text-xl md:text-3xl">Bienvenido, Sebastian</h1>
						<h2 className="text-gray-300 text-base md:text-md">Te encuentras en tu panel web de facturación.</h2>
					</div>
					<div className="flex flex-col items-end gap-4">
						<div className="flex gap-4 items-center">
							<DateRange onChange={onChangeDateRange} />
							<button
								type="button"
								onClick={handleSearchDataByFilter}
								className="bg-green rounded-full flex flex-col justify-center items-center cursor-pointer p-2"
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#000000" d="M6.4 18L5 16.6L14.6 7H6V5h12v12h-2V8.4z"/></svg>
							</button>
							<button
								type="button"
								className="rounded-full flex flex-col justify-center items-center cursor-pointer p-2 border border-green hover:border-gray-300"
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="#E0F15B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="#E0F15B"><path d="M3.5 13v-.804c0-2.967 0-4.45.469-5.636c.754-1.905 2.348-3.407 4.37-4.118C9.595 2 11.168 2 14.318 2c1.798 0 2.698 0 3.416.253c1.155.406 2.066 1.264 2.497 2.353c.268.677.268 1.525.268 3.22V13"/><path d="M3.5 12a3.333 3.333 0 0 1 3.333-3.333c.666 0 1.451.116 2.098-.057a1.67 1.67 0 0 0 1.179-1.18c.173-.647.057-1.432.057-2.098A3.333 3.333 0 0 1 13.5 2m-6 15.22C7.445 16.03 6.622 16 5.505 16c-1.72 0-2.005.406-2.005 2v2c0 1.594.285 2 2.005 2c1.117 0 1.94-.03 1.995-1.22m13-4.78l-1.777 4.695c-.33.87-.494 1.305-.755 1.305c-.26 0-.426-.435-.755-1.305L15.436 16m-2.56 0h-1.18c-.473 0-.709 0-.895.076c-.634.26-.625.869-.625 1.424s-.009 1.165.625 1.424c.186.076.422.076.894.076s.708 0 .894.076c.634.26.625.869.625 1.424s.009 1.165-.625 1.424c-.186.076-.422.076-.894.076H10.41"/></g></svg>
							</button>
						</div>
						<div className="flex gap-2 items-center">
							{
								tags.map((item) => (
									<TagDate
										key={item.id.toString()}
										id={item.id}
										date={item.date}
										onClick={handleTagDateClick}
										dateIndexSelected={dateIndexSelected}
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
				<Table
					user_id={user.user_id}
					dateRange={shouldFetchData ? dateRange : undefined}
					setSelectedInvoice={setSelectedInvoice}
					setShowDetail={setShowDetail}
				/>
			</main>
			{
				showDetail && invoiceDetail && !isLoadingInvoiceDetail && (
					<SidebarDetail
						data={{
							prev: selectedInvoice,
							next: invoiceDetail,
						}}
						setShowDetail={setShowDetail}
					/>
				)
			}
			{
				isErrorInvoiceDetail && (
					<div className="flex items-center gap-3 fixed bottom-10 right-4 max-w-96 w-full h-fit bg-dark border border-gray-400 rounded-xl shadow-2xl p-4 z-[100]">
						<span>
							<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#e11d48" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10c-.006 5.52-4.48 9.994-10 10Zm-1-7v2h2v-2h-2Zm0-8v6h2V7h-2Z"/></svg>
						</span>
						<p className="text-gray-300 text-sm">Ocurrió un problema al cargar los datos de la factura/boleta.</p>
					</div>
				)
			}
		</div>
	)
}