import NavBar from "./NavBar";
import Logo from "./Logo";


import links from "../data/navLink";

export default function Header() {

    return (
        <header className="d-flex justify-content-between align-items-center bg-light p-3">
            <div className="container">
                <div className="row">
                    <div className="col d-flex">
                        <Logo />
                    </div>
                    <div className="col box-nav">
                        <NavBar links={links} />
                    </div>
                </div>
            </div>
        </header>
    );
}