import { PuntoCord } from "./PuntoCord";
export class Godzilla {
    public posicion: [init: PuntoCord, fin: PuntoCord] = [{ x: 0, y: 0 }, { x: 0, y: 0 }];
    private atacqueTarget: Ataque;
    private superCharge: boolean;
    private alientoAtomicoDanger: number;
    private rayoEspiralDanger: number;
    private golpeColaDanger: number;

    constructor() {
        this.atacqueTarget = Ataque.alientoAtomico;
        this.superCharge = false;
        this.alientoAtomicoDanger = 50; // data de escritura
        this.rayoEspiralDanger = 30; // data de escritura
        this.golpeColaDanger = 20; // data de escritura
    }
}

enum Ataque{
    alientoAtomico,
    rayoEspiral,
    golpeCola
}


