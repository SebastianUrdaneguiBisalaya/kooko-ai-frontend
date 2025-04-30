export default function HomeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="flex flex-col items-start w-full h-full min-h-screen bg-background bg-[url('/ellipse-gradient.png')]">
			{children}
		</div>
	)
}