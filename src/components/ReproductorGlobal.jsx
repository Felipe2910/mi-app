import { useState, useEffect } from "react";
import { useReproductor } from "../context/ReproductorContext";
import {
	Pause,
	Play,
	Volume2,
	VolumeX,
	ChevronDown,
	ChevronUp,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react";

const ReproductorGlobal = () => {
	const { cancion, estaReproduciendo, togglePlay, irASiguiente, irAnterior, audioRef } =
		useReproductor();

	const [volumen, setVolumen] = useState(1);
	const [muteado, setMuteado] = useState(false);
	const [tiempo, setTiempo] = useState(0);
	const [duracion, setDuracion] = useState(0);
	const [colapsado, setColapsado] = useState(false);

	useEffect(() => {
		if (!cancion?.src) return;

		const audio = audioRef.current;

		// Establece la fuente
		audio.src = cancion.src;

		// Intenta reproducir el audio
		const playPromise = audio.play();
		if (playPromise !== undefined) {
			playPromise.catch((error) => {
				if (error.name !== "AbortError") {
					console.error("Error al reproducir:", error);
				}
			});
		}

		const onTimeUpdate = () => setTiempo(audio.currentTime);
		const onLoadedMetadata = () => setDuracion(audio.duration || 0);

		audio.addEventListener("timeupdate", onTimeUpdate);
		audio.addEventListener("loadedmetadata", onLoadedMetadata);

		return () => {
			audio.removeEventListener("timeupdate", onTimeUpdate);
			audio.removeEventListener("loadedmetadata", onLoadedMetadata);
		};
	}, [cancion, audioRef]);

	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / 60) || 0;
		const secs = Math.floor(seconds % 60) || 0;
		return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
	};

	const handleVolume = (value) => {
		const audio = audioRef.current;
		audio.volume = value;
		setVolumen(value);
		setMuteado(value === 0);
	};

	if (!cancion) return null;

	return (
		<div
			className={`sticky bottom-0 left-0 right-0 bg-[#222] text-white px-6 py-2 lg:h-18 grid grid-cols-1 md:grid-cols-3 gap-4 shadow-2xl z-50 transition-all duration-300
	  ${colapsado ? "opacity-30 translate-y-10 hover:opacity-100" : "opacity-100 translate-y-0"}
	  `}
		>
			<div className="flex flex-row items-center gap-2">
				{cancion.imagen && (
					<div className="w-20 lg:w-14 animate-spin [animation-duration:5s] rounded-full overflow-hidden">
						<img src={cancion.imagen} alt={cancion.titulo} className="w-full h-full object-cover" />
					</div>
				)}
				<div className="flex flex-col">
					<span className="font-semibold">{cancion.titulo}</span>
					{cancion.artista && <span className="text-sm text-gray-400">{cancion.artista}</span>}
				</div>
			</div>
			<div className="absolute right-4 top-1">
				<button
					onClick={() => setColapsado(!colapsado)}
					className="text-white hover:text-red-500 transition"
					title={colapsado ? "Mostrar reproductor" : "Ocultar reproductor"}
				>
					{colapsado ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
				</button>
			</div>

			<audio ref={audioRef} />

			<div className="flex flex-col items-center">
				<div className="flex items-center gap-4">
					<button className="bg-neutral-700 p-1 rounded-full" onClick={irAnterior} title="Anterior">
						<ChevronsLeft />
					</button>
					<button
						onClick={togglePlay}
						className={`bg-[#5c0000] p-2 rounded-full transition-transform duration-200 hover:scale-110 ${
							estaReproduciendo ? "animate-pulse" : ""
						}`}
						title={estaReproduciendo ? "Pausar" : "Reproducir"}
					>
						{estaReproduciendo ? <Pause size={20} /> : <Play size={20} />}
					</button>
					<button
						className="bg-neutral-700 p-1 rounded-full"
						onClick={irASiguiente}
						title="Siguiente"
					>
						<ChevronsRight />
					</button>
				</div>

				<div className="flex flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
					<span className="text-xs text-gray-300 w-12 text-right">{formatTime(tiempo)}</span>
					<div className="w-full sm:w-64 slider-hvr">
						<style jsx>{`
							.slider-hvr:hover .custom-range::-webkit-slider-thumb {
								transform: scale(1.2);
								box-shadow: 0 0 0 3px #ef4444;
							}
							.custom-range::-webkit-slider-thumb {
								-webkit-appearance: none;
								appearance: none;
								height: 6px;
								width: 6px;
								background: white;
								border-radius: 9999px;
								box-shadow: 0 0 0 2px #ef4444;
								transition: transform 0.2s ease, box-shadow 0.2s ease;
								cursor: pointer;
								position: relative;
								z-index: 10;
							}
							.custom-range::-webkit-slider-thumb:hover {
								transform: scale(1.3);
								box-shadow: 0 0 0 3px #ef4444;
							}
							.custom-range::-webkit-slider-runnable-track {
								background: linear-gradient(
									to right,
									#ef4444 0%,
									#ef4444 ${(tiempo / (duracion || 1)) * 100}%,
									#374151 ${(tiempo / (duracion || 1)) * 100}%,
									#374151 100%
								);
								height: 6px;
								border-radius: 9999px;
							}
							.custom-range::-moz-range-thumb {
								height: 16px;
								width: 16px;
								background: white;
								border: none;
								border-radius: 9999px;
								box-shadow: 0 0 0 2px #ef4444;
								transition: transform 0.2s ease, box-shadow 0.2s ease;
								cursor: pointer;
								position: relative;
								z-index: 10;
							}
							.custom-range::-moz-range-thumb:hover {
								transform: scale(1.3);
								box-shadow: 0 0 0 3px #ef4444;
							}
							.custom-range::-moz-range-track {
								background: #ef4444;
								height: 6px;
								border-radius: 9999px;
							}
						`}</style>
						<input
							type="range"
							min={0}
							max={duracion}
							step="0.25"
							value={tiempo}
							onChange={(e) => {
								const audio = audioRef.current;
								const nuevoTiempo = parseFloat(e.target.value);
								audio.currentTime = nuevoTiempo;
								setTiempo(nuevoTiempo);
							}}
							className="w-full h-1.5 appearance-none rounded-lg bg-neutral-700 custom-range"
						/>
					</div>
					<span className="text-xs text-gray-300 w-12">{formatTime(duracion)}</span>
				</div>
			</div>

			<div className="flex flex-row-reverse items-center gap-2">
				<div className="w-24 slider-hvr2">
					<style jsx>{`
						.slider-hvr2:hover .custom-volume::-webkit-slider-thumb {
							transform: scale(1.2);
							box-shadow: 0 0 0 3px #ef4444;
						}
						.custom-volume::-webkit-slider-thumb {
							-webkit-appearance: none;
							height: 6px;
							width: 6px;
							background: white;
							border-radius: 9999px;
							box-shadow: 0 0 0 2px #ef4444;
							transition: transform 0.2s ease, box-shadow 0.2s ease;
							cursor: pointer;
						}
						.custom-volume::-webkit-slider-thumb:hover {
							transform: scale(1.2);
							box-shadow: 0 0 0 3px #ef4444;
						}
						.custom-volume::-webkit-slider-runnable-track {
							background: linear-gradient(
								to right,
								#ef4444 ${volumen * 100}%,
								#374151 ${volumen * 100}%
							);
							height: 6px;
							border-radius: 9999px;
						}
						.custom-volume::-moz-range-thumb {
							height: 14px;
							width: 14px;
							background: white;
							border: none;
							border-radius: 9999px;
							box-shadow: 0 0 0 2px #ef4444;
							transition: transform 0.2s ease, box-shadow 0.2s ease;
							cursor: pointer;
						}
						.custom-volume::-moz-range-thumb:hover {
							transform: scale(1.2);
							box-shadow: 0 0 0 3px #ef4444;
						}
						.custom-volume::-moz-range-track {
							background: #ef4444;
							height: 6px;
							border-radius: 9999px;
						}
					`}</style>
					<input
						type="range"
						min={0}
						max={1}
						step="0.01"
						value={volumen}
						onChange={(e) => handleVolume(parseFloat(e.target.value))}
						className="w-full h-1.5 appearance-none rounded-lg bg-neutral-700 custom-volume"
					/>
				</div>
				<button
					onClick={() => handleVolume(muteado ? 1 : 0)}
					className="transition-transform duration-300 hover:rotate-12"
					title={muteado ? "Activar sonido" : "Silenciar"}
				>
					{muteado ? <VolumeX size={20} /> : <Volume2 size={20} />}
				</button>
			</div>
		</div>
	);
};

export default ReproductorGlobal;
