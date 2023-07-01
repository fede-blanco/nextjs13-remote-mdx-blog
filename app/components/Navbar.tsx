import Link from "next/link"

// fa es porque son los iconos de Font Awesome
import { FaYoutube, FaTwitter, FaGithub, FaLaptop, FaInstagram} from "react-icons/fa"

export default function Navbar() {
  return (
    <nav className="bg-slate-600 p-4 sticky top-0 drop-shadow-xl z-10" >
        {/* prose y prose-xl --> Indican que sera prose y de que tamanio */}
        <div className="md:px-6 prose prose-xl mx-auto flex justify-between flex-col sm:flex-row">
        <h1 className="text-3xl font-bold text-white grid place-content-center mb-2 md:mb-0">
            {/* el /90 indica que tendra una opacidad del 90% */}
            {/* hover: --> Indica estilos para el estado hover */}
            <Link href="/" className="text-white/90 no-underline hover:text-white" >Federico Blanco</Link>
        </h1>
        <div className="flex flex-row justify-center sm:justify-evenly align-middle gap-4 text-white text-4xl lg:text-5xl">
                    {/* <Link className="text-white/90 hover:text-white" href="https://www.youtube.com/@DaveGrayTeachesCode">
                        <FaYoutube />
                    </Link>
                    <Link className="text-white/90 hover:text-white" href="https://courses.davegray.codes/">
                        <FaLaptop />
                    </Link> */}
                    <Link className="text-white/90 hover:text-white" href="https://instagram.com/blancofedem">
                        <FaInstagram />
                    </Link>
                    <Link className="text-white/90 hover:text-white" href="https://github.com/fede-blanco">
                        <FaGithub />
                    </Link>
                    {/* <Link className="text-white/90 hover:text-white" href="https://twitter.com/yesdavidgray">
                        <FaTwitter />
                    </Link> */}
                </div>
        </div>
    </nav>
  )
}
