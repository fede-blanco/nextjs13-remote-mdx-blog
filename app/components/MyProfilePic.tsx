// Importamos image que es un componente nativo de next que maneja mejor las imagenes que <img>
import Image from "next/image"

export default function MyProfilePic() {
  return (
    <section className="w-full mx-auto">
            <Image
                className="border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8"
                src="/images/XRDN6760.JPG"
                width={200}
                height={200}
                alt="Federico Blanco"
                priority={true} // Esto le indica a Next que es una prioridad al cargar --> En este caso porque aparece arribe de todo, primero
            />
    </section>
  )
}
