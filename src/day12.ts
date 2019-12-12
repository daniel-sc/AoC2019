import {Point3} from './point';

/*const input = `<x=-1, y=0, z=2>
<x=2, y=-10, z=-7>
<x=4, y=-8, z=8>
<x=3, y=5, z=-1>`;*/
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

console.log('points: ', points);

let current = points;
for (let i = 0; i < 1000; i++) {
    current = performTimeStep(current);
}

console.log('result: ', current);
console.log('total energy: ', current.map(energy).reduce((a, b) => a + b, 0));
