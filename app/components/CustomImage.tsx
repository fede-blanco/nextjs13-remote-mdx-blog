import Image from "next/image"

// Establecemos las props requeridas y las no requeridass
type Props = {
    src: string,
    alt: string,
    priority?: string,
}

export default function CustomImage({ src, alt, priority }: Props) {

    // Chequeamos si recibimos priority o no
    const prty = priority ? true : false

    return (

        // agregamos unas clases de tailwind que envuelvan nuestro componente Image
        // En gran parte para eso sirve hacer custom components
        <div className="w-full h-full">
            <Image
                className="rounded-lg mx-auto"
                src={src}
                alt={alt}
                // con width y height en ralidad lo que seteamos son el max-width y max-height y teniendo en cuenta que aunque sean iguales, nextjs lo va a tener en consideracion pero va a mantener al espect-ratio de las imagenes
                width={650}
                height={650}
                priority={prty}
            />
        </div>
    )
}