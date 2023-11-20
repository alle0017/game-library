import { Load } from './controller/loadData.js';
import { GameController } from './controller/gameController.js';
const game = await GameController.get();
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
const texture = [
    // Front face
    1, 1,
    0, 1,
    0, 0,
    1, 0,
    1, 1,
    0, 1,
    0, 0,
    1, 0,
    1, 1,
    0, 1,
    0, 0,
    1, 0,
    1, 1,
    0, 1,
    0, 0,
    1, 0,
    1, 1,
    0, 1,
    0, 0,
    1, 0,
    1, 1,
    0, 1,
    0, 0,
    1, 0,
    1, 1,
    0, 1,
    0, 0,
    1, 0,
];
const img = await Load.image('pipeline.jpg');
const image = game.renderer.create({
    indices: [
        0, 1, 2,
        0, 2, 3,
    ],
    vertices: [
        -1, 1, 0,
        -1, -1, 0,
        1, -1, 0,
        1, 1, 0,
    ],
    imageData: {
        image: img,
        textureCoords: [
            1, 1,
            0, 1,
            0, 0,
            1, 0,
        ]
    },
    bonesData: {
        bones: 3,
        weights: [
            0, 0.2, 0.3, 0.1,
            0.1, 0.4, 0.3, 0.1,
            1, 0.2, 0.8, 0.1,
        ],
        indices: [
            0, 1, 2, 2,
            1, 0, 2, 2,
            0, 1, 1, 1,
        ]
    },
    perspective: true
});
game.renderer.append('img', image).setAttributes('img', {
    translation: { x: 0, y: 0, z: -5 },
    scale: 0.5,
    bones: [
        [
            0.2, 0.7, 0.1, 0.3,
            0.2, 0.4, 0.3, 0.5,
            0.1, 0.8, 0.2, 0.6,
            0.2, 0.1, 0.1, 0.3,
        ],
        [
            0.2, 0.7, 0.1, 0.3,
            0.2, 0.4, 0.3, 0.5,
            0.1, 0.8, 0.2, 0.6,
            0.2, 0.1, 0.1, 0.3,
        ],
        [
            0.2, 0.7, 0.1, 0.3,
            0.2, 0.4, 0.3, 0.5,
            0.1, 0.8, 0.2, 0.6,
            0.2, 0.1, 0.1, 0.3,
        ],
    ]
});
game.debug.drawXYGrid();
game.debug.drawYZGrid({ r: 0, g: 1, b: 0, a: 1 });
game.debug.drawXZGrid({ r: 0, g: 0, b: 1, a: 1 });
game.debug.globalCamera();
const f = () => {
    game.renderer.draw();
    requestAnimationFrame(f);
};
f();
