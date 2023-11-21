import { GameController } from './controller/gameController.js';
import { Primitives } from './rendering/types.js';
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
/*
const img = await Load.image( 'pipeline.jpg' );
const image = game.renderer.create({
      indices: [
            0,1,2,
            0,2,3,
       ],
      vertices: [
            -1,  1, 0,
            -1, -1, 0,
            1, -1, 0,
            1,  1, 0,
      ],
      imageData: {
            image: img,
            textureCoords: [

                  1,  1,
                  0,  1,
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
            ],
            root: 0
      },
      perspective: true
})
*/
const image = game.renderer.create({
    vertices,
    indices,
    staticColor: { r: 1, g: 0, b: 0, a: 1 },
    perspective: true,
    bonesData: {
        bones: 4,
        weights: weights,
        indices: boneIndex,
        root: 0
    },
    primitive: Primitives.lines,
});
let i = 0;
game.renderer.append('img', image).setAttributes('img', {
    translation: { x: 0, y: 0, z: -2 },
});
const f = () => {
    game.renderer.append('img', image).setAttributes('img', {
        scale: 0.05,
        bones: {
            angle: [
                0, (-1) ** i * 30, (-1) ** i * 30, (-1) ** i * 30
            ],
            translate: [
                { x: 0, y: 0, z: 0 },
                { x: 0, y: 4, z: 0 },
                { x: 0, y: 4, z: 0 },
                { x: 0, y: 4, z: 0 },
            ]
        }
    });
    i++;
    game.renderer.draw();
    requestAnimationFrame(f);
};
f();
