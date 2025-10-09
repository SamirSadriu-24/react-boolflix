import "./MyMain.css"
import { useContext, useEffect, useState } from "react"
import { RicercaContext } from "../Context"

const MyMain = () => {

    // prendere i dati dalla api. (ci ho messo anche troppo a capire l'errore, avevo messo uno slash in più dopo movie per sbaglio.)

    // mettere anche le serie tv.
    const { valore } = useContext(RicercaContext);

    const API_KEY = import.meta.env.VITE_API
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${valore}&language=it-IT`;
    const URL2 = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${valore}&language=it-IT`;
    const [film, impostaFilm] = useState([]);

    useEffect(() => {

        fetch(URL)
            .then((risposta) => risposta.json())
            .then((movieData => {
                fetch(URL2)
                    .then((risp => risp.json()))
                    .then((dataTV => {
                        impostaFilm([...movieData.results, ...dataTV.results]);
                    }));
            }));
    }, [valore]);

    return (
        <main>
            <h1>Risultati della Ricerca: </h1>

            {film.map((movie) => (
                <ul key={movie.id} className="movie_box">
                    <li>{movie.title || movie.name}</li>
                    <li>{movie.original_title || movie.original_name}</li>
                    <li>{movie.original_language}</li>
                    <li>{movie.vote_average}</li>
                </ul>
            ))}
        </main>
    )
}

export default MyMain