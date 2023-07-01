export default function getFormattedDate(dateString: string): string {
    // Se utiliza "Intl.DateTimeFormat" para definir el formato de la fecha.
    //El primer parametro es la zona horaria y el segundo puede tener opciones
    //Por ultimo se le aplica el metodo ".format" al cual se le pasa una nueva fecha(objeto Date) que surja del dateString pasado por parametro

    return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date(dateString))
}