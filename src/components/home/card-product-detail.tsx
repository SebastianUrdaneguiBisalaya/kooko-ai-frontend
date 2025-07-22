type CardProductDetailProps = {
	id: string;
	productName: string;
	productPrice: number;
	productQuantity: number;
}

export default function CardProductDetail({ productName, productPrice, productQuantity }: CardProductDetailProps) {
	return (
		<div className="flex flex-col items-start w-full border border-gray-400 rounded-md p-3 gap-1">
			<div className="flex items-center justify-between gap-2 w-full">
				<p className="text-gray-200 text-sm font-semibold">{productName}</p>
				<span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs w-fit text-center text-nowrap">{`${productQuantity} ud.`}</span>
			</div>
			<div className="flex items-center justify-between gap-2 w-full">
				<span className="text-xs text-gray-400">Precio unitario:</span>
				<span className="text-xs text-gray-400 font-medium">{`S/. ${productPrice}`}</span>
			</div>
			<div className="flex items-center justify-between gap-2 w-full">
				<span className="text-sm text-gray-400">Total:</span>
				<span className="text-sm text-gray-300 font-semibold">{`S/. ${productPrice * productQuantity}`}</span>
			</div>
		</div>
	)
}