// src/types/play-sound.d.ts
declare module 'play-sound' {
  type PlayerName =
    | 'mplayer' | 'afplay' | 'mpg123' | 'mpg321' | 'play'
    | 'omxplayer' | 'aplay' | 'cmdmp3' | 'powershell' | 'cvlc'
    | string; // permitir rutas/otros

  interface PlayerOptions {
    player?: PlayerName;
    players?: PlayerName[];
  }

  // opciones que se pasan a la llamada play(), típicamente flags por reproductor
  interface SpawnPerPlayer {
    [player: string]: any; // p.ej. { powershell: ['-c', '...'] }
  }

  interface Player {
    play(file: string, cb?: (err: Error | null) => void): void;
    play(file: string, opts: Partial<SpawnPerPlayer>, cb?: (err: Error | null) => void): void;
  }

  function createPlayer(options?: PlayerOptions): Player;
  export = createPlayer;
}
