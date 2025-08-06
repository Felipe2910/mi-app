import { useState } from "react";
import Reproductor from "./ReproductorMini";
import { ChevronDown, ChevronUp, Ban } from "lucide-react";

const Artista = ({ nombre, imagen, canciones }) => {
	const [mostrar, setMostrar] = useState(false);

	return (
		<div className="relative bg-gradient-to-br from-gray-600/30 via-gray-600/50 to-gray-600/10 border border-gray-500 rounded-2xl overflow-hidden aspect-1/1 md:h-[200px] lg:h-[400px] shadow-md">
			{/* Título */}
			<h3 className="text-xl reggae font-bold text-white px-6 pt-4 z-10 relative">{nombre}</h3>

			{/* Imagen de fondo */}
			<img
				src={imagen}
				alt={nombre}
				className="absolute top-0 left-0 w-full h-full object-cover opacity-60 pointer-events-none"
			/>

			{/* Botón sobre las canciones */}
			<div
				className={`absolute bottom-0 left-0 w-full p-4 z-20 transition-transform duration-500 ${
					mostrar ? "translate-y-0" : "translate-y-[calc(100%-3rem)]"
				} bg-gradient-to-t from-black via-black/80 to-transparent backdrop-blur-md`}
			>
				<button
					onClick={() => setMostrar(!mostrar)}
					className="flex items-center justify-center gap-2 text-sm text-white bg-black/50 px-3 py-2 rounded hover:bg-black/70 transition mb-4 w-full"
					aria-expanded={mostrar}
					aria-controls={`lista-canciones-${nombre.replace(/\s+/g, "-").toLowerCase()}`}
				>
					{mostrar ? (
						<>
							Ocultar canciones <ChevronDown size={16} />
						</>
					) : (
						<>
							Mostrar canciones <ChevronUp size={16} />
						</>
					)}
				</button>

				{/* Lista de canciones */}
				<div
					id={`lista-canciones-${nombre.replace(/\s+/g, "-").toLowerCase()}`}
					role="list"
					className={`transition-opacity duration-300 ${
						mostrar ? "opacity-100" : "opacity-0 pointer-events-none"
					}`}
				>
					<ul className="space-y-2 max-h-[300px] md:max-h-[100px] lg:max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#00000000] hover:scrollbar-thumb-[#ffffff44]">
						{canciones.map((cancion, index) => (
							<li key={`${index}-${cancion.titulo}`} role="listitem">
								{cancion.src ? (
									<Reproductor
										src={cancion.src}
										titulo={cancion.titulo}
										listaCanciones={canciones.map((c) => ({ ...c, artista: nombre, imagen }))}
										artista={nombre}
										imagen={imagen}
									/>
								) : (
									<div className="flex items-center gap-2 bg-[#330000] px-4 py-2 rounded text-white w-fit">
										<span className="italic text-sm">{cancion.titulo}</span>
										<span className="flex items-center gap-1 text-sm text-gray-400 italic">
											<Ban size={16} />{" "}
											<span className="hidden lg:inline">audio no disponible</span>
										</span>
									</div>
								)}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Artista;
