import Link from "next/link"
import getFormattedDate from "@/lib/getFormattedDate"

type Props = {
    post: Meta
}

export default function ListItem({ post }: Props) {
    //Destructuramos las 3 propiedades recibidas dentro de "post"
    const { id, title, date } = post
    // recibe una fecha la cual va a formatear
    // console.log(date);
    
    const formattedDate = getFormattedDate(date)

    return (
        <li className="mt-4 text-2xl dark:text-white/90">
            {/* El Link nos llevara a una url dinamica que utilizara el id como parametro, y el id era el nombre del archivo */}
            <Link className="underline hover:text-black/70 dark:hover:text-white" href={`/posts/${id}`}>{title}</Link>
            <br />
            <p className="text-sm mt-1">{formattedDate}</p>
        </li>
    )
}