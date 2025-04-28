import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

type ModalCreditProps = {
	isOpen: boolean,
	onClose: () => void;
	triggerPosition?: { x: number, y: number };
}

export default function ModalCredits({ isOpen, onClose, triggerPosition }: ModalCreditProps) {
	const [showModal, setShowModal] = useState<boolean>(false);
	const [isClosing, setIsClosing] = useState<boolean>(false);
	const [isAnimating, setIsAnimating] = useState<boolean>(false);
	const modalRef = useRef<HTMLDivElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);
	const previouslyFocusedElement = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (isOpen) {
			setShowModal(true)
		}
	}, [isOpen]);

	const startClose = useCallback(() => {
		setIsClosing(true)
		setIsAnimating(false)
		setTimeout(() => {
			setIsClosing(false)
			setShowModal(false)
			onClose()
		}, 300)
	}, [onClose]);

	useEffect(() => {
		if (showModal && triggerPosition) {
			requestAnimationFrame(() => {
				setIsAnimating(true)
			});
			previouslyFocusedElement.current = document.activeElement as HTMLDivElement;
			document.body.style.overflowY = 'hidden'
			closeButtonRef.current?.focus()
			const handleyKeyDown = (event: KeyboardEvent) => {
				if (event.key === "Escape") {
					startClose();
				}
			}
			document.addEventListener("keydown", handleyKeyDown);
			return () => {
				document.body.style.overflowY = "unset"
				document.removeEventListener("keydown", handleyKeyDown);
				previouslyFocusedElement.current?.focus()
			}
		}
	}, [showModal, triggerPosition, startClose]);

	if (!showModal || !triggerPosition) return null;

	const centerX = window.innerWidth / 2;
	const centerY = window.innerHeight / 2;
	const initialX = triggerPosition.x;
	const initialY = triggerPosition.y;
	const translateX = centerX - initialX;
	const translateY = centerY - initialY;

	return (
		<>
			<div className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${isClosing ? "opacity-0" : "opacity-50"}`}></div>
			<div
				ref={modalRef}
				role="dialog"
				aria-modal="true"
				aria-labelledby="founder"
				tabIndex={-1}
				className="fixed z-50 bg-blue-dark rounded-lg shadow-lg p-6 max-w-md w-full"
				style={{
					left: initialX,
					top: initialY,
					transform: `
						translate(-50%, -50%)
						translate(${isAnimating ? translateX : 0}px, ${isAnimating ? translateY : 0}px)
						scale(${isAnimating ? 1 : 0.5})
					`,
					transition: "transform 300ms ease, opacity 300ms ease",
					opacity: isClosing ? 0 : 1,
				}}
			>
				<h2
					id="founder"
					className="mb-4 text-2xl text-white text-center font-bold"
				>
					Créditos 👨🏻‍💻
				</h2>
				<div className="flex flex-row justify-between items-center gap-4 mb-6">
					<Image
						src="https://avatars.githubusercontent.com/u/97719271?v=4"
						width="100"
						height="100"
						alt="Sebastian Marat Urdanegui Bisalaya"
					/>
					<p
						className="text-gray-400"
					>
						El sistema chatbot en Telegram y la plataforma web fueron desarrollados por <a href="https://www.linkedin.com/in/sebastianurdaneguibisalaya/" target="_blank" className="font-semibold text-gray-300 cursor-pointer hover:underline">Sebastian Marat Urdanegui Bisalaya</a>. 
					</p>
				</div>
				<button
					type="button"
					ref={closeButtonRef}
					onClick={startClose}
					className="bg-green w-full font-semibold px-4 py-3 rounded-xl cursor-pointer"
				>
					Cerrar
				</button>
			</div>
		</>
	)
}