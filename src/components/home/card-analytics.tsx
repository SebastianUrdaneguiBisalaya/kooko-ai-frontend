import roundedFloat from "@/utils/home/home";

type CardAnalyticsProps = {
	title: string,
	description: string,
	month: string,
	total: number,
	percentage: number,
}

export default function CardAnalytics({ title, description, month, total, percentage }: CardAnalyticsProps) {
	return (
		<div className="flex flex-col justify-between bg-gray/10 min-w-80 w-full h-full rounded-xl p-4">
			<p className="text-gray-200 font-semibold text-sm sm:text-base">
				{title}
			</p>
			<div className="flex flex-row justify-between items-center gap-2">
				<span className="text-gray-400 font-normal text-xs">{description}</span>
				<span className="text-gray-400 font-normal text-xs">{month}</span>
			</div>
			<p className="text-white font-extrabold text-xl sm:text-2xl">{`S/. ${roundedFloat(total, 2)}`}</p>
			<div className="flex flex-row items-end gap-4">
				<div className="flex flex-col justify-center items-center">
					<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16"><path fill="#E0F15B" d="M5 11h3v5H5zm-4 3h3v2H1zm12-2h3v4h-3zM9 9h3v7H9zm7-8.93l-5.68 4.97l-5.47-1.7L0 7.1V9l5.15-4l5.53 1.72L16 2.06z"/></svg>
				</div>
				<span className="text-gray-400 font-semibold text-xs sm:text-sm">{`${percentage}%`}<span className="font-normal"> al mes anterior</span></span>
			</div>
		</div>
	)
}