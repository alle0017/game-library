import { Camera } from './rendering/camera.js';
import { Sprite2D } from './entities/sprite2d.js';
import { Game } from './controller/game.js';
async function main() {
    const camera = new Camera();
    const map = new Map();
    const game = Game.getInstance();
    map.set('ArrowUp', () => camera.y += 0.1);
    map.set('ArrowDown', () => camera.y -= 1);
    map.set('ArrowLeft', () => camera.x -= 1);
    map.set('ArrowRight', () => camera.x += 1);
    window.addEventListener('keydown', (e) => {
        if (map.has(e.code))
            map.get(e.code)();
    });
    const sprite = new Sprite2D(game, {
        img: 'prova.png',
        camera: camera,
        position: { x: 0, y: 0, z: -10 },
        frames: 4,
        costumes: 4,
    });
    function anim() {
        sprite.animate();
    }
    game.functions.push(anim);
    game.loop();
}
main();
