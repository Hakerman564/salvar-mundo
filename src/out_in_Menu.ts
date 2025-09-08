import * as readline from "readline";
import chalk from "chalk";

export class OutInMenu {
    public optionnTarget: number;

   constructor() {
       this.optionnTarget = -1; // Opción no seleccionada inicialmente
   }

   public deployMenu(index: number, options: string[]): MenuResponse {
         if (index < 0 || index >= options.length) {
             console.log(chalk.red("Opción no válida"));
             return { selectedOption: "", index: -1 };
         }
            console.log(chalk.green(`Has seleccionado: ${options[index]}`));
         return { selectedOption: options[index], index: index };
   }

   public async menuListenerNumber(questions: string): Promise<number> {
       const rl = readline.createInterface({
           input: process.stdin,
           output: process.stdout
       });

       return new Promise((resolve) => {
           rl.question(questions, (answer) => {
               const option = parseInt(answer);
               if (!isNaN(option)) {
                   this.optionnTarget = option;
               }
               rl.close();
               resolve(this.optionnTarget);
           });
       });
   }
}


type MenuResponse = {
    selectedOption: string;
    index: number;
}