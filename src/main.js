import { FlyScene, game, FlySprite2D, Load, bug, Shapes } from './Fly/fly.js';
const color = [
    1.0, 0.0, 0.0, 1.0,
    1.0, 1.0, 0.0, 1.0,
    1.0, 0.0, 1.0, 1.0,
    1.0, 0.0, 0.0, 1.0,
    1.0, 0.0, 0.0, 1.0,
    1.0, 0.1, 0.0, 1.0,
    1.0, 0.0, 0.5, 1.0,
    1.0, 0.0, 0.0, 1.0,
    1.0, 1.0, 0.0, 1.0,
    0.0, 1.0, 0.0, 1.0,
    0.0, 1.1, 0.0, 1.0,
    0.0, 1.0, 1.0, 1.0,
    0.0, 0.0, 1.0, 1.0,
    0.0, 1.0, 1.0, 1.0,
    1.0, 1.0, 1.0, 1.0,
    0.0, 0.0, 1.0, 1.0,
    1.0, 1.0, 0.0, 1.0,
    1.0, 1.0, 0.5, 1.0,
    1.0, 1.0, 1, 1.0,
    1.0, 1.0, 0.0, 1.0,
    1.0, 0.0, 1.0, 1.0,
    1.0, 1.0, 1.0, 1.0,
    1.0, 0.4, 1.0, 1.0,
    0.0, 0.3, 1.0, 1.0,
];
const vertices = [
    0, 1, 0,
    0, -1, 0,
    2, 1, 0,
    2, -1, 0,
    4, 1, 0,
    4, -1, 0,
    6, 1, 0,
    6, -1, 0,
    8, 1, 0,
    8, -1, 0, // 9
];
const boneIndex = [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 1, 0, 0,
    0, 1, 0, 0,
    1, 0, 0, 0,
    1, 0, 0, 0,
    1, 2, 0, 0,
    1, 2, 0, 0,
    2, 0, 0, 0,
    2, 0, 0, 0, // 9
];
const weights = [
    1, 0, 0, 0,
    1, 0, 0, 0,
    .5, .5, 0, 0,
    .5, .5, 0, 0,
    1, 0, 0, 0,
    1, 0, 0, 0,
    .5, .5, 0, 0,
    .5, .5, 0, 0,
    1, 0, 0, 0,
    1, 0, 0, 0, // 9
];
const indices = [
    0, 1,
    0, 2,
    1, 3,
    2, 3,
    2, 4,
    3, 5,
    4, 5,
    4, 6,
    5, 7,
    6, 7,
    6, 8,
    7, 9,
    8, 9,
];
game.assets.images.img = await Load.image('./otherStuff/prova.png');
class mySprite extends FlySprite2D {
    constructor(isNPC = false) {
        super({
            image: game.assets.images.img,
            frames: 4,
            costumes: 4,
            scale: 2
        });
        this.isNPC = isNPC;
        this.walk = {};
        this.walk.down = this.createAnimation([{
                from: 0,
                to: 4,
                costume: 0,
                deltaTime: 60,
                callback: () => this.y -= 0.05
            }]);
        this.walk.up = this.createAnimation([{
                from: 0,
                to: 4,
                costume: 3,
                deltaTime: 60,
                callback: () => this.y += 0.05
            }]);
        this.walk.left = this.createAnimation([{
                from: 0,
                to: 4,
                costume: 1,
                deltaTime: 60,
                callback: () => this.x -= 0.05
            }]);
        this.walk.right = this.createAnimation([{
                from: 0,
                to: 4,
                costume: 2,
                deltaTime: 60,
                callback: () => this.x += 0.05
            }]);
        if (isNPC) {
            this.walk.path = this.createAnimation([{
                    from: 0,
                    to: 4,
                    costume: 2,
                    deltaTime: 60,
                    callback: () => this.x += 0.05
                }, {
                    from: 0,
                    to: 4,
                    costume: 1,
                    deltaTime: 60,
                    callback: () => this.x -= 0.05
                }]);
        }
    }
    onDraw() {
        if (this.isNPC)
            this.walk.path();
    }
    onDismiss() {
        throw new Error('Method not implemented.');
    }
    onEnter() {
        bug();
        this.costume = 3;
    }
}
class FirstScene extends FlyScene {
    update() {
        this.$renderer.draw();
    }
    onCreate(game) {
        this.$game.refs.i = 0;
        //setup debug camera
        this.$debug.globalCamera();
        const sprite = new mySprite();
        const sprite2 = new mySprite(true);
        sprite2.x = 0;
        sprite2.z = -2.5;
        sprite.z = -3;
        sprite.costume = 0;
        sprite2.costume = 3;
        const bg = this.$renderer.create(Object.assign(Object.assign({}, Shapes.rectangle(100, 100, { x: 0, y: 0, z: -10 })), { staticColor: { r: 0.4, g: 0.8, b: 0.5, a: 1 }, perspective: true }));
        this.attach('bg', bg);
        this.attach(sprite2);
        this.attach(sprite);
        this.$events.onArrowLeftPressed(() => {
            sprite.walk.left();
        });
        this.$events.onArrowRightPressed(() => {
            sprite.walk.right();
        });
        this.$events.onArrowUpPressed(() => {
            sprite.walk.up();
        });
        this.$events.onArrowDownPressed(() => {
            sprite.walk.down();
        });
        this.$events.onKeyRelease(() => {
            sprite.frame = 0;
        });
    }
    onDestroyed(game) { }
}
// finally, use the scene
game.useScene(FirstScene);
