export class Code {
   public codigoDespegue: number[] = [];

    constructor(codigo: number) {
        this.codigoDespegue = new Array(codigo).fill(0);
    }

    public generarCodigo(): number[] {
        const nuevoCodigo: number[] = [];
        // Lógica para generar un nuevo código
        return nuevoCodigo;
    }
}