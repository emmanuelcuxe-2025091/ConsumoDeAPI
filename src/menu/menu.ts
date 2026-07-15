import { rl } from "../utils/readline";
import { UsuarioService } from "../services/usuarioService";
import { Rol } from "../models/rol";
import { Estado } from "../models/estado";

const service=new UsuarioService();

export async function menu(){

    let opcion=0;

    do{

        console.log("\n===== CRUD USUARIOS =====");
        console.log("1. Agregar");
        console.log("2. Listar");
        console.log("3. Buscar");
        console.log("4. Actualizar");
        console.log("5. Eliminar");
        console.log("6. Salir");

        opcion=Number(await rl.question("Opción: "));

        switch(opcion){

            case 1:

                const id=Number(await rl.question("ID: "));
                const nombre=await rl.question("Nombre: ");
                const correo=await rl.question("Correo: ");

                const rolTexto=await rl.question("Rol (ADMIN/USUARIO): ");

                const estadoTexto=await rl.question("Estado (ACTIVO/INACTIVO): ");

                await service.agregar({

                    id,
                    nombre,
                    edad: 0,
                    rol:rolTexto.toUpperCase() as Rol,
                    estado:estadoTexto.toUpperCase() as Estado

                });

            break;

            case 2:

                console.table(await service.listar());

            break;

            case 3:

                const buscar=Number(await rl.question("ID: "));

                console.log(await service.buscar(buscar));

            break;

            case 4:

                const idActualizar=Number(await rl.question("ID: "));
                const nombreNuevo=await rl.question("Nombre: ");
                const correoNuevo=await rl.question("Correo: ");

                const rolNuevo=await rl.question("Rol: ");
                const estadoNuevo=await rl.question("Estado: ");

                const actualizado=await service.actualizar({

                    id:idActualizar,
                    nombre:nombreNuevo,
                    edad:Number(await rl.question("Edad: ")),
                    rol:rolNuevo.toUpperCase() as Rol,
                    estado:estadoNuevo.toUpperCase() as Estado

                });

                console.log(actualizado?"Actualizado":"No existe");

            break;

            case 5:

                const eliminar=Number(await rl.question("ID: "));

                const eliminado=await service.eliminar(eliminar);

                console.log(eliminado?"Eliminado":"No encontrado");

            break;

        }

    }while(opcion!=6);

    rl.close();

}