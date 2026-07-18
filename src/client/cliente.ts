import { ApiUsuario } from "../models/apiUsuario";

const API_URL = "https://jsonplaceholder.typicode.com/users";

async function obtenerUsuariosDesdeApi(): Promise<Response> {

    const respuesta = await fetch(API_URL);

    return respuesta;

}

async function procesarRespuesta(respuesta: Response): Promise<ApiUsuario[]> {

    if (!respuesta.ok) {

        throw new Error(`Error HTTP: ${respuesta.status}`);

    }

    const datosCrudos = await respuesta.json();

    if (!Array.isArray(datosCrudos)) {

        throw new Error("La respuesta no tiene el formato esperado (se esperaba un arreglo)");

    }

    const usuarios: ApiUsuario[] = datosCrudos.map((u: any) => ({

        id: u.id,
        nombre: u.name,
        email: u.email,
        ciudad: u.address?.city ?? "N/A",

    }));

    return usuarios;

}