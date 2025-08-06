import { Play, Pause } from "lucide-react";
import { useReproductor } from "../context/ReproductorContext";

const ReproductorMini = ({ src, titulo, listaCanciones, artista, imagen }) => {
	const { cancion, estaReproduciendo, togglePlay, reproducirDesdeLista } = useReproductor();

	const esLaMisma = cancion?.src === src;

	const manejarClick = () => {
		if (!src) return;

		if (esLaMisma) {
			togglePlay();
		} else {
			reproducirDesdeLista({ src, titulo, artista, imagen }, listaCanciones);
		}
	};

	return (
		<div className="flex items-center gap-2 bg-[#220000e8] px-3 py-2 rounded-lg w-fit">
			<button
				onClick={manejarClick}
				className="bg-[#5c0000] hover:bg-[#8b0000] p-2 rounded-full text-white group"
				title={esLaMisma && estaReproduciendo ? "Pausar" : "Reproducir"}
			>
				{esLaMisma && estaReproduciendo ? (
					<div className="flex relative justify-center gap-[1px] w-[20px] h-[20px]">
						{[0.2, 0.5, 0.6, 0, 0.4].map((delay, i) => (
							<div
								key={i}
								className="bg-white h-[20px] w-[2px] relative origin-bottom animate-playing group-hover:opacity-0 transition-opacity"
								style={{ animationDelay: `${delay}s` }}
							></div>
						))}
						<span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
							<Pause size={20} />
						</span>
					</div>
				) : (
					<Play size={20} />
				)}
			</button>
			<span className="text-sm italic text-white">{titulo}</span>
		</div>
	);
};

export default ReproductorMini;
