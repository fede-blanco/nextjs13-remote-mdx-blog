type Meta = {
    id: string,
    title: string,
    date: string,
    tags: string[],
}

type BlogPost = {
    meta: Meta,
    // Por el momento es Any pero luego cambiara
    // content: any,
    //Ponemos este porque es el que viene del "compileMDX"
    content: ReactElement<any, string | JSXElementConstructor<any>>,
}