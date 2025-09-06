import { Godzilla } from "./godzilla";
import { Nave } from "./nave";
import { Mapa } from "./mapa";
import { Code } from "./code";

export class Estrategia {
    private godzilla: Godzilla;
    private nave: Nave;
    private mapa: Mapa;
    private code: Code;

    constructor() {
        this.godzilla = new Godzilla();
        this.nave = new Nave();
        this.mapa = new Mapa();
        this.code = new Code(10);
    }
}
