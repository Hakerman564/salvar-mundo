import { ControllerAudio } from "./engine/audio";
import { SceneManager } from "./engine/scenes";
import { Estrategia } from "./logic/Estrategia";
export class Gamepro {
 private ccontroller: ControllerPlay;
    constructor() {
        this.ccontroller = new ControllerPlay();
    }

    public start() : boolean {
        for (let i = 0; i < 10; i++) {
            console.log("Game running..." + i);
        }
        return true;
    }
}

export class Pantalla {

}

export class ControllerPlay {
   private audio: ControllerAudio;
    private scenes: SceneManager;
    private estrategia: Estrategia;

    constructor() {
        this.audio = new ControllerAudio();
        this.scenes = new SceneManager();
        this.estrategia = new Estrategia();
    }
}