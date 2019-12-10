import {Point} from './day3';

const intput =
    '##.##..#.####...#.#.####\n' +
    '##.###..##.#######..##..\n' +
    '..######.###.#.##.######\n' +
    '.#######.####.##.#.###.#\n' +
    '..#...##.#.....#####..##\n' +
    '#..###.#...#..###.#..#..\n' +
    '###..#.##.####.#..##..##\n' +
    '.##.##....###.#..#....#.\n' +
    '########..#####..#######\n' +
    '##..#..##.#..##.#.#.#..#\n' +
    '##.#.##.######.#####....\n' +
    '###.##...#.##...#.######\n' +
    '###...##.####..##..#####\n' +
    '##.#...#.#.....######.##\n' +
    '.#...####..####.##...##.\n' +
    '#.#########..###..#.####\n' +
    '#.##..###.#.######.#####\n' +
    '##..##.##...####.#...##.\n' +
    '###...###.##.####.#.##..\n' +
    '####.#.....###..#.####.#\n' +
    '##.####..##.#.##..##.#.#\n' +
    '#####..#...####..##..#.#\n' +
    '.##.##.##...###.##...###\n' +
    '..###.########.#.###..#.';

const points = new Set<Point>();
intput.split('\n').forEach((l, y) => l.split('').forEach((p, x) => {
    if (p === '#') {
        points.add(new Point(y, x))
    }
}));


function gcd(a, b) {
    if (!b) {
        return a;
    }

    return gcd(b, a % b);
}

function getDirectionMinimal(from: Point, to: Point): Point {
    const direction = to.substract(from);
    const commonFactor = gcd(direction.x, direction.y);
    return new Point(direction.x / Math.abs(commonFactor), direction.y / Math.abs(commonFactor));
}

function getDirection(from: Point, to: Point): Point {
    const direction = to.substract(from);
    return new Point(direction.x, direction.y);
}

function isBlocked(origin: Point, inbetween: Point, destination: Point): boolean {
    return getDirectionMinimal(origin, inbetween).equals(getDirectionMinimal(origin, destination))
        && getDirection(origin, inbetween).length() < getDirection(origin, destination).length();
}

function getVisiblePoints(origin: Point, allPoints: Point[]) {
    const otherPoints = allPoints.filter(p => p !== origin);
    return otherPoints.filter(dest => !otherPoints.some(p => isBlocked(origin, p, dest)));
}

const pointsList = [...points];

// console.log('points: ', pointsList);
// console.log('point: ', pointsList[5]);
// console.log('direction: ', getDirection(pointsList[1], pointsList[1]));
// console.log('visible from 0,1: ', getVisiblePoints(pointsList[5], pointsList).length, getVisiblePoints(pointsList[5], pointsList));
const visibleCounts = pointsList.map(p => getVisiblePoints(p, pointsList).length);
const maxVisible = Math.max(...(visibleCounts));
let maxVisibleIndex = visibleCounts.indexOf(maxVisible);
const maxVisiblePoint = pointsList[maxVisibleIndex];
console.log('max visible = ', maxVisible, maxVisibleIndex, maxVisiblePoint);

// console.log('counts: ', pointsList.map(p => getVisiblePoints(p, pointsList).length));

