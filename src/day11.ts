import {ProgramState, run} from './intcode';
import {Point} from './point';


console.debug = () => null;

const p: ProgramState = {
    state: [3, 8, 1005, 8, 291, 1106, 0, 11, 0, 0, 0, 104, 1, 104, 0, 3, 8, 1002, 8, -1, 10, 101, 1, 10, 10, 4, 10, 108, 0, 8, 10, 4, 10, 1002, 8, 1, 28, 1, 1003, 20, 10, 2, 1103, 19, 10, 3, 8, 1002, 8, -1, 10, 1001, 10, 1, 10, 4, 10, 1008, 8, 0, 10, 4, 10, 1001, 8, 0, 59, 1, 1004, 3, 10, 3, 8, 102, -1, 8, 10, 1001, 10, 1, 10, 4, 10, 108, 0, 8, 10, 4, 10, 1001, 8, 0, 84, 1006, 0, 3, 1, 1102, 12, 10, 3, 8, 1002, 8, -1, 10, 101, 1, 10, 10, 4, 10, 1008, 8, 1, 10, 4, 10, 101, 0, 8, 114, 3, 8, 1002, 8, -1, 10, 101, 1, 10, 10, 4, 10, 108, 1, 8, 10, 4, 10, 101, 0, 8, 135, 3, 8, 1002, 8, -1, 10, 1001, 10, 1, 10, 4, 10, 1008, 8, 0, 10, 4, 10, 102, 1, 8, 158, 2, 9, 9, 10, 2, 2, 10, 10, 3, 8, 1002, 8, -1, 10, 1001, 10, 1, 10, 4, 10, 1008, 8, 1, 10, 4, 10, 101, 0, 8, 188, 1006, 0, 56, 3, 8, 1002, 8, -1, 10, 1001, 10, 1, 10, 4, 10, 108, 1, 8, 10, 4, 10, 1001, 8, 0, 212, 1006, 0, 76, 2, 1005, 8, 10, 3, 8, 102, -1, 8, 10, 1001, 10, 1, 10, 4, 10, 108, 1, 8, 10, 4, 10, 1001, 8, 0, 241, 3, 8, 102, -1, 8, 10, 101, 1, 10, 10, 4, 10, 1008, 8, 0, 10, 4, 10, 1002, 8, 1, 264, 1006, 0, 95, 1, 1001, 12, 10, 101, 1, 9, 9, 1007, 9, 933, 10, 1005, 10, 15, 99, 109, 613, 104, 0, 104, 1, 21102, 838484206484, 1, 1, 21102, 1, 308, 0, 1106, 0, 412, 21102, 1, 937267929116, 1, 21101, 0, 319, 0, 1105, 1, 412, 3, 10, 104, 0, 104, 1, 3, 10, 104, 0, 104, 0, 3, 10, 104, 0, 104, 1, 3, 10, 104, 0, 104, 1, 3, 10, 104, 0, 104, 0, 3, 10, 104, 0, 104, 1, 21102, 206312598619, 1, 1, 21102, 366, 1, 0, 1105, 1, 412, 21101, 179410332867, 0, 1, 21102, 377, 1, 0, 1105, 1, 412, 3, 10, 104, 0, 104, 0, 3, 10, 104, 0, 104, 0, 21101, 0, 709580595968, 1, 21102, 1, 400, 0, 1106, 0, 412, 21102, 868389384552, 1, 1, 21101, 411, 0, 0, 1106, 0, 412, 99, 109, 2, 21202, -1, 1, 1, 21102, 1, 40, 2, 21102, 1, 443, 3, 21101, 0, 433, 0, 1106, 0, 476, 109, -2, 2105, 1, 0, 0, 1, 0, 0, 1, 109, 2, 3, 10, 204, -1, 1001, 438, 439, 454, 4, 0, 1001, 438, 1, 438, 108, 4, 438, 10, 1006, 10, 470, 1102, 0, 1, 438, 109, -2, 2106, 0, 0, 0, 109, 4, 1202, -1, 1, 475, 1207, -3, 0, 10, 1006, 10, 493, 21102, 0, 1, -3, 21202, -3, 1, 1, 21201, -2, 0, 2, 21101, 0, 1, 3, 21102, 1, 512, 0, 1106, 0, 517, 109, -4, 2105, 1, 0, 109, 5, 1207, -3, 1, 10, 1006, 10, 540, 2207, -4, -2, 10, 1006, 10, 540, 22101, 0, -4, -4, 1106, 0, 608, 21201, -4, 0, 1, 21201, -3, -1, 2, 21202, -2, 2, 3, 21101, 0, 559, 0, 1106, 0, 517, 21201, 1, 0, -4, 21102, 1, 1, -1, 2207, -4, -2, 10, 1006, 10, 578, 21101, 0, 0, -1, 22202, -2, -1, -2, 2107, 0, -3, 10, 1006, 10, 600, 21201, -1, 0, 1, 21102, 600, 1, 0, 106, 0, 475, 21202, -2, -1, -2, 22201, -4, -2, -4, 109, -5, 2106, 0, 0],
    nextPosition: 0,
    output: [],
    relativeBase: 0,
    remainingInputs: [],
    exit: false
};
const paintedTiles = new Map<string, number>();
paintedTiles.set(new Point(0, 0).toString(), 1);
let tilePosition = new Point(0, 0);
let direction = new Point(0, -1); // up
let currentState = p;


do {
    currentState = run({...currentState, remainingInputs: [paintedTiles.get(tilePosition.toString()) || 0]});
    if (currentState.output.length > 0) {
        paintedTiles.set(tilePosition.toString(), currentState.output[0]);
        if (currentState.output[1] === 0) {//turn left
            direction = direction.rotateLeft();
        } else if (currentState.output[1] === 1) {
            direction = direction.rotateRight();
        } else {
            console.warn('unexpected direction: ', currentState.output);
        }
        tilePosition = tilePosition.add(direction);
    }
} while (!currentState.exit);

console.log('total painted: ', paintedTiles.size);

const paintedPoints: Point[] = [...paintedTiles.keys()].map(p => Point.fromString(p));
const minX = Math.min(...paintedPoints.map(p => p.x));
const minY = Math.min(...paintedPoints.map(p => p.y));
const maxX = Math.max(...paintedPoints.map(p => p.x));
const maxY = Math.max(...paintedPoints.map(p => p.y));

const area = Array.from({length: maxX - minX}).map(() => Array.from({length: maxY - minY}).map(() => '.'));


paintedPoints.forEach(p => area[minY + p.y][minX + p.x] = paintedTiles.get(p.toString()) === 1 ? '#' : '.');

console.log('painted: \n', area.map(l => l.join('')));

