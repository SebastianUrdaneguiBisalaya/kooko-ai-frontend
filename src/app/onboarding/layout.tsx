export default function OnboardingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="relative flex flex-col items-start max-w-4xl w-full h-full min-h-screen">
			{children}
		</div>
	)
}