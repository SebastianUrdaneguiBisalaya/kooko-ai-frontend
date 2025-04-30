export default function HomeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="flex flex-col items-center justify-center w-full h-full min-h-screen bg-background p-6">
			{children}
		</div>
	)
}