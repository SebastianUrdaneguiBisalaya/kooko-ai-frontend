import { useState, useEffect, useRef, useCallback } from "react";

interface ModalJoinWaitListProps {
	isOpen: boolean,
	onClose: () => void,
	triggerPosition?: { x: number, y: number };
}

export default function ModalJoinWaitlist({ isOpen, onClose, triggerPosition }: ModalJoinWaitListProps) {
	const [showModal, setShowModal] = useState<boolean>(false);
	const [isClosing, setIsClosing] = useState<boolean>(false);
	const [isAnimating, setIsAnimating] = useState<boolean>(false);
	const closeButtonRef = useRef<HTMLButtonElement>(null);
	const previouslyFocusedElement = useRef<HTMLElement | null>(null);
	const modalRef = useRef<HTMLDivElement>(null);
	
	useEffect(() => {
		if (isOpen) {
			setShowModal(true);
		}
	}, [isOpen]);

	const startClose = useCallback(() => {
		setIsClosing(true);
		setIsAnimating(false);
		setTimeout(() => {
			setIsClosing(false);
			setShowModal(false);
			onClose();
		}, 300);
	}, [onClose])

	useEffect(() => {
		if (showModal && triggerPosition) {
			requestAnimationFrame(() => {
				setIsAnimating(true);
			});
			previouslyFocusedElement.current = document.activeElement as HTMLElement;
			document.body.style.overflowY = 'hidden';
			closeButtonRef.current?.focus();
			const handleKeyDown = (event: KeyboardEvent) => {
				if (event.key === "Escape") {
					startClose()
				}
			}
			document.addEventListener("keydown", handleKeyDown);
			return () => {
				document.body.style.overflowY = "unset";
				document.removeEventListener("keydown", handleKeyDown);
				previouslyFocusedElement.current?.focus();
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
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isClosing ? "opacity-0" : "opacity-50"
        }`}
      ></div>

      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-register"
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
        <h2 id="success-register" className="text-2xl text-white text-center font-bold mb-4">
					¡Registro exitoso! 🚀
        </h2>
        <p id="modal-description" className="mb-6 text-gray-400 text-center">
					Muy pronto te enviaremos un correo para confirmarte el lanzamiento de la aplicación. !Gracias!
        </p>
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