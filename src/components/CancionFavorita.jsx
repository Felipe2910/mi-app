const CancionFavorita = ({ titulo, artista, colaboracion, colors, colors2, imagen, video }) => {
	return (
		<section className={`${colors} shadow p-6 rounded-lg mb-10`}>
			<h3 className="text-xl font-semibold mb-4">Canción Favorita</h3>
			<div className="flex flex-col md:flex-row items-center gap-6">
				<img
					src={imagen}
					alt={`${titulo} Cover`}
					className="w-[200px] h-[200px] lg:w-[300px] lg:h-[300px] rounded-md bg-[#25074d5b]"
				/>
				<video
					controls
					autoPlay
					muted
					className="md:w-[374px] md:h-[210px] lg:w-[560px] lg:h-[315px] rounded-md"
				>
					<source src={video} type="video/mp4" />
					Tu navegador no soporta el video.
				</video>
			</div>
			<p className="mt-4 text-lg lg:text-2xl">
				<span className={`font-semibold ${colors2} rocknroll`}>
					{titulo}
				</span>{" "}
				- <span className="font-semibold reggae">{artista}</span>{" "}
				{colaboracion && <span className="text-gray-100"> ft. {colaboracion}</span>}
			</p>
		</section>
	);
};

export default CancionFavorita;
