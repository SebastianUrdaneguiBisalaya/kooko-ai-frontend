"use client";

import Icon from "@/components/icon";
import UserProfile from "@/components/home/user-profile";
import Breadcrumbs from "@/components/home/breadcrumbs";

export default function Home() {
	return (
		<div className="flex flex-col w-full p-4">
			<header className="flex flex-row justify-between items-center w-full p-4">
				<div className="flex flex-col items-start gap-3">
					<Icon />
					<Breadcrumbs name="Sebastian Urdanegui" title="Dashboard" />
				</div>
				<UserProfile name="Sebastian Urdanegui" email="sebasurdanegui@gmail.com" />
			</header>
			<main className="flex flex-col items-start p-4">
				<div className="flex flex-col items-start gap-2">
					<h1 className="font-bold text-white text-lg sm:text-xl md:text-3xl">Bienvenido, Sebastian</h1>
					<h2 className="text-gray-300 text-base md:text-md">Te encuentras en tu panel web de facturación.</h2>
				</div>
			</main>
		</div>
	)
}