import React, { createContext, useReducer, useContext, useRef, useEffect, useMemo } from "react";

const initialState = {
	lista: [],
	indice: -1,
	reproduciendo: false,
};

function reducer(state, action) {
	switch (action.type) {
		case "REPRODUCIR_DESDE_LISTA":
			return {
				...state,
				lista: action.payload.lista,
				indice: action.payload.indice,
				reproduciendo: true,
			};
		case "TOGGLE_PLAY":
			return { ...state, reproduciendo: !state.reproduciendo };
		case "SET_INDICE":
			return { ...state, indice: action.payload, reproduciendo: true };
		case "STOP":
			return { ...state, reproduciendo: false };
		default:
			return state;
	}
}

const ReproductorContext = createContext();

export const useReproductor = () => useContext(ReproductorContext);

export const ReproductorProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const audioRef = useRef(new Audio());

	// Actualizar audio según el estado
	useEffect(() => {
		if (state.indice === -1 || !state.lista[state.indice]) return;

		const cancion = state.lista[state.indice];
		const audio = audioRef.current;

		if (!cancion.src) return;

		if (audio.src !== cancion.src) {
			console.log("Cargando fuente de audio:", cancion.src);
			audio.src = cancion.src;
		}

		if (state.reproduciendo) {
			const playPromise = audio.play();
			if (playPromise !== undefined) {
				playPromise.catch((e) => {
					if (e.name !== "AbortError") console.error("Error al reproducir:", e);
				});
			}
		} else {
			audio.pause();
		}
	}, [state.indice, state.lista, state.reproduciendo]);

	// Al terminar canción, ir a siguiente
	useEffect(() => {
		const audio = audioRef.current;

		const onEnded = () => {
			if (state.indice < state.lista.length - 1) {
				dispatch({ type: "SET_INDICE", payload: state.indice + 1 });
			} else {
				dispatch({ type: "STOP" });
			}
		};

		audio.addEventListener("ended", onEnded);
		return () => audio.removeEventListener("ended", onEnded);
	}, [state.indice, state.lista.length]);

	const reproducirDesdeLista = (cancion, lista) => {
		// Inyectar artista e imagen a cada canción si vienen desde el objeto cancion
		const artista = cancion.artista || null;
		const imagen = cancion.imagen || null;

		const listaValida = lista
			.filter((c) => c.src)
			.map((c) => ({
				...c,
				artista: c.artista || artista,
				imagen: c.imagen || imagen,
			}));

		const index = listaValida.findIndex((c) => c.src === cancion.src);

		if (index === -1) return;

		dispatch({
			type: "REPRODUCIR_DESDE_LISTA",
			payload: { lista: listaValida, indice: index },
		});
	};

	const togglePlay = () => dispatch({ type: "TOGGLE_PLAY" });

	const irASiguiente = () => {
		let nuevoIndice = state.indice + 1;
		while (nuevoIndice < state.lista.length && !state.lista[nuevoIndice]?.src) {
			nuevoIndice++;
		}
		if (nuevoIndice < state.lista.length) {
			dispatch({ type: "SET_INDICE", payload: nuevoIndice });
		} else {
			dispatch({ type: "STOP" });
		}
	};

	const irAnterior = () => {
		let nuevoIndice = state.indice - 1;
		while (nuevoIndice >= 0 && !state.lista[nuevoIndice]?.src) {
			nuevoIndice--;
		}
		if (nuevoIndice >= 0) {
			dispatch({ type: "SET_INDICE", payload: nuevoIndice });
		}
	};

	const value = useMemo(
		() => ({
			cancion: state.lista[state.indice] || null,
			estaReproduciendo: state.reproduciendo,
			togglePlay,
			reproducirDesdeLista,
			irASiguiente,
			irAnterior,
			audioRef,
		}),
		[state]
	);

	return <ReproductorContext.Provider value={value}>{children}</ReproductorContext.Provider>;
};
