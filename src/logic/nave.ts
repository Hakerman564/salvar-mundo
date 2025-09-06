import { PuntoCord } from "./PuntoCord";
export class Nave {
    private propulsorizquierdo: Propulsor;
    private propulsorderecho: Propulsor;
    public escudo: boolean;
    private salud: number;
    public posicion: [init: PuntoCord, fin: PuntoCord] = [{ x: 0, y: 0 }, { x: 0, y: 0 }];

    constructor() {
        this.propulsorizquierdo = {
            lado: ladopropulsor.izquierdo,
            salud: 100,
            PotenciaHidropulso: 50,
            potenciaBase: 100,
            esFuncional: true
        };
        this.propulsorderecho = {
            lado: ladopropulsor.derecho,
            salud: 100,
            PotenciaHidropulso: 50,
            potenciaBase: 100,
            esFuncional: true
        };
        this.escudo = false;
        this.salud = 100;
    }

    public evaluarDespege(): Boolean {
        return true;
    }

    public evaluarMotor(motor: Propulsor): Boolean {
        return true;
    }

    public modoSigilo(distancia: number): void {
        console.log(`Modo sigilo activado a una distancia de ${distancia} metros`);
    }

    public recepcionImpacto(puntoImpacto: number): void {
        console.log(`Recepción de impacto en el punto: ${puntoImpacto}`);
        this.salud -= puntoImpacto;
    }

    public despegue(): void {
        console.log("Despegue iniciado");
    }
}

 type Propulsor = {
    lado: ladopropulsor;
    salud: number;
    PotenciaHidropulso: number;
    potenciaBase: number;
    esFuncional: boolean;
}

enum ladopropulsor {
    izquierdo,
    derecho
}