import { getPostsMeta } from "@/lib/posts"
import ListItem from "@/app/components/ListItem"
import Link from "next/link"


// el revalidate lo seteamos a cero para desarrollo y luego a 86400 (1dia) para produccion
export const revalidate = 86400

type Props = {
    params: {
        tag: string
    }
}

// Para que no haya errores esta funcion deberia permanecer comentada mientras "revalidate" este seteado en cero "0"
export async function generateStaticParams() {
    //obtenemos toda la metadata de los posts
    const posts = await getPostsMeta() //deduped!

    if (!posts) return []

    // vamos a mapear para obtener un array que tenga por cada post el contenido de su propiedad "tags" que a su vez en un array con los tags de cada uno --> Por eso hay que utilizar el metodo ".flat()"
    // new Set -->  Un Set es una estructura de datos en JavaScript que permite almacenar elementos únicos. Al pasar el arreglo aplanado a new Set(), se eliminan los elementos duplicados, ya que un Set solo puede contener valores únicos.
    const tags = new Set(posts.map(post => post.tags).flat())

    //Array.from(tags) convierte el objeto Set llamado tags en un nuevo arreglo. El método Array.from() toma un objeto iterable y devuelve un nuevo arreglo con los elementos del iterable para poder manipularlo posteriormente.
    //La función de flecha (tag) => ({ tag }) crea un nuevo objeto para cada elemento del arreglo. En este caso, se crea un objeto con una propiedad tag, donde el valor de la propiedad es el propio elemento del arreglo. Esencialmente, se está transformando cada elemento del arreglo en un objeto con una propiedad tag que contiene el valor original.
    return Array.from(tags).map((tag) => ({ tag }))
}

// generamos la metadata de los tags que se reciban
export function generateMetadata({ params: { tag } }: Props) {

    return {
        title: `Posts about ${tag}`
    }
}

// Recibimos los parametros con el tag
export default async function TagPostList({ params: { tag } }: Props) {

    // Obtenemos la metadata de los posts
    const posts = await getPostsMeta() //deduped!

    if (!posts) return <p className="mt-10 text-center">Sorry, no posts available.</p>

    // Obtenemos un array con los posts que contengan esa "tag" entre sus "tags"
    const tagPosts = posts.filter(post => post.tags.includes(tag))

    // si no hay Posts con esos tags
    if (!tagPosts.length) {
        return (
            <div className="text-center">
                <p className="mt-10">Sorry, no posts for that keyword.</p>
                <Link href="/">Back to Home</Link>
            </div>
        )
    }
    return (
        <>
            <h2 className="text-3xl mt-4 mb-0">Results for: #{tag}</h2>
            <section className="mt-6 mx-auto max-w-2xl">
                <ul className="w-full list-none p-0">
                    {tagPosts.map(post => (
                        <ListItem key={post.id} post={post} />
                    ))}
                </ul>
            </section>
        </>
    )

}