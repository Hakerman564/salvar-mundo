import chalk from "chalk";
import { get } from "http";
export class SceneManager {
   private sceneTarget: number;
   private cinemTarget: number;
   private contenidoInstance: contenido;
    private cinemInstance: Cinematick;

   constructor() {
       this.sceneTarget = 0;
       this.cinemTarget = -3;
       this.contenidoInstance = new contenido();
       this.cinemInstance = new Cinematick();
   }

   public changeAllData(): void {
      this.contenidoInstance.ChangeData();
   }

   public pickScene(): number {
       return this.sceneTarget;
   }

   public pickCinem(): number {
       return this.cinemTarget;
   }

   public getSceneData(id: number): SceneData | undefined {
       const contenidoInstance = new contenido();
       return contenidoInstance['escenas'].find(scene => scene.id === id);
   }

   public getCinemData(): SceneData[] | undefined {
       this.cinemInstance.getEscenas(this.cinemTarget, this.contenidoInstance.escenas)

       return this.cinemInstance.getpool();
   }

} // encargado de desidier la narrativa del juego

type Scene = {
    id: number;
    description: string;
};

export class Cinematick { // encargado de las cinemáticas
    private escenasPool: SceneData[] = [];

    constructor() {
        this.escenasPool = [];
    }

    public getEscenas(select: number, contend: SceneData[]): void {
        this.escenasPool = contend.filter(scene => scene.id === select);
    }

    public getpool(): SceneData[] {
        return this.escenasPool;
    }
}


type SceneData = {
    id: number;
    description: string;
    hero: string;
    title: string;
    text: string;
    mnuOptions: string[];
    isCinematic: boolean;
}

export class contenido { // data fundamenteal de las cinemáticas
    public escenas: SceneData[] = [];

    constructor() {
        this.escenas = [];
    }


    public pushScene(scene: SceneData): void {
        this.escenas.push(scene);
    }

    public createScene(id: number, title: string, description: string, hero: string, text: string, isCinematic: boolean, mnuOptions: string[]): void {
        const newScene: SceneData = {
            id: id,
            description: description,
            hero: hero,
            title: title,
            text: text,
            mnuOptions: mnuOptions,
            isCinematic: isCinematic
        };
        this.pushScene(newScene);
    }
    public ChangeData(): void{
      //
       this.pushScene({id: -3,description: 'intro part 1', 
        hero: chalk.red(`
        ++*#+****#*#*%:..                         ...
        ++===+*#**###*#+...                          
        =+==:==+====*+=+-...                         
        ****%*##*#**++++##%++=.. .....               
        %%#%*##%%*##*###%%@@@%%#####%%*+......       
        %#*#*%%#%##%#%%%@@%@@@@@@%%#######%-......   
        #%%*%%%%%%%@%@%@@%@@@@@@@%@@%*=:+%%%###%#=.. 
        %%%%%@%@@@@@@@@@@%%@@@@@@@%#%%@@@%###%%@@%=. 
        %@@%@@@%@@@@@@@@@%%%%@@@@@@@@@@@%%%@@@@@%%=. 
        @%@@@@@@@@@@@@@@@@%@%%%%%%@@%%%@%##*****#+.. 
        @@@@@@@@@@@@@@@@@@@@@%%##%%#%%#=+*+#=--...   
        @@@@@@@%*@@@@@@@%@@@@%%%%##%##=-++*+*..      
        @@@@+%@#=@@@@@@@%%@@@@@%%%%#%#+==+:+=.       
        #%@%=#@#-%@@@@@@@@%%@@@@%%%%##*==:++..       
        +#@@*+@@#=%@@@@%@@@@%%@@@@%%%%#=##*..        
        #=@@%+=@@@+%@@@@%@@%@@%@@@@%%%%%%##*-..      
        @%+%@@#+%@@%@@%@%%@%%##%@%@@@@@@%%%#+-.      
        %@@##@@%@#%@@%%%+:......:-==*%%@@@@@+..      
        +*@@%%%@**%#-#+..           ..:*--....       
        @@@%@*+%#:..                                 
        @%=*#*#:.                                 ...
        @#*#:..                                      
        %%:..                            ...         
        
        `), 
        title: chalk.yellow(`
   █████████                                                                     
  ███▒▒▒▒▒███                                                                    
 ▒███    ▒███  █████████████    ██████  ████████    ██████    █████████  ██████  
 ▒███████████ ▒▒███▒▒███▒▒███  ███▒▒███▒▒███▒▒███  ▒▒▒▒▒███  ▒█▒▒▒▒███  ▒▒▒▒▒███ 
 ▒███▒▒▒▒▒███  ▒███ ▒███ ▒███ ▒███████  ▒███ ▒███   ███████  ▒   ███▒    ███████ 
 ▒███    ▒███  ▒███ ▒███ ▒███ ▒███▒▒▒   ▒███ ▒███  ███▒▒███    ███▒   █ ███▒▒███ 
 █████   █████ █████▒███ █████▒▒██████  ████ █████▒▒████████  █████████▒▒████████
▒▒▒▒▒   ▒▒▒▒▒ ▒▒▒▒▒ ▒▒▒ ▒▒▒▒▒  ▒▒▒▒▒▒  ▒▒▒▒ ▒▒▒▒▒  ▒▒▒▒▒▒▒▒  ▒▒▒▒▒▒▒▒▒  ▒▒▒▒▒▒▒▒ 
           
          `), 
        text: chalk.green('Del mar se alza “The Killer”. Tres armas la preceden: Aliento atómico, Rayo espiral, Golpe de cola. Ciudades enteras han caído. El tiempo se agota.'), 
        mnuOptions:  [],
        isCinematic: true});


        
        
         this.pushScene({id: -3,description: 'intro part 2', 
        hero: chalk.white(`

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@%==%@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@========@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@+=========@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@#============#@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@::::::............@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@=:::::.............-@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@::::::..............@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@:::::::@@@@@@@@.......@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@:::::@@#----::*@@.....@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@::::@@----:::::-@@....@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@:::-@+----::::::+@-...@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@::::@@----::::::@@....@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@%%*+@@:::::@@=---:::-@@.....@@=+@@@@@@@@@@@@@@@
@@@@@@@@@@@@%++++@@::::::=@@@@@@@@=......@@===#@@@@@@@@@@@@@
@@@@@@@@@@@@+++++@@::::::::..............@@=====@@@@@@@@@@@@
@@@@@@@@@@*++++++@@:::::::::.............@@======+@@@@@@@@@@
@@@@@@@@@++++++++@@::::::::::............@@=======+@@@@@@@@@
@@@@@@@@+++++++++@@@@@@@@@@@@@@@@@@@@@@@@@@========+@@@@@@@@
@@@@@@@#+++++++++@@======================@@=========*@@@@@@@
@@@@@@@++++++++++@@======================@@==========@@@@@@@
@@@@@@%+++++++*%@@@@@@@@@@@@@@@@@@@@@@@@@@@@%*=======%@@@@@@
@@@@@@%+++%@@@@@@@@@@@@#++++++++++++#@@@@@@@@@@@@%===%@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@:::...@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@:::...@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@#::..*@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@#::#@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

        `), 
        title: chalk.greenBright(`
                                                                                        
                                                                                        
  ██████   █████  ████████   ██████  ████████   ██████   ████████    █████████  ██████  
 ███▒▒███ ███▒▒  ▒▒███▒▒███ ███▒▒███▒▒███▒▒███ ▒▒▒▒▒███ ▒▒███▒▒███  ▒█▒▒▒▒███  ▒▒▒▒▒███ 
▒███████ ▒▒█████  ▒███ ▒███▒███████  ▒███ ▒▒▒   ███████  ▒███ ▒███  ▒   ███▒    ███████ 
▒███▒▒▒   ▒▒▒▒███ ▒███ ▒███▒███▒▒▒   ▒███      ███▒▒███  ▒███ ▒███    ███▒   █ ███▒▒███ 
▒▒██████  ██████  ▒███████ ▒▒██████  █████    ▒▒████████ ████ █████  █████████▒▒████████
 ▒▒▒▒▒▒  ▒▒▒▒▒▒   ▒███▒▒▒   ▒▒▒▒▒▒  ▒▒▒▒▒      ▒▒▒▒▒▒▒▒ ▒▒▒▒ ▒▒▒▒▒  ▒▒▒▒▒▒▒▒▒  ▒▒▒▒▒▒▒▒ 
                  ▒███                                                                  
                  █████                                                                 
                 ▒▒▒▒▒                                                                       
          `), 
        text: chalk.green('Queda una nave. Dos propulsores. IA aliada a bordo. Bajo el Protocolo Omega, si los dos motores responden, es posible que no salvemos '), 
        mnuOptions:  [],
        isCinematic: true});


         this.pushScene({id: -3,description: 'intro part 3', 
        hero: chalk.white(` `), 
        title: chalk.greenBright(`
                                                                                        
  █████████   ███            ███  ████          
 ███▒▒▒▒▒███ ▒▒▒            ▒▒▒  ▒▒███          
▒███    ▒▒▒  ████   ███████ ████  ▒███   ██████ 
▒▒█████████ ▒▒███  ███▒▒███▒▒███  ▒███  ███▒▒███
 ▒▒▒▒▒▒▒▒███ ▒███ ▒███ ▒███ ▒███  ▒███ ▒███ ▒███
 ███    ▒███ ▒███ ▒███ ▒███ ▒███  ▒███ ▒███ ▒███
▒▒█████████  █████▒▒███████ █████ █████▒▒██████ 
 ▒▒▒▒▒▒▒▒▒  ▒▒▒▒▒  ▒▒▒▒▒███▒▒▒▒▒ ▒▒▒▒▒  ▒▒▒▒▒▒  
                   ███ ▒███                     
                  ▒▒██████       
          `), 
        text: chalk.green('Queda una nave. Dos propulsores. IA aliada a bordo. Bajo el Protocolo Omega, si los dos motores responden, es posible que no salvemos '), 
        mnuOptions:  [],
        isCinematic: true});

         this.pushScene({id: -3,description: 'intro part 3', 
        hero: chalk.white(`

        `), 
        title: chalk.whiteBright(`
                                                                                        
 ██████████                     ███            ███                     
▒▒███▒▒▒▒███                   ▒▒▒            ▒▒▒                      
 ▒███   ▒▒███  ██████   █████  ████   ██████  ████   ██████  ████████  
 ▒███    ▒███ ███▒▒███ ███▒▒  ▒▒███  ███▒▒███▒▒███  ███▒▒███▒▒███▒▒███ 
 ▒███    ▒███▒███████ ▒▒█████  ▒███ ▒███ ▒▒▒  ▒███ ▒███ ▒███ ▒███ ▒███ 
 ▒███    ███ ▒███▒▒▒   ▒▒▒▒███ ▒███ ▒███  ███ ▒███ ▒███ ▒███ ▒███ ▒███ 
 ██████████  ▒▒██████  ██████  █████▒▒██████  █████▒▒██████  ████ █████
▒▒▒▒▒▒▒▒▒▒    ▒▒▒▒▒▒  ▒▒▒▒▒▒  ▒▒▒▒▒  ▒▒▒▒▒▒  ▒▒▒▒▒  ▒▒▒▒▒▒  ▒▒▒▒ ▒▒▒▒▒ 
                                                                       
                                                                       
                                                                                                                                                                  
          `), 
        text: chalk.green('Toma Las mejores decisiones para salvar a la humanidad.'), 
        mnuOptions:  [],
        isCinematic: true});

    }
  }
