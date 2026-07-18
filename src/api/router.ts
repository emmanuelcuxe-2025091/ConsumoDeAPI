import { IncomingMessage, ServerResponse } from "http";
import { json } from "stream/consumers";
import { UsuarioService } from "../services/usuarioService";
import { Usuario } from "../models/usuario";
import { consumirApiExterna } from "../client/cliente";

const usuarioService = new UsuarioService();

export async function router(req: IncomingMessage, res: ServerResponse) {

    res.setHeader("Content-Type", "application/json");

    const url = req.url ?? "";
    const method = req.method ?? "";

    try {

        if (method === "GET" && url === "/usuarios") {

            const usuarios = await usuarioService.listar();
            
            res.writeHead(200);

            res.end(JSON.stringify(usuarios));

            return; 

        }

        if (method === "GET" && url === "/api-externa") {

            const resultado = await consumirApiExterna();

            res.writeHead(resultado.exito ? 200 : 500);

            res.end(JSON.stringify(resultado));

            return;

        }

        if (method === "POST" && url === "/usuarios") {

            const usuario = await json(req) as Usuario;

            await usuarioService.agregar(usuario);

            res.writeHead(200);

            res.end();

            return;

        }

        if (method === "GET" && url.startsWith("/usuarios/")) {

            const id = parseInt(url.split("/").pop() ?? "");

            const usuario = await usuarioService.buscar(id);

            if (usuario) {

                res.writeHead(200);

                res.end(JSON.stringify(usuario));

                return;

            }

            res.writeHead(404);

            res.end();

            return;

        }

        if (method === "PUT" && url.startsWith("/usuarios/")) {

            const id = parseInt(url.split("/").pop() ?? "");

            const usuario = await json(req) as Usuario;
            usuario.id = id;

            const actualizado = await usuarioService.actualizar(usuario);

            if (actualizado) {

                res.writeHead(200);

                res.end();

                return;

            }

            res.writeHead(404);

            res.end();

            return;

        }

        if (method === "DELETE" && url.startsWith("/usuarios/")) {

            const id = parseInt(url.split("/").pop() ?? "");

            const eliminado = await usuarioService.eliminar(id);

            if (eliminado) {

                res.writeHead(200);

                res.end();

                return;

            }

            res.writeHead(404);

            res.end();

            return;

        }

    } catch (error) {

        res.writeHead(500);

        res.end();

        return;

    }

}