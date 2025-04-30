import Icon from "@/components/icon";

export default function Loading() {
	return (
		<div className="flex flex-col items-center justify-center gap-4 w-full h-full min-h-screen p-6">
			<Icon />
			<p className="text-gray-300 text-md sm:text-lg text-center">Espere un momento mientras se carga la aplicación.</p>
			<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="#E0F15B" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity=".5"/><path fill="#E0F15B" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"><animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"/></path></svg>
		</div>
	)
}