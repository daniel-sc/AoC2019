import {lcm, Point3} from './point';

/*const input = `<x=-8, y=-10, z=0>
<x=5, y=5, z=10>
<x=2, y=-7, z=3>
<x=9, y=-8, z=-3>`;*/

const input = `<x=-13, y=-13, z=-13>
<x=5, y=-8, z=3>
<x=-6, y=-10, z=-3>
<x=0, y=5, z=-5>`;

interface PointAndVel {
    p: Point3;
    v: Point3;
}

const points = input.split(/\n/).map(line => {
    const result = /<x=(-?\d+), y=(-?\d+), z=(-?\d+)>/.exec(line);
    return {p: new Point3(parseInt(result[1]), parseInt(result[2]), parseInt(result[3])), v: new Point3(0, 0, 0)}
});


function countStepsUntilRepeat(points: number[], velocities: number[]): number {
    const original = points.join(',') + velocities.join(',');
    let count = 0;
    do {
        velocities = velocities.map((v, iv) => v + points.map((p, ip) => ip !== iv ? Math.sign(p - points[iv]) : 0).reduce((a, b) => a + b, 0));
        points = points.map((p, i) => p + velocities[i]);
        count++;
    } while (points.join(',') + velocities.join(',') !== original);
    return count;
}

function performTimeStep(points: PointAndVel[]): PointAndVel[] {
    return points.map(pv => {
        let v = pv.v;
        points.forEach(otherPv => v = new Point3(
            v.x + Math.sign(otherPv.p.x - pv.p.x),
            v.y + Math.sign(otherPv.p.y - pv.p.y),
            v.z + Math.sign(otherPv.p.z - pv.p.z))
        );
        // update velocities
        return {...pv, v: v};
    }).map(pv => ({...pv, p: pv.p.add(pv.v)})); // apply velocity
}

function energy(pv: PointAndVel) {
    return pv.p.length() * pv.v.length();
}

let repeatX = countStepsUntilRepeat(points.map(p => p.p.x), points.map(p => p.v.x));
let repeatY = countStepsUntilRepeat(points.map(p => p.p.y), points.map(p => p.v.y));
let repeatZ = countStepsUntilRepeat(points.map(p => p.p.z), points.map(p => p.v.z));
console.log('repeat x after: ', repeatX);
console.log('repeat y after: ', repeatY);
console.log('repeat z after: ', repeatZ);

const repeat = lcm(lcm(repeatX, repeatY), repeatZ);
console.log('reapeat total: ', repeat);

/*console.log('points: ', points);

let current = points;
for (let i = 0; i < 1000; i++) {
    current = performTimeStep(current);
}

console.log('result: ', current);
console.log('total energy: ', current.map(energy).reduce((a, b) => a + b, 0));*/
