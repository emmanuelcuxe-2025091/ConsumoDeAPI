const API_URL = "https://jsonplaceholder.typicode.com/users";

async function obtenerUsuariosDesdeApi(): Promise<Response> {

    const respuesta = await fetch(API_URL);

    return respuesta;

}