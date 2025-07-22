"use client"

import { useState } from "react"
import { useRouter } from "next/navigation";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import Icon from "@/components/icon"
import { usePatchUserDataById } from "@/utils/api/hooks/usePatch";

type UserPage = {
	user: {
		user_id: string;
		user_email: string;
		user_name: string;
		user_avatar: string;
	}
}

type PersonalData = {
	phoneNumber: string;
	countryCode: string;
}

export default function Onboarding({ user }: UserPage) {
	const router = useRouter();
	const [personalData, setPersonalData] = useState<PersonalData>({
		phoneNumber: "",
		countryCode: "pe",
	});
	const { mutate: updateUserData, isPending } = usePatchUserDataById();
	const handleSubmit = async () => {
		if (personalData.phoneNumber.length < 9) return;
		updateUserData(
			{
				id: user.user_id,
				phoneNumber: personalData.phoneNumber,
				countryCode: personalData.countryCode,
			},
			{
				onSuccess: () => {
					router.push("/home");
				},
				onError: () => {
					throw new Error(`Hubo un problema con la solicitud al servidor. Por favor, inténtalo de nuevo más tarde.`);
				},
			}
		)
	}
	return (
		<div className="flex flex-col items-start gap-6 grow justify-center h-full w-full p-4">
			<Icon />
			<h1 className="font-bold text-white text-lg sm:text-xl md:text-3xl">Ingresar número de contacto</h1>
			<div>
				<h2 className="text-gray-300 text-base md:text-md">El número de contacto debe estar registrado en la aplicación de Telegram.</h2>
				<p className="text-gray-400 text-sm">Solicitamos esta información para que puedas utilizar nuestro bot de Telegram.</p>
			</div>
			<div className="flex items-center gap-3">
				<PhoneInput
					defaultCountry="pe"
					value={personalData.phoneNumber}
					onChange={(phone, metadata) => {
						setPersonalData({
							phoneNumber: phone,
							countryCode: metadata.country.iso2,
						})
					}}
				/>
				<button
					type="button"
					onClick={handleSubmit}
					className="bg-green rounded-full flex flex-col justify-center items-center cursor-pointer p-2"
				>
				{
					isPending ? (
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#000000" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity=".5"/><path fill="#000000" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"><animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"/></path></svg>
					) : (
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#000000" d="M6.4 18L5 16.6L14.6 7H6V5h12v12h-2V8.4z"/></svg>
					)
				}
				</button>
			</div>
		</div>
	)
}