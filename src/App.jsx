import { useState, useEffect } from "react";
import "./App.css";
import Index from "./pages/Index";
import Peliculas from "./pages/Peliculas";
import Anime from "./pages/Anime";
import Musica from "./pages/Musica";
import ReproductorGlobal from "./components/ReproductorGlobal";
import { House, Film, Music, Tv } from "lucide-react";

// Importa el contexto
import { ReproductorProvider } from "./context/ReproductorContext";

const App = () => {
	const [paginaActual, setPaginaActual] = useState("index");

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [paginaActual]);

	const secciones = [
		{
			id: "index",
			label: "Inicio",
			icono: <House />,
			color: "emerald-400",
			titulo: "Bienvenido a Mi Mundo",
			imagen: "media/img/Blue.gif",
		},
		{
			id: "peliculas",
			label: "Películas",
			icono: <Film />,
			color: "purple-400",
			titulo: "Cine Favorito",
			imagen: "media/img/homelanderATcinema.gif",
			imagen2: "media/img/cineman.gif",
		},
		{
			id: "anime",
			label: "Anime",
			icono: <Tv />,
			color: "orange-400",
			titulo: "Anime Destacado",
			imagen: "media/img/Anime01.gif",
			imagen2: "media/img/Anime01.gif",
		},
		{
			id: "musica",
			label: "Música",
			icono: <Music />,
			color: "red-500",
			titulo: "Lo que me mueve",
			imagen: "media/img/spongedance-4.gif",
			imagen2: "media/img/spongedance-4.gif",
		},
	];
	const seccionActual = secciones.find((s) => s.id === paginaActual);

	const paginas = {
		index: <Index />,
		peliculas: <Peliculas />,
		anime: <Anime />,
		musica: <Musica />,
	};

	return (
		// Envuelve tu app en el provider
		<ReproductorProvider>
			<div className="min-h-[100dvh] bg-[#1a1a40] text-white font-sans">
				<header className="bg-[#292c3e] shadow-md py-4 sticky top-0 z-50">
					{seccionActual && (
						<div className="flex items-center justify-center gap-4">
							{/* Imagen izquierda */}
							{seccionActual.imagen && (
								<img src={seccionActual.imagen} alt="decoración izquierda" className="h-12 rounded" />
							)}

							{/* Título central */}
							<h1 className={`text-2xl rocknroll font-bold text-${seccionActual.color}`}>
								{seccionActual.titulo}
							</h1>

							{/* Imagen derecha */}
							{seccionActual.imagen2 && (
								<img src={seccionActual.imagen2} alt="decoración derecha" className="h-12 rounded" />
							)}
						</div>
					)}
					<nav className="flex justify-center gap-2 md:gap-6 mt-2 text-lg">
						{secciones.map(({ id, label, icono, color }) => (
							<button
								key={id}
								onClick={() => setPaginaActual(id)}
								className={`flex items-center gap-2 transition-all duration-200 
        ${paginaActual === id ? `text-${color} font-bold` : "text-white hover:text-yellow-300"}`}
							>
								{icono}
								{label}
							</button>
						))}
					</nav>
				</header>

				<main className="px-4 lg:px-12 py-6 pb-32">{paginas[paginaActual] || <Index />}</main>

				<ReproductorGlobal />

				<footer className="bg-[#111] text-center py-6">
					<hr className="border-gray-700 mb-4" />
					<p className="text-yellow-300 text-2xl fortnite">Enhanced by Felips2910</p>
					<img
						src="media/img/RAW01.gif"
						className="mx-auto my-4 w-[360px] h-[480px] rounded-lg"
						alt="RAW gif"
					/>
					<p>Felips 2024 MX. All rights reserved.</p>
				</footer>
			</div>
		</ReproductorProvider>
	);
};

export default App;
