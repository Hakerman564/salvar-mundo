import chalk from "chalk";
import stripAnsi from 'strip-ansi';
import { ControllerAudio } from "./engine/audio";
import { SceneManager } from "./engine/scenes";
import { Estrategia } from "./logic/Estrategia";
import { OutInMenu } from "./out_in_Menu";
import { time } from "console";
import { promises } from "dns";
export class Gamepro {
 private controller: ControllerPlay;
    constructor() {
        this.controller = new ControllerPlay();
    }

    public async start() : Promise<boolean> {
        this.controller.change();
        console.log("Juego iniciado");
       // this.controller.playSound('../sounds/Rugido.mp3');
        await this.controller.ScreenVideo();
        return true;
    }
}

export class Pantalla {

    constructor() {}

    public screenMenu(options: string[]): void {
        options.forEach((option, index) => {
            console.log(`${index}: ${option}`);
        });
    }

    public refresh(): void {
        console.clear();
    }

    public screenBoard(Title: string = "", hero: string = "", text: string  = ""): void {
        // Divide los contenidos en líneas
        const titleLines = Title ? Title.split('\n') : [];
        const heroLines = hero ? hero.split('\n') : [];
        const textLines = text ? text.split('\n') : [];

        // Calcula el ancho máximo entre todos los contenidos
        const maxContentWidth = Math.max(
            ...titleLines.map(l => l.length),
            ...heroLines.map(l => l.length),
            ...textLines.map(l => l.length),
            30 // ancho mínimo
        );
        const width = maxContentWidth + 4; // 2 para bordes y 2 para margen

        // Calcula el alto total
        const height = titleLines.length + heroLines.length + textLines.length + 6; // 2 líneas de margen por sección

        const horizontal = '─'.repeat(width - 2);
        console.log('┌' + horizontal + ' ');

        // Título
        if (titleLines.length > 0) {
            for (const line of titleLines) {
                const padded = ' ' + line.padEnd(width - 3, ' ') + ' ';
                console.log('│' + padded + ' ');
            }
        } else {
            // Relleno si no hay título
            console.log('│' + ' '.repeat(width - 2) + ' ');
        }
        // Margen entre secciones
        console.log('│' + ' '.repeat(width - 2) + ' ');

        // Hero
        if (heroLines.length > 0) {
            for (const line of heroLines) {
                const padded = ' ' + line.padEnd(width - 3, ' ') + ' ';
                console.log('│' + padded + ' ');
            }
        } else {
            // Relleno si no hay hero
            for (let i = 0; i < 3; i++) {
                console.log('│' + ' '.repeat(width - 2) + ' ');
            }
        }
        // Margen entre secciones
        console.log('│' + ' '.repeat(width - 2) + ' ');

        // Texto
        if (textLines.length > 0) {
            for (const line of textLines) {
                const padded = ' ' + line.padEnd(width - 3, ' ') + ' ';
                console.log('│' + padded + ' ');
            }
        } else {
            // Relleno si no hay texto
            for (let i = 0; i < 2; i++) {
                console.log('│' + ' '.repeat(width - 2) + ' ');
            }
        }

        // Relleno para completar el alto si es necesario
        const usedLines = 1 + // top border
            (titleLines.length > 0 ? titleLines.length : 1) + 1 + // title + margin
            (heroLines.length > 0 ? heroLines.length : 3) + 1 + // hero + margin
            (textLines.length > 0 ? textLines.length : 2);
        for (let i = usedLines; i < height - 1; i++) {
            console.log('│' + ' '.repeat(width - 2) + ' ');
        }

        console.log('└' + horizontal + ' ');
    }

    public linetextcalculate(line: string, width: number    ): string {
        const visibleLength = stripAnsi(line).length;
        const padded = line + ' '.repeat((width - 3) - visibleLength);
        return padded;
    }

    

    
}

export class ControllerPlay {
   private audio: ControllerAudio;
    private scenes: SceneManager;
    private estrategia: Estrategia;
    private pantalla: Pantalla;
    private outinmenu: OutInMenu;

    constructor() {
        this.audio = new ControllerAudio();
        this.scenes = new SceneManager();
        this.estrategia = new Estrategia();
        this.pantalla = new Pantalla();

       
         this.outinmenu = new OutInMenu();
    }

    public controlMenuSelection (index: number, options: string[]): void {
        const response = this.outinmenu.deployMenu(index, options);
        console.log(`Opción seleccionada: ${response.selectedOption}`);
    }

    public playSound(file: string): void {
        this.audio.play(file);
    }

    public async displayMenu(options: string[]): Promise<void> {
        this.pantalla.screenMenu(options);

        let select = await this.outinmenu.menuListenerNumber("Seleccione una opción: ");
    
        this.controlMenuSelection(select, options);
    }

    public displayBoard(): void {
        this.pantalla.screenBoard();
    }

    public change (): void {
        this.scenes.changeAllData();
    }

    public fullscreen(seconds: number): void {
        setTimeout(() => {
            this.pantalla.refresh();
            this.pantalla.screenBoard(emergencyTitle, emergencyHero, emergencyText);
            this.displayMenu(["Iniciar Misión", "Cargar Juego", "Salir"]);
        }, seconds * 1000);
        
    }

    public async ScreenVideo(): Promise<void> {
       let cinematics = this.scenes.getCinemData();
       if (cinematics) {
           for (const element of cinematics) {
               this.pantalla.screenBoard(element.title, element.hero, element.text);
               // Espera 5 segundos antes de mostrar la siguiente escena
               const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
               await wait(5000);

               this.pantalla.refresh();
           }
       } else {
           console.log("No hay cinemáticas disponibles.");
       }
    }
}

const emergencyTitle = chalk.red(`
 ██████████                                                                           ███            ███
▒▒███▒▒▒▒▒█                                                                          ▒▒▒            ▒███
 ▒███  █ ▒  █████████████    ██████  ████████   ███████  ██████  ████████    ██████  ████   ██████  ▒███
 ▒██████   ▒▒███▒▒███▒▒███  ███▒▒███▒▒███▒▒███ ███▒▒███ ███▒▒███▒▒███▒▒███  ███▒▒███▒▒███  ▒▒▒▒▒███ ▒███
 ▒███▒▒█    ▒███ ▒███ ▒███ ▒███████  ▒███ ▒▒▒ ▒███ ▒███▒███████  ▒███ ▒███ ▒███ ▒▒▒  ▒███   ███████ ▒███
 ▒███ ▒   █ ▒███ ▒███ ▒███ ▒███▒▒▒   ▒███     ▒███ ▒███▒███▒▒▒   ▒███ ▒███ ▒███  ███ ▒███  ███▒▒███ ▒▒▒ 
 ██████████ █████▒███ █████▒▒██████  █████    ▒▒███████▒▒██████  ████ █████▒▒██████  █████▒▒████████ ███
▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒ ▒▒▒ ▒▒▒▒▒  ▒▒▒▒▒▒  ▒▒▒▒▒      ▒▒▒▒▒███ ▒▒▒▒▒▒  ▒▒▒▒ ▒▒▒▒▒  ▒▒▒▒▒▒  ▒▒▒▒▒  ▒▒▒▒▒▒▒▒ ▒▒▒ 
                                               ███ ▒███                                                 
                                              ▒▒██████                                                  
                                               ▒▒▒▒▒▒                                                   
`);
const emergencyText = chalk.yellow("La ciudad está en peligro y necesitamos tu ayuda para salvarla. Prepárate para la misión.");

const emergencyHero = chalk.redBright(`
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

`);