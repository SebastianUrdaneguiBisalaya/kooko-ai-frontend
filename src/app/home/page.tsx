"use client";

import Icon from "@/components/icon";
import UserProfile from "@/components/home/user-profile";

export default function Home() {
	return (
		<div className="flex w-full p-4">
			<header className="flex flex-row justify-between items-center w-full">
				<Icon />
				<UserProfile name="Sebastian Urdanegui" email="sebasurdanegui@gmail.com" />
			</header>
			<main className="">
				<div></div>
			</main>
		</div>
	)
}