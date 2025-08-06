import { BookUser } from "lucide-react";

const Perfil = () => {
	return (
		<section id="perfil" className="px-6 py-10">
			<h2 className="text-3xl sm:text-4xl font-semibold text-white text-center mb-6 flex items-center justify-center gap-3">
				<BookUser className="w-8 h-8 text-emerald-500" />
				<span className="tracking-tight rocknroll">Sobre Mí</span>
			</h2>

			<div className="flex flex-col lg:flex-row items-center justify-center gap-6 bg-gradient-to-br from-emerald-500/30 via-emerald-500/60 to-emerald-500/10 border border-emerald-500 shadow rounded-lg p-6">
				<div className="text-center">
					<img
						src="/media/img/F01.jpg"
						className="w-[250px] rounded-lg mx-auto mb-4"
						alt="Felipe"
					/>
					<h3 className="text-2xl font-bold rocknroll">Felipe de Jesús Pool Cruz</h3>
				</div>
				<div className="text-sm leading-relaxed reggae">
					<p>¡Hola! Bienvenido a este humilde HTML.</p>
					<p>Este sitio está en fase Alpha. Aquí comparto un poco de todo lo que me gusta.</p>
					<ul className="mt-2 list-disc ml-4">
						<li>
							<b className="rocknroll">Edad:</b> 22 años
						</li>
						<li>
							<b className="rocknroll">País:</b> México
						</li>
						<li>
							<b className="rocknroll">Pasatiempos:</b> Videojuegos, Música, Películas, Cosplay
						</li>
						<li>
							<b className="rocknroll">Color Favorito:</b> Verde y Negro
						</li>
					</ul>
				</div>
			</div>
		</section>
	);
};

export default Perfil;
