import "./MyMain.css"
import { useContext, useEffect, useState } from "react"
import { RicercaContext } from "../Context"
import placeholder from "../../assets/placeholder.jpg";


// avevo provato a usare reactflag ma non mi ha funzionato. 

const MyMain = () => {

    // prendere i dati dalla api. (ci ho messo anche troppo a capire l'errore, avevo messo uno slash in più dopo movie per sbaglio.)

    // mettere anche le serie tv.
    const { valore } = useContext(RicercaContext);

    const API_KEY = import.meta.env.VITE_API
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${valore}&language=en-EN`;
    const URL2 = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${valore}&language=en-EN`;
    const [film, impostaFilm] = useState([]);

    const generaStelle = (vote_average) => {
        const Rating = (vote_average / 2).toFixed(1);
        const Stelle = [];
        const stellaPiena = <i className="fa-solid fa-star"></i>;
        const stellaVuota = <i className="fa-regular fa-star"></i>

        for (let i = 0; i < 5; i++) {
            if (i < parseFloat(Rating)) {
                Stelle.push(stellaPiena)
            } else {
                Stelle.push(stellaVuota)
            }
        }
        return Stelle;
    }

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
            <div className="contenitore">
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
                        VI: "https://flagcdn.com/16x12/vn.png",
                        CS: "https://flagcdn.com/16x12/cz.png",
                        PT: "https://flagcdn.com/16x12/pt.png",
                        NO: "https://flagcdn.com/16x12/dk.png",
                        FA: "https://flagcdn.com/16x12/ir.png",
                        RU: "https://flagcdn.com/16x12/ru.png"
                    };
                    const immagine = movie.poster_path || movie.backdrop_path
                        ? `https://image.tmdb.org/t/p/w342/${movie.poster_path || movie.backdrop_path}`
                        : placeholder;


                    return (

                        <div key={movie.id} className="movie_box">
                            <div className="wrapper">
                                <img
                                    className="POSTER"
                                    src={immagine}
                                    alt={`immagine, ${movie.title || movie.name}`} />
                                <div className="overlay"></div>
                                <div className="info_box">
                                    <ul>
                                        <li><span>TITOLO:</span>{movie.title || movie.name}</li>
                                        <li><span>TITOLO ORIGINALE:</span>{movie.original_title || movie.original_name}</li>
                                        <li><span>VOTO:</span>{generaStelle(movie.vote_average)}</li>
                                        <li><span>OVERVIEW:</span>{movie.overview}</li>
                                        {/* <li><img src={lingua_bandiera_link[codicePaese] || "./src/assets/flag-4-16.png"} alt={movie.original_language} width={30} height={15} /></li> */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </main>
    )
}

export default MyMain