// src/engine/audio.ts (CommonJS)
const createPlayer = require('play-sound');

type PlayCb = (err: Error | null) => void;
type Player = { play: (file: string, optsOrCb?: any, cb?: PlayCb) => void };

export class ControllerAudio {
  private player: Player;

  constructor() {
    // fuerza el binario aquí (Windows: powershell o cmdmp3)
    this.player = createPlayer({ player: 'powershell' as const });
    // alternativas: { player: 'cmdmp3' as const } o { players: ['powershell', 'cmdmp3'] as const }
  }

  public play(file: string): void {
    this.player.play(file, (err: Error | null) => {
      if (err) console.error('Audio error:', err);
      else console.log(`Playing: ${file}`);
    });
  }
}


export class TriggerAudio{
   
}