import { useRef, useMemo, useEffect } from "react"
import {
	useReactTable,
	getCoreRowModel,
	flexRender,
	createColumnHelper
 } from "@tanstack/react-table";
import { useItemsTable } from "@/hooks/useItemsTable";

type Item = {
	id: number;
	id_invoice: string;
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

const columnHelper = createColumnHelper<Item>();

const columns = [
	columnHelper.accessor("date", {
		header: "Fecha",
		cell: info => info.getValue(),
	}),
	columnHelper.accessor("time", {
		header: "Hora",
		cell: info => info.getValue(),
	}),
	columnHelper.accessor("payment_method", {
		header: "Método de Pago",
		cell: info => info.getValue(),
	}),
	columnHelper.accessor("currency_type", {
		header: "Tipo de Moneda",
		cell: info => info.getValue(),
	}),
	columnHelper.accessor("category_type", {
		header: "Categoría",
		cell: info => info.getValue(),
	}),
	columnHelper.accessor("id_seller", {
		header: "ID Vendedor",
		cell: info => info.getValue(),
	}),
	columnHelper.accessor("name_seller", {
		header: "Nombre Vendedor",
		cell: info => info.getValue(),
	}),
	columnHelper.accessor("id_client", {
		header: "ID Cliente",
		cell: info => info.getValue(),
	}),
	columnHelper.accessor("name_client", {
		header: "Nombre Cliente",
		cell: info => info.getValue(),
	}),
	columnHelper.accessor("address", {
		header: "Dirección",
		cell: info => info.getValue(),
	}),
	columnHelper.accessor("total", {
		header: "Subtotal",
		cell: info => info.getValue(),
	}),
	columnHelper.accessor("recorded_operation", {
		header: "Op. Gravada",
		cell: info => info.getValue(),
	}),
	columnHelper.accessor("igv", {
		header: "I.G.V.",
		cell: info => info.getValue(),
	}),
	columnHelper.accessor("isc", {
		header: "I.S.C.",
		cell: info => info.getValue(),
	}),
	columnHelper.accessor("unaffected", {
		header: "Op. Exonerada",
		cell: info => info.getValue(),
	}),
	columnHelper.accessor("exonerated", {
		header: "Op. Exonerada",
		cell: info => info.getValue(),
	}),
	columnHelper.accessor("export", {
		header: "Op. Exportación",
		cell: info => info.getValue(),
	}),
	columnHelper.accessor("free", {
		header: "Op. Gratuita",
		cell: info => info.getValue(),
	}),
	columnHelper.accessor("discount", {
		header: "Descuento",
		cell: info => info.getValue(),
	}),
	columnHelper.accessor("others_charge", {
		header: "Otros Cargos",
		cell: info => info.getValue(),
	}),
	columnHelper.accessor("others_taxes", {
		header: "Otros Impuestos",
		cell: info => info.getValue(),
	}),
];

type TableProps = {
	user_id: string;
	setShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
	setSelectedInvoice: React.Dispatch<React.SetStateAction<Item | null>>;
	dateRange?: { startDate: string | null; endDate: string | null };
}

export default function Table({ user_id, setShowDetail, setSelectedInvoice, dateRange }: TableProps) {
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		isError
	} = useItemsTable(user_id, dateRange);
	const items =  useMemo(
		() => data?.pages.flatMap(page => page.items) ?? [],
		[data]
	);
	const table = useReactTable({
		data: items,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});
	const handleOnClickCell = (data: Item) => {
		setSelectedInvoice(data);
		setShowDetail(true);
	}
	const observerRef = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		if (!observerRef.current || !hasNextPage) return;
		const observer = new IntersectionObserver(
			entries => {
				if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
					fetchNextPage();
				}
			},
			{
				threshold: 0.5,
			}
		);
		const currentTarget = observerRef.current;
		if (currentTarget) {
			observer.observe(currentTarget);
		}
		return () => {
			if (currentTarget) {
				observer.unobserve(currentTarget);
			}
		}
	}, [fetchNextPage, hasNextPage, isFetchingNextPage]);

	if (isLoading) return <p className="text-gray-300 text-sm text-center">Cargando...</p>;
	if (isError) return <p className="text-gray-300 text-sm text-center">Error al cargar los datos.</p>;
	return (
		<div className="flex flex-col p-4 w-full overflow-x-auto scrollbar bg-blue-dark/40 rounded-2xl">
			<table className="min-w-full table-auto">
				<thead className="">
					{
						table.getHeaderGroups().map(headerGroup => (
							<tr
								key={headerGroup.id}
								className="border-t border-t-gray-500"
							>
								{
									headerGroup.headers.map(header => (
										<th
											key={header.id}
											className="text-white font-medium text-xs px-4 py-2 whitespace-nowrap"
										>
											{flexRender(header.column.columnDef.header, header.getContext())}
										</th>
									))
								}
							</tr>
						))
					}
				</thead>
				<tbody>
					{
						table.getRowModel().rows.map(row => (
							<tr
								key={row.id}
								onClick={() => handleOnClickCell({...row.original})}
								className="cursor-pointer transition hover:shadow-md hover:bg-white/5 hover:border-y-2 hover:border-green odd:bg-blue-dark even:bg-blue-dark/20 rounded-md"
							>
								{
									row.getVisibleCells().map(cell => (
										<td
											key={cell.id}
											className="text-gray-300 text-center px-4 py-2 font-normal text-sm whitespace-nowrap"
										>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</td>
									))
								}
							</tr>
						))
					}
				</tbody>
			</table>
			<div className="w-full h-4 my-2" ref={observerRef} />
			{
				isFetchingNextPage && (
					<p
						className="text-gray-300 text-sm font-semibold text-center"
					>
						Cargando más datos...
					</p>
				)
			}
			{
				!hasNextPage && items.length > 0 && (
					<p className="text-gray-300 text-sm font-semibold text-center">No hay más datos.</p>
				)
			}
			{
				items.length === 0 && (
					<p className="text-gray-300 text-sm font-semibold text-center">No hay datos.</p>	
				)
			}
		</div>
	)
}