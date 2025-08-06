import { useEffect, useRef, useState } from "react";
import ColorThief from "color-thief-browser";

const AnimeDestacado = ({ imagen, alt, trailer, titulo, gif, descripcion }) => {
	const [gifShadow, setGifShadow] = useState("#fff");
	const gifRef = useRef(null);

	useEffect(() => {
		if (gif && gifRef.current) {
			const img = gifRef.current;
			const colorThief = new ColorThief();

			const handleLoad = () => {
				try {
					const color = colorThief.getColor(img);
					setGifShadow(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
				} catch (e) {
					setGifShadow("#fff");
				}
			};

			if (img.complete) {
				handleLoad();
			} else {
				img.addEventListener("load", handleLoad);
				return () => img.removeEventListener("load", handleLoad);
			}
		}
	}, [gif]);

	return (
		<div className="bg-gradient-to-br from-[#4d23b09f]/30 via-[#4d23b09f]/60 to-[#4d23b09f]/10 border border-[#4d23b09f] shadow rounded-lg p-6 backdrop-blur-md flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
			{/* Imagen principal */}
			<img
				src={imagen}
				alt={alt}
				className="w-full max-w-[280px] md:max-w-[300px] lg:max-w-[420px] rounded-md shadow-md border border-[#4d23b09f] object-cover"
			/>

			{/* Texto + Trailer */}
			<div className="flex flex-col flex-1 gap-4">
				<h3 className="text-xl font-semibold text-white">¡Próximamente!</h3>

				{/* Contenedor con efecto de iluminación */}
				<div className="relative w-full aspect-video rounded-md overflow-hidden shadow-lg border border-neutral-700 bg-black/30">
					{/* Glow cinematográfico */}
					<div
						className="absolute inset-0 z-0 pointer-events-none"
						style={{
							background: `radial-gradient(ellipse at center, ${gifShadow}99 0%, transparent 60%)`,
							filter: "blur(60px)",
							opacity: 0.7,
						}}
					></div>

					<iframe
						src={trailer}
						title={titulo}
						frameBorder="0"
						allowFullScreen
						className="absolute top-0 left-0 w-full h-full z-10"
					></iframe>
				</div>

				<div>
					<h3 className="text-2xl rocknroll font-bold text-white mt-4">{titulo}</h3>
					<p className="mt-2 text-sm reggae text-gray-300 whitespace-pre-line">
						{descripcion}
					</p>
				</div>
			</div>

			{/* GIF a la derecha en pantallas medianas */}
			{gif && (
				<div className="hidden md:block md:self-end md:ml-4">
					<img
						ref={gifRef}
						src={gif}
						alt="GIF promocional"
						className="rounded-md w-full max-w-[220px] lg:max-w-[300px] h-auto"
						style={{
							boxShadow: `0 0 40px 8px ${gifShadow}, 0 0 120px 32px ${gifShadow}55`,
							transition: "box-shadow 0.3s",
						}}
						crossOrigin="anonymous"
					/>
				</div>
			)}
		</div>
	);
};

export default AnimeDestacado;
