import {Point} from './point';

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
        points.add(new Point(x, y))
    }
}));

function isBlocked(origin: Point, inbetween: Point, destination: Point): boolean {
    return origin.directionTo(inbetween).getDirectionMinimal().equals(origin.directionTo(destination).getDirectionMinimal())
        && origin.directionTo(inbetween).length() < origin.directionTo(destination).length();
}

function getVisiblePoints(origin: Point, allPoints: Point[]) {
    const otherPoints = allPoints.filter(p => p !== origin);
    return otherPoints.filter(dest => !otherPoints.some(p => isBlocked(origin, p, dest)));
}

const pointsList = [...points];

const visibleCounts = pointsList.map(p => getVisiblePoints(p, pointsList).length);
const maxVisible = Math.max(...(visibleCounts));
let maxVisibleIndex = visibleCounts.indexOf(maxVisible);
const maxVisiblePoint = pointsList[maxVisibleIndex];
console.log('max visible = ', maxVisible, maxVisiblePoint);

const pointsByAngle: { [angle: number]: Point[] } = pointsList.reduce((acc, p) => {
    const angleOriginToP = maxVisiblePoint.directionTo(p).getDirectionMinimal().angle();
    acc[angleOriginToP] = [p, ...(acc[angleOriginToP] || [])];
    return acc;
}, {});
for (let pointsList of Object.values(pointsByAngle)) {
    pointsList.sort((a, b) => maxVisiblePoint.directionTo(a).length() < maxVisiblePoint.directionTo(b).length() ? -1 : 1)

}
const erased: Point[] = [];
while (erased.length < points.size - 1) {
    for (let angle of Object.keys(pointsByAngle).sort()) {
        if (pointsByAngle[angle].length) {
            erased.push(pointsByAngle[angle].shift())
        }
    }
}

// console.log('erased: ', erased);
console.log('erased 200: ', erased[199]);

