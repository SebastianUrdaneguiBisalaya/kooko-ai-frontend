import Image from "next/image"

type BreadcrumbsProps = {
	name: string;
	title: string;	
}

export default function Breadcrumbs({  name, title }: BreadcrumbsProps) {
	return (
		<div className="flex gap-2 items-center">
			<Image
				src="/profile-pic.png"
				width={25}
				height={25}
				className="rounded-xl"
				alt="User profile"
			/>
			<span className="text-gray-300 text-sm font-semibold">{name}</span>
			<span className="text-gray-400 text-sm">&gt;</span>
			<span className="text-gray-200 rounded-xl text-sm font-semibold px-2 bg-gray-600">{title}</span>
		</div>
	)
}