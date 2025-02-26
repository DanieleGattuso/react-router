// importiamo axios
import axios from "axios";
// importiamo gli hook di react
import { useState, useEffect } from "react";
// importiamo gli hook di react router dom
import { useParams, Link } from "react-router-dom"

// salviamo l'end point
const endpoint = 'http://localhost:3000/posts';

export default function () {

    // destrutturiamo use state per salvarci il singolo post e la sua funzione
    const [singlePost, setSinglePost] = useState({})

    // destrutturazione Use params per ricavarmi l'id pagina collegato all'id dell'articolo
    const { id } = useParams();



    // richiamiamo il singolo post tramite operatore crud e richiesta axios e salviamolo a schermo
    function fetchArticols() {
        axios
            .get(`${endpoint}/${id}`)
            .then((res) => setSinglePost(res.data)) // Salviamo il dato nel nostro stato
            .catch((error) => console.log(error)); // Gestiamo gli errori

    }

    useEffect(
        () => fetchArticols(),
        [id])

    // console.table(singlePost)

    return (

        <div className="container my-5" >
            <div className="row d-flex  align-items-center">
                <div className="col-1 arrow-page">
                    <Link to={`/posts/post/${parseInt(id) - 1}`}>
                        <i className="fa-solid fa-angle-left "></i>
                    </Link>
                </div>
                <div className="col card">
                    <img
                        src={singlePost.image}
                        alt={singlePost.title}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{singlePost.title}</h5>
                        <p className="card-text">{singlePost.content}</p>
                        <div className="d-flex justify-content-between">
                            <span className="badge bg-primary">{singlePost.tags}</span>
                            <span className={`badge ${singlePost.pubblicato ? 'bg-success' : 'bg-danger'} `}>
                                {singlePost.pubblicato ? 'Pubblicato' : 'Non pubblicato'}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="col-1 arrow-page">
                    <Link to={`/posts/post/${parseInt(id) + 1}`}>
                        <i className="fa-solid fa-angle-right "></i>
                    </Link>
                </div>




            </div>


        </div >

    )

}