import React from "react";
import { Clapperboard } from "lucide-react";

const GaleriaPeliculas = ({ peliculas }) => {
  const [selected, setSelected] = React.useState(null);

  return (
    <section className="px-6 py-10">
      <h2 className="text-3xl sm:text-4xl font-semibold text-white text-center mb-6 flex items-center justify-center gap-3">
        <Clapperboard className="w-8 h-8 text-purple-500" />
        <span className="tracking-tight rocknroll">Recomendaciones</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-4">
        {peliculas.map((pelicula, idx) => (
          <figure
            key={pelicula.id || pelicula.titulo}
            className={`relative group overflow-hidden rounded-xl shadow-md border border-neutral-800 transition-transform duration-500 ease-in-out select:scale-130 select:z-10 select:shadow-2xl hover:scale-130 hover:z-10 hover:shadow-2xl ${
              selected === idx ? "scale-130 z-10 shadow-2xl" : ""
            }`}
            onTouchStart={() => setSelected(idx)}
            onTouchEnd={() => setTimeout(() => setSelected(null), 400)}
          >
            <img
              src={pelicula.imagen}
              alt={pelicula.titulo}
              className="w-full aspect-[2/3] object-cover opacity-90"
            />
            <figcaption
              className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 flex flex-col justify-end text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                selected === idx ? "opacity-100" : ""
              }`}
            >
              <h3 className="text-lg rocknroll font-semibold">{pelicula.titulo}</h3>
              <p className="text-xs reggae mt-1 text-gray-300">{pelicula.descripcion}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default GaleriaPeliculas;
