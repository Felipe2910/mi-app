import AnimeDestacado from "../components/AnimeDestacado";
import TablaScrollAnime from "../components/TablaScrollAnime";
import animesData from "../data/animes.json";
import { Tv } from "lucide-react";

const Anime = () => {
	const animes = animesData.animes;

	// Extraer anime destacado (asumimos que siempre es el primero con .destacado)
	const destacado = animes.find((anime) => anime.destacado)?.destacado;

	return (
		<>
			<section className="px-6 py-10">
				<h2 className="text-3xl sm:text-4xl font-semibold text-white text-center mb-6 flex items-center justify-center gap-3">
					<Tv className="w-8 h-8 text-orange-400" />
					<span className="tracking-tight rocknroll">Novedades</span>
				</h2>

				{destacado && (
					<AnimeDestacado
						imagen={destacado.imagen}
						alt={destacado.alt}
						trailer={destacado.trailer}
						gif={destacado.gif}
						titulo={destacado.titulo}
						descripcion={destacado.descripcion}
					/>
				)}
			</section>

			{/* Tabla de Animes Favoritos */}
			<section className="px-6 py-10">
				<h2 className="text-3xl rocknroll font-bold text-center mb-6">🎌 Animes Favoritos</h2>
				<TablaScrollAnime animes={animes} />
			</section>
		</>
	);
};

export default Anime;
