import { WebGLRenderer } from '../rendering/GLRenderer2.js';
import { Debug } from './debug.js';
export class GameController {
    constructor() {
        this.cvs = document.createElement('canvas');
        if (!this.cvs)
            throw 'canvas cannot be created';
        this.cvs.width = 800;
        this.cvs.height = 600;
        document.body.appendChild(this.cvs);
        /*this.renderer = new WebGPURenderer( this.cvs );
        else
              */
        this.renderer = new WebGLRenderer(this.cvs);
        this.debug = new Debug(this);
    }
    static async get() {
        if (!GameController.game) {
            GameController.game = new GameController();
            await GameController.game.renderer.init();
        }
        return GameController.game;
    }
    start() {
        const worker = new Worker('./gameController.js');
    }
}
