type Props = {
    id: string
}

export default function Video({ id }: Props) {
    return (
        // Las clases "aspect" que estamos viendo sonesas clases de tailwind que acabamos de intalar con "aspect-ratio". sirven para darle un tamanio al video responsivo
        <div className="aspect-w-16 aspect-h-9">
            {/* El iframe sirve para embeber videos de internet como youtube */}
            {/* Los atributos de la etiqueta son especificos necesarios para el video de youtube */}
            <iframe
                src={`https://www.youtube.com/embed/${id}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            />
        </div>
    );
}