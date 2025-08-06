import PeliculaDestacada from "../components/PeliculaDestacada";
import GaleriaPeliculas from "../components/GaleriaPeliculas";
import peliculasData from "../data/peliculas.json";

import { Film } from "lucide-react";

const Peliculas = () => {
	return (
		<>
			{/* Novedades */}
			<section className="px-6 py-10">
				<h2 className="text-3xl sm:text-4xl font-semibold text-white text-center mb-6 flex items-center justify-center gap-3">
					<Film className="w-8 h-8 text-purple-400" />
					<span className="tracking-tight rocknroll">Novedades</span>
				</h2>
				<PeliculaDestacada
					imagen={peliculasData.destacada.imagen}
					alt={peliculasData.destacada.alt}
					trailer={peliculasData.destacada.trailer}
					titulo={peliculasData.destacada.titulo}
					descripcion={peliculasData.destacada.descripcion}
				/>
			</section>

			{/* Galería de Películas */}
			<GaleriaPeliculas peliculas={peliculasData.galeria} />
		</>
	);
};

export default Peliculas;
