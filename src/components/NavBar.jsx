import { NavLink } from "react-router-dom"
export default function NavBar(props) {
    const { links } = props
    console.log(links)
    return (
        <nav>
            <ul>
                {links.map(link => (
                    <li key={link.id} className="page-link">
                        <NavLink to={link.url}>{link.text}</NavLink>
                    </li>

                ))}

            </ul>
        </nav>

    )
}