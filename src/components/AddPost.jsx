// Importazione della libreria axios per effettuare chiamate API
import axios from "axios";

// Importazione dei hook useState e useNavigate di React
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Definizione dell'endpoint dell'API
const endpoint = 'http://localhost:3000/posts';

// Stato iniziale del form con le proprietà dell'articolo
const initialFormData = {
    title: "",        // Titolo dell'articolo
    content: "",      // Contenuto dell'articolo
    image: "",        // URL dell'immagine
    tags: [],         // Array di tag associati
    pubblicato: false // Stato di pubblicazione (true/false)
};

export default function AddPost() {

    // Hook per la navigazione tra pagine
    const navigate = useNavigate();

    // Stato per la gestione dei dati del form
    const [formData, setFormData] = useState(initialFormData);

    /**
     * Gestione del cambiamento nei campi del form
     * @param {Event} event - L'evento generato dall'input
     */
    function handleFormData(event) {
        // Determina il valore in base al tipo di input
        const value = event.target.type === "checkbox"
            ? event.target.checked
            : event.target.name === 'tags'
                ? event.target.value.split(",") // Converte la stringa in array
                : event.target.value;

        // Aggiorna lo stato del form con il nuovo valore
        setFormData((currentFormData) => ({
            ...currentFormData,
            [event.target.name]: value
        }));
    }

    /**
     * Gestisce l'invio del form
     * @param {Event} e - L'evento di submit
     */
    const handleSubmitForm = (e) => {
        e.preventDefault(); // Evita il ricaricamento della pagina

        // Effettua una richiesta POST per aggiungere il nuovo articolo
        axios.post(endpoint, formData)
            .then(res => {
                // Reindirizza alla pagina dei post dopo l'invio
                navigate("/posts");
            })
            .catch(error => {
                console.error("Errore durante l'invio dei dati:", error);
            });

        // Resetta i dati del form dopo l'invio
        setFormData(initialFormData);
    }

    return (
        <form className="form-articoli" onSubmit={handleSubmitForm}>
            {/* Input per il titolo dell'articolo */}
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleFormData}
                placeholder="Inserisci il titolo"
            />

            {/* Input per i tag dell'articolo */}
            <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleFormData}
                placeholder="Inserisci i tags (separati da virgola)"
            />

            {/* Input per il contenuto dell'articolo */}
            <textarea
                name="content"
                value={formData.content}
                onChange={handleFormData}
                placeholder="Inserisci il contenuto"
            />

            {/* Input per l'URL dell'immagine */}
            <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleFormData}
                placeholder="Inserisci l'URL dell'immagine"
            />

            {/* Checkbox per lo stato di pubblicazione */}
            <div className="d-flex justify-content-center">
                <input
                    name="pubblicato"
                    checked={formData.pubblicato}
                    onChange={handleFormData}
                    className="mx-2 my-0"
                    type="checkbox"
                />
                <label htmlFor="pubblicato">Pubblicato</label>
            </div>

            {/* Pulsante di invio del form */}
            <div className="box-btn">
                <button type="submit" className="btn btn-secondary btn-lg">
                    Aggiungi Articolo
                </button>
            </div>
        </form>
    );
}