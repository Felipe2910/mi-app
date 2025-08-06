const TablaScrollAnime = ({ animes = [] }) => {
	return (
		<div className="h-auto md:h-[60vh] overflow-y-scroll scroll-smooth snap-y snap-mandatory scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#00000000] hover:scrollbar-thumb-[#ffffff44]">
			<div className="relative">
				{animes.map((anime, i) => {
					const bgColor = i % 2 === 0 ? "bg-[#2f1500]" : "bg-[#3b1c00]";
					return (
						<section
							key={anime.nombre}
							className={`snap-start h-auto md:h-[60vh] flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 px-4 py-6 md:px-6 md:py-12 ${bgColor} text-white transition-opacity duration-700 ease-in-out`}
						>
							{/* Número TOP */}
							<div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-[#004561] rounded-full text-xl md:text-2xl rocknroll font-extrabold shadow">
								{i + 1}
							</div>

							{/* Imagen */}
							<img
								src={anime.imagen}
								alt={`Poster de ${anime.nombre}`}
								className="w-[180px] h-[240px] md:w-[30vh] md:h-[40vh] rounded-lg shadow-md border border-neutral-700 object-cover"
								loading="lazy"
							/>

							{/* Info */}
							<div className="flex flex-col justify-between flex-1 text-sm space-y-1 text-center md:text-left">
								<h3 className="text-xl md:text-2xl rocknroll font-bold">{anime.nombre}</h3>
								<p className="font-medium text-white/80">{anime.estado}</p>
								<p className="text-white/70">{anime.temporadas}</p>
								<p className="text-gray-300">{anime.opinion}</p>
							</div>
						</section>
					);
				})}
			</div>
		</div>
	);
};

export default TablaScrollAnime;
