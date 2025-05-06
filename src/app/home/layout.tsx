export default function HomeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="flex flex-col items-start w-full h-full min-h-screen">
			{children}
		</div>
	)
}