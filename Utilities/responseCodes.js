export const resCodes = {
    Ok: 200, //Este código de respuesta indica que la solicitud se ha realizado correctamente.
    Created: 201, //Esto indica que la solicitud tuvo éxito y se creó un recurso. 
                  //Se utiliza para confirmar el éxito de una solicitud PUT o POST.
    BadRequest: 400, //La solicitud fue malformada. Esto sucede especialmente con las solicitudes POST y PUT, 
                     //cuando los datos no pasan la validación o están en el formato incorrecto.
    Unauthorized: 401, //Este error indica que debe realizar la autenticación antes de acceder al recurso.
    Forbidden: 403, //Es un código de estado HTTP que indica que el servidor deniega la acción solicitada, 
                    //página web o servicio. En otras palabras, el servidor ha podido ser contactado, y ha 
                    //recibido una petición válida, pero ha denegado el acceso a la acción que se solicita.
    NotFound: 404, //Esta respuesta indica que no se pudo encontrar el recurso necesario. 
                   //Esto generalmente se devuelve a todas las solicitudes que apuntan a una URL sin recurso 
                   //correspondiente.
    MethodNotAllowed: 405, //El método HTTP utilizado no es compatible con el de este recurso.
    Conflict: 409, //Esto indica un conflicto. Por ejemplo, está utilizando una solicitud PUT para crear 
                   //el mismo recurso dos veces.
    InternalServerError: 500 //Cuando todo lo demás falla; En general, se utiliza una respuesta 500 
                            //cuando el procesamiento falla debido a circunstancias imprevistas en el lado del 
                            //servidor, lo que provoca el error del servidor.
}