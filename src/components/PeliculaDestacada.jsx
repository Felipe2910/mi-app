const PeliculaDestacada = ({ imagen, alt, trailer, titulo, descripcion }) => {
	return (
		<div className="bg-gradient-to-br from-[#4d23b09f]/30 via-[#4d23b09f]/60 to-[#4d23b09f]/10 border border-[#4d23b09f] shadow rounded-lg p-6">
			<div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
				<img
					src={imagen}
					alt={alt}
					className="w-[290px] h-[410px] rounded-md shadow-md border border-neutral-700"
				/>
				<div className="w-full max-w-4xl flex-grow">
					<div className="aspect-video rounded-lg overflow-hidden shadow-lg border border-neutral-800">
						<iframe
							src={trailer}
							title={titulo}
							frameBorder="0"
							allowFullScreen
							className="w-full h-full"
						></iframe>
					</div>
				</div>
			</div>

			<div className="mt-6">
				<h3 className="text-2xl font-bold rocknroll text-white">{titulo}</h3>
				<p className="mt-2 text-sm reggae text-gray-300 md:text-justify md:w-2/3">{descripcion}</p>
			</div>
		</div>
	);
};

export default PeliculaDestacada;
