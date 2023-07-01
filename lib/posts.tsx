// Importamos la funcion "compileMDX" de la libreria 
import { compileMDX } from 'next-mdx-remote/rsc'

import rehypeAutolinkHeadings from 'rehype-autolink-headings/lib'
import rehypeHighlight from 'rehype-highlight/lib'
import rehypeSlug from 'rehype-slug'

import Video from '@/app/components/Video'
import CustomImage from '@/app/components/CustomImage'




// Creamos el tipo de dato FileTree
type Filetree = {
    "tree": [
        { 
            "path": string,
        }
    ]
}

// una variable tiene un url que nos permite hacer peticiones sin autorizacion a la api de github (rate-limit=60) y otra que nos permite hacer peticiones con autorizacion (rate-limit=500)
const github_unauthorized = `https://api.github.com/repos/fede-blanco/next13-practice-blogposts/git/trees/main?recursive=1`


export async function getPostByName(filename: string): Promise<BlogPost | undefined> {
    // cariable con link que nos permite hacer peticiones con autorizacion (rate-limit=500)
    const github_authorized = `https://raw.githubusercontent.com/fede-blanco/next13-practice-blogposts/main/${filename}`

        // Al realizar la peticion a github debemos adjuntarle un objeto con opciones con la propiedad "headers", la cual contendra un objeto con las diferentes tipos de cabeceras donde le enviaremos el tipo de datos y el token
        const res = await fetch(github_authorized, {
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                'X-GitHub-Api-Version': '2022-11-28',
            }
        })

        if (!res.ok) return undefined

        // queremos obtener un archivo MDX en forma de texto
        const rawMDX = await res.text()

        //en caso de que la respuesta sea '404: Not Found" la cual sera en forma de texto por lo que pusimos se retorna undefined
        if (rawMDX === '404: Not Found') return undefined

        //Obtenemos "frontmatter" y "content" del "compileMDX"
        //ponemos el tipo del "frontmatter" --> <{ title: string, date: string, tags: string[]}>
        //Le pasamos como argumento un objeto con la propiedad "source" que contenga el MDX raw
        const { frontmatter, content } = await compileMDX<{ title: string, date: string, tags: string[]}>({
            source: rawMDX,
            components: {
                Video,
                CustomImage
            },
            options: {
                parseFrontmatter: true,
                mdxOptions: {
                    rehypePlugins: [
                        rehypeHighlight,
                        rehypeSlug,
                        [rehypeAutolinkHeadings, {
                            behavior: 'wrap'
                        }],
                    ],
                },
            }
        })

        //para crear un id se le remueve la extencion".mdx" al nombre del archivo
        const id = filename.replace(/\.mdx$/, ' ')

        //creamos el objecto blogPostObj , que sera del tipo "BlogPost" que creamos previamente.
        //Dentro tendra la propiedad "meta" (de tipo Meta) que contendra un objeto con las propiedades indicadas en el tipo "Meta" que creamos prviamente y la propiedad "content" con el contenido devuelto del compileMDX
        const blogPostObj: BlogPost = { meta: { id, title: frontmatter.title, date: frontmatter.date, tags: frontmatter.tags}, content}

        // se retorna el objeto creado
        return blogPostObj

}


export async function getPostsMeta(): Promise<Meta[] | undefined> {

    // Al realizar la peticion a github debemos adjuntarle un objeto con opciones con la propiedad "headers", la cual contendra un objeto con las diferentes tipos de cabeceras donde le enviaremos el tipo de datos y el token
    const res = await fetch(github_unauthorized, {
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28',
        }
    })

    if(!res.ok) return undefined

    // esta variable de tipo Filetree tendra todo el contenido de la respuesta en json
    const repoFiletree: Filetree = await res.json()

    // Hacemos que se mapee la propiedad "tree" del objeto devuelto, la cual contiene un array con todos los objectos dentro del repoFiletree, pero porcada uno que solo devuelva la propiedad "path" que contienen.
    // Luego de esa lista de paths filtrar y quedarse solo con las que terminen con ".mdx" que serian los posts (porque tmb hay imagenes, que aunque esten en una carpeta en el repo aca las saca de la carpeta y manda todo dentro de "tree" junto)
    const filesArray = repoFiletree.tree.map(obj => obj.path).filter(path => path.endsWith('.mdx'))


    const posts: Meta[] = []

    // se utiliza "for of" para poder utilizar "await" en su IntersectionObserver. Con "for each" no se puede utilizar await
    for (const file of filesArray){
        // Cada "file" sera un path que utilizaremos para obtener el post
        const post = await getPostByName(file)
        if (post) {
            // Si obtenemos el post lo utilizamos para obtener su propiedad "meta" de lo obtenido (destructurando)
            const { meta } = post
            //Pusheamos lo que haya en la propiedad "meta" al array de objetos de tipo "Meta" previamente creado
            posts.push(meta)
        }
    }

    // ordenamos los posts en base a su "date"
    return posts.sort((a,b) => a.date < b.date ? 1 : -1)

}