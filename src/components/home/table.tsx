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
	title: string;
}

const columnHelper = createColumnHelper<Item>();

const columns = [
	columnHelper.accessor("id", {
		header: "ID",
		cell: info => info.getValue(),
	}),
	columnHelper.accessor("title", {
		header: "Titulo",
		cell: info => info.getValue(),
	}),
];

export default function Table() {
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useItemsTable();
	const items =  useMemo(
		() => data?.pages.flatMap(page => page.items) ?? [],
		[data]
	)
	const table = useReactTable({
		data: items,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});
	const observerRef = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		if (!observerRef.current || !hasNextPage) return;
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting && hasNextPage) {
				fetchNextPage();
			}
		});
		observer.observe(observerRef.current);
		return () => observer.disconnect();
	}, [fetchNextPage, hasNextPage]);

	return (
		<div>
			<table>
				<thead>
					{
						table.getHeaderGroups().map(headerGroup => (
							<tr key={headerGroup.id}>
								{
									headerGroup.headers.map(header => (
										<th
											key={header.id}
											className=""
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
							>
								{
									row.getVisibleCells().map(cell => (
										<td
											key={cell.id}
											className=""
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
			<div ref={observerRef} />
			{
				isFetchingNextPage && (
					<p
						className="text-gray-300 text-sm font-semibold text-center"
					>
						Cargando más datos...
					</p>
				)
			}
		</div>
	)
}