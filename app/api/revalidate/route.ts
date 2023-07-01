import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function GET(request: NextRequest) {
    // tomara el valor del parametro de la url que se llame "secret"
    const secret = request.nextUrl.searchParams.get('secret')

    // que pasara si el secret es diferente a nuestro token secreto
    if (secret !== process.env.MY_SECRET_TOKEN) {
        return new NextResponse(JSON.stringify({ message: 'Invalid Token' }), {
            status: 401,
            statusText: 'Unauthorized',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    // si el secret coincide obtendremos el "path"  o indicaremos  la ruta "/"
    const path = request.nextUrl.searchParams.get('path') || '/'

    // revalidamos ese "path" con la funcion qe brinda next
    revalidatePath(path)

    // retornamos on objeto con la propiedad revalidated en "true"
    return NextResponse.json({ revalidated: true })
}