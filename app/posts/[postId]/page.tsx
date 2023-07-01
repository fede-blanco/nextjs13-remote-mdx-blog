import getFormattedDate from "@/lib/getFormattedDate"
import { getPostsMeta, getPostByName} from "@/lib/posts"
import Link from "next/link"
import {notFound} from "next/navigation"

import 'highlight.js/styles/github-dark.css'


export const revalidate = 86400


type Props = {
    params: {
        postId: string
    }
}


// funcion que sirve para generar parametros estaticos en las SSR para convertirlas en SSG
export async function generateStaticParams() {
    const posts = await getPostsMeta() //already deduped automatically!!

    // como getPostsMeta() puede devolver undefined debemos manejar esa opcion (porque sino tendriamos un error al mapear undefined)
    // Para saber que devolver debemos fijarnos en el tipo de dato que deberia devolver generateStaticParams()
    if (!posts) return []
    // mapeamos posts y retornamos un objeto con una propiedad "postId" que tenga como valor el id del post de esa posicion
    return posts.map((post) => ({
        postId: post.id
    }))
}

// indicamos que params sera un objeto con la propiedad "postId" q sera un string
//Generamos la metada dinamica para estas rutas
export  async function generateMetadata({ params: { postId }}: Props) {

    // Utilizamos el id recibido por parametro y le agregamos la extension
    const post = await getPostByName(`${postId}.mdx`) //already deduped!!

    if (!post) {
        // si no hay posteo devolvemos un titulo diferente
        return {
            title: "Post Not Found"
        }
    }

    //Si hay posteo se devuelve el titulo con info dinamica de este posteo
    return {
        title: post.meta.title
    }
}

// indicamos que params sera un objeto con la propiedad "postId" q sera un string
export default async function Post({ params: { postId }}: Props) {

    // Utilizamos el id recibido por parametro y le agregamos la extension
    const post = await getPostByName(`${postId}.mdx`) //already deduped!!

    // si no encuentra ningun posteo con el id pasado por parametro devuelve la funcion notFound que renderiza la pagina 404 que tiene next por defecto
    if (!post) notFound() //--> nos manda a una pagina 404 por defecto y como usa un tipo de typescript "never" no hace faltapasarle la palabra "return" para ponerlo

    // destructuramos meta y content del post
    const { meta , content } = post

    // pubDate sera un texto formateado
    const pubDate = getFormattedDate(meta.date)

    //mapeamos el array de tags que viene dentro de "meta" y creamos un link para cada uno
    // esta sera para crear una ruta dinamica con esos tags  donde se pueda ver una lista de articulos relacionados a los que se puede navegar.
    // Lo que retorna va con parentesis () perque no sera un objeto ({})
    const tags = meta.tags.map((tag, i) => (
        <Link key={i} href={`/tags/${tag}`}>{tag}</Link>
    ))

  return (
    <>
    <h2 className="text-3xl mt-4 mb-0">{meta.title}</h2>
    <p className="mt-0 text-sm">
        {pubDate}
    </p>
    <article>
        {content}
    </article>
    <section>
        <h3>Related:</h3>
        <div className="flex flex-row gap-4">
            {tags}
        </div>
    </section>
    <p className="mb-10">
        <Link href="/">← Back to home</Link>
    </p>
</>
  )
}
