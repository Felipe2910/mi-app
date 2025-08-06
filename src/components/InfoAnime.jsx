import { useState } from "react";

const InfoAnime = () => {
	const [mostrarTraduccion, setMostrarTraduccion] = useState(false);

	return (
		<div>
			<p className="mt-2 text-sm text-gray-300 whitespace-pre-line">
				El año pasado, el anime de{" "}
				<strong className="font-semibold text-white">Chainsaw Man</strong> irrumpió en las pantallas
				de todo el mundo. Ahora, junto con una nueva amiga, llegará a la gran pantalla. En el Jump
				Festa 2024, se reveló una película que adaptará el{" "}
				<strong className="font-semibold text-white">arco de Reze</strong>. Aún no hay fecha de
				estreno.
			</p>

			{/* Texto japonés estilizado */}
			<div className="mt-4 px-4 py-2 border-l-4 border-[#4d23b0] bg-[#4d23b01a] text-white text-sm font-mono whitespace-pre-line">
				◣◣◣◣◣◣＿＿＿＿＿＿＿＿＿
				<br />
				劇場版『チェンソーマン レゼ篇』
				<br />
				最新ポスタービジュアル解禁！
				<br />
				￣￣￣￣￣￣￣￣￣ ◤◤◤◤◤◤
				<br />
				<br />
				炸裂する少年と少女の夏——
				<br />
				<br />
				9.19公開🎬
			</div>

			{/* Botón para mostrar traducción */}
			<div className="mt-2">
				<button
					onClick={() => setMostrarTraduccion((prev) => !prev)}
					className="text-sm text-[#4d23b0] hover:underline transition"
				>
					{mostrarTraduccion ? "Ocultar traducción" : "Ver traducción"}
				</button>

				{mostrarTraduccion && (
					<div className="mt-2 text-gray-300 text-sm bg-neutral-800/40 p-3 rounded-md border border-neutral-700">
						<strong>Traducción:</strong>
						<br />
						◣◣◣◣◣◣＿＿＿＿＿＿＿＿＿
						<br />
						Película: "Chainsaw Man: Arco de Reze"
						<br />
						¡Visual del nuevo póster revelado!
						<br />
						￣￣￣￣￣￣￣￣￣ ◤◤◤◤◤◤
						<br />
						<br />
						Un verano explosivo entre un chico y una chica—
						<br />
						<br />
						Estreno el 19 de septiembre 🎬
					</div>
				)}
			</div>
		</div>
	);
};

export default InfoAnime;
