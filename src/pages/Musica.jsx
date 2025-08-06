import Artista from "../components/Artista";
import CancionFavorita from "../components/CancionFavorita";
import musicaData from "../data/musica.json";

import { Headphones, Disc3 } from "lucide-react";

const Musica = () => {
	return (
		<section className="space-y-10 px-6 py-10">
			<h2 className="text-3xl sm:text-4xl font-semibold text-white text-center mb-6 flex items-center justify-center gap-3">
				<Disc3 className="w-8 h-8 text-red-500" />
				<span className="tracking-tight rocknroll">Lo que me mueve</span>
			</h2>
			<CancionFavorita
				titulo={musicaData.favorita.titulo}
				artista={musicaData.favorita.artista}
				colaboracion={musicaData.favorita.colaboracion}
				colors={musicaData.favorita.colors}
				colors2={musicaData.favorita.colors2}
				imagen={musicaData.favorita.imagen}
				video={musicaData.favorita.video}
			/>
			<h2 className="text-3xl sm:text-4xl font-semibold text-white text-center mb-6 flex items-center justify-center gap-3">
				<Headphones className="w-8 h-8 text-red-500" />
				<span className="tracking-tight rocknroll">Mis Artistas Favoritos</span>
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
				{musicaData.artistas.map((artista, index) => (
					<Artista
						key={index}
						nombre={artista.nombre}
						imagen={artista.imagen}
						canciones={artista.canciones}
					/>
				))}
			</div>
		</section>
	);
};

export default Musica;
