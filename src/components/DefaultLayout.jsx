import { Outlet } from "react-router-dom"; // Importazione di Outlet per gestire le route annidate
import Header from "./Header"; // Importazione del componente Header
import Footer from "./Footer"; // Importazione del componente Footer

// Componente layout di default che include l'Header, il contenuto della pagina corrente e il Footer
export default function DefaultLayout() {
    return (
        <>
            <Header /> {/* Componente Header, visibile su tutte le pagine */}
            <Outlet /> {/* Punto di inserimento del contenuto dinamico delle route */}
            <Footer /> {/* Componente Footer, visibile su tutte le pagine */}
        </>
    );
}