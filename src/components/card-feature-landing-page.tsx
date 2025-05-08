type CardFeatureLandingPageProps = {
	title: string;
	description: string;
	icon: React.ReactNode;
}

export default function CardFeatureLandingPage({ title, description, icon }: CardFeatureLandingPageProps) {
	return (
		<div className="flex flex-col items-start w-full border border-gray-500 rounded-md p-4 gap-1 shadow-lg hover:shadow-2xl shadow-gray-900 bg-gray/10">
			<span>
				{icon}
			</span>
			<p
				className="text-white text-base sm:text-lg font-semibold"
			>
				{title}
			</p>
			<span
				className="text-gray-400 text-sm"
			>
				{description}
			</span>
		</div>
	)
}