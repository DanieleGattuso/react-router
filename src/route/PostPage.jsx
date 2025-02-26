// importiamo la libreria axios per effettuare le chiamate Api
import axios from "axios";

// importiamo useState e lo useEffect
import { useState, useEffect } from "react";

// importiamo Link
import { Link, } from "react-router-dom";

// endpoint
const endpoint = 'http://localhost:3000/posts';

export default function PostsPage() {

    // creiamo una variabile di stato che conterrà il nostro array di oggetti
    const [articols, setArticols] = useState([])
    console.table(articols)

    // Funzione di richiesta Api
    function fetchArticols() {
        // richiesta di chiamata a localhost 3000
        axios.get(endpoint)
            // prendi i dati di risposta e inseriscili a res.data
            .then((res) => setArticols(res.data),

            ).catch((error) => {
                console.error("Errore durante il recupero dei dati:", error);
            });
    }


    // chiamata api effettuata all'avvio del server
    useEffect(() => { fetchArticols() }, []);



    // funzione di rimozione dei post
    function removeArticols(id) {

        // filter sull'array
        const updateArticols = articols.filter(articol => {
            return articol.id !== id
        })

        // chiamata ad api sulla rotta di delete con parametro dinamico id
        axios.delete(`${endpoint}/${id}`)
            .then(res =>
                // aggiorna gli articoli 
                console.log(res),
                // lo gestiamo anche nel front end
                setArticols(updateArticols)
            )

            .catch((error) => {
                console.error("Errore durante il recupero dei dati:", error);
            });
    }


    return (
        <section className="section-articoli">
            {/* contenitore esterno */}
            <div className="container">

                {/* PARTE OUTPUT ARTICOLI*/}
                {/* condizione di output */}
                {articols.length === 0 ?

                    // CONDIZIONE VERA
                    <h2 className="m-3">Non ci sono Articoli</h2>
                    // Altrimenti
                    :
                    // CONDIZIONE FALSA
                    <div className="box-articoli">

                        {/* singolo articolo*/}
                        {/* effettuiamo map su articols che è il nostro array dinamico */}
                        {articols.map(articolo => (
                            <div key={articolo.id} className="toast d-block">

                                {/* contenitore header */}
                                <div className="toast-header">
                                    {/* link in single post page */}
                                    <div className="post-zoom">
                                        <Link to={`/posts/post/${articolo.id}`}>
                                            <i className="fa-solid fa-magnifying-glass"></i>
                                        </Link>
                                    </div>
                                    {/* titolo */}
                                    <strong className="me-auto">{articolo.title}</strong>

                                    {/* condizione per badge pubblicato*/}
                                    {articolo.pubblicato ?
                                        // se è vero badge verde
                                        <span className="badge text-bg-success mx-2 p-2">
                                            Pubblicato
                                        </span>
                                        // altrimento
                                        :
                                        // se è falso badge rosso
                                        <span className="badge text-bg-danger mx-2 p-2">
                                            Non pubblicato
                                        </span>}

                                    {/* button delete */}
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="toast"
                                        aria-label="Close"
                                        // onclick con funzione inserita in una callback function per prevenire attivazione automatica
                                        onClick={() => removeArticols(articolo.id)}
                                    >

                                    </button>
                                </div>

                                {/* contenitore corpo */}
                                <div className="toast-body">

                                    {/* contenuto */}
                                    <p>{articolo.content}</p>
                                    {/* immagine */}
                                    <div className="box-articolo-image">
                                        <img src={articolo.image || null} alt={articolo.title} />
                                    </div>


                                    {/* categoria */}
                                    <ul className="category-list">
                                        {articolo.tags?.map((tag, index) => (
                                            <li key={index}>
                                                <a href="#">{tag}</a>
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                            </div>
                        ))}
                    </div>
                }


            </div>
        </section >
    )

}