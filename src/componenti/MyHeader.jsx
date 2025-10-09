import "./MyHeader.css";
import { useState } from 'react';

const MyHeader = () => {

    // prendere il valore della barra di ricerca.

    const { valore, impostaValore } = useContext(RicercaContext)
    
    const aggiornaValore = (e) => {
        impostaValore(e.target.value);
    }
    
    const PrendiValore = () => {
        console.log("ricerca:", valore)
    }
    
    const PrendiValoreInvio = (e) => {
        if (e.key === "Enter") {
            PrendiValore();
        } 
    };


    return (
        <header className="header">
            <h4 className="logo">BOOLFLIX</h4>
            <section>
                <input
                    value={valore}
                    onChange={aggiornaValore}
                    onKeyDown={PrendiValoreInvio}
                    type="text"
                    placeholder="Cerca il tuo film/Serie Tv">
                </input>
                <i onClick={PrendiValore}
                    className="fa-solid fa-magnifying-glass"></i>
            </section>
        </header>
    )
}

export default MyHeader