import "./MyMain.css"
import { useContext, useEffect, useState } from "react"
import { RicercaContext } from "../Context"
// avevo provato a usare reactflag ma non mi ha funzionato. 

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

            {film.map((movie) => {
                const codicePaese = (movie.original_language || '').substring(0, 2).toUpperCase();
                const lingua_bandiera_link = {
                    IT: "https://flagcdn.com/16x12/it.png",
                    EN: "https://flagcdn.com/16x12/gb.png",
                    NL: "https://flagcdn.com/16x12/nl.png",
                    FR: "https://flagcdn.com/16x12/fr.png",
                    ES: "https://flagcdn.com/16x12/es.png",
                    DE: "https://flagcdn.com/16x12/de.png",
                    JA: "https://flagcdn.com/16x12/jp.png",
                    ZH: "https://flagcdn.com/16x12/cn.png",
                    KO: "https://flagcdn.com/16x12/kr.png",
                    VI: "https://flagcdn.com/16x12/vn.png"
                };

                return (
                    <ul key={movie.id} className="movie_box">
                        <li>{movie.title || movie.name}</li>
                        <li>{movie.original_title || movie.original_name}</li>
                        <li><img src={lingua_bandiera_link[codicePaese]} alt={movie.original_language} width={20} height={10} /></li>
                        <li>{movie.vote_average}</li>
                    </ul>
                )
            })}
        </main>
    )
}

export default MyMain