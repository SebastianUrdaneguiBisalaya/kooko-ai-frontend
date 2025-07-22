export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="flex flex-col items-center justify-center w-full h-full min-h-screen bg-background bg-[url('/ellipse-gradient.png')]">
			<div className="max-w-4xl w-full h-full grow flex flex-col items-center justify-center">
				{children}
			</div>
		</div>
	)
}