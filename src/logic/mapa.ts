import { PuntoCord } from "./PuntoCord";
export class Mapa {
    public metros: number = 100; // Escala a metros
    escalaXMax: number = 100000; // Escala en el eje X
    escalaYMax: number = 100000;

    constructor() {
        // Inicializar el mapa
    }

    public calcularDistancia(p1: PuntoCord, p2: PuntoCord): number {
        return 0;
    }
}
