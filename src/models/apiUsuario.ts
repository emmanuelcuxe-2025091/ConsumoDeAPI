export interface ApiUsuario {
    id: number;
    nombre: string;
    email: string;
    ciudad: string;
}

export interface ErrorInfo {
    tipo: string;
    mensaje: string;
    fecha: string;
}

export interface ResultadoConsumoApi {
    exito: boolean;
    datos?: ApiUsuario[];
    tiempos?: Record<string, number>;
    error?: ErrorInfo;
}