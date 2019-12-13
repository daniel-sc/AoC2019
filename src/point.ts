export class Point {
    constructor(public readonly x: number, public readonly y: number) {
    }

    add(p: Point): Point {
        return new Point(this.x + p.x, this.y + p.y);
    }

    directionTo(to: Point): Point {
        return to.substract(this);
    }

    toString() {
        return `${this.x},${this.y}`;
    }

    static fromString(p: string) {
        const coordinates = p.split(',');
        return new Point(parseInt(coordinates[0]), parseInt(coordinates[1]));
    }

    length() {
        return Math.abs(this.x) + Math.abs(this.y);
    }

    substract(p: Point) {
        return new Point(this.x - p.x, this.y - p.y);
    }

    equals(p: Point) {
        return p.x === this.x && p.y === this.y;
    }

    /** 0 for pointing up */
    angle() {
        return Math.PI - Math.atan2(this.x, this.y);
    }

    getDirectionMinimal(): Point {
        const commonFactor = gcd(this.x, this.y);
        return new Point(this.x / Math.abs(commonFactor), this.y / Math.abs(commonFactor));
    }

    rotateRight() {
        return new Point(-this.y, this.x,);
    }

    rotateLeft() {

        return new Point(this.y, -this.x,);
    }
}

export class Point3 {
    constructor(public readonly x: number, public readonly y: number, public readonly z: number) {
    }

    add(p: Point3): Point3 {
        return new Point3(this.x + p.x, this.y + p.y, this.z + p.z);
    }

    directionTo(to: Point3): Point3 {
        return to.substract(this);
    }

    toString() {
        return `${this.x},${this.y},${this.z}`;
    }

    static fromString(p: string) {
        const coordinates = p.split(',');
        return new Point3(parseInt(coordinates[0]), parseInt(coordinates[1]), parseInt(coordinates[2]));
    }

    length() {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
    }

    substract(p: Point3) {
        return new Point3(this.x - p.x, this.y - p.y, this.z - p.z);
    }

    equals(p: Point3) {
        return p.x === this.x && p.y === this.y && p.z === this.z;
    }
}

function gcd(a, b) {
    if (!b) {
        return a;
    }

    return gcd(b, a % b);
}

export function lcm(a, b) {
    return (a * b) / gcd(a, b);
}
