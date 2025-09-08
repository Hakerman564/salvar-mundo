import { Gamepro } from "./game";

export class index {
    game: Gamepro;
   
    constructor() {
        this.game = new Gamepro();
    }

    public async main(): Promise<void> {
       while (true)
       {
           if (await this.game.start()) {
               break;
           }
       }
    }
}

(async () => {
    await new index().main();
})();