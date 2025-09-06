import { Gamepro } from "./game";

export class index {
    game: Gamepro;
   
    constructor() {
        this.game = new Gamepro();
    }

    public main(): void {
       while (true)
       {
           if (this.game.start()) {
               break;
           }
       }
    }
}