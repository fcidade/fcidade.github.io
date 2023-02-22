export class Vec2 {
  constructor(public x: number, public y: number) {}

  clone(): Vec2 {
    return vec2(this.x, this.y);
  }

  equal(vec: Vec2): boolean {
    return this.x == vec.x && this.y == vec.y;
  }

  add(vec: Vec2): Vec2 {
    return vec2(this.x + vec.x, this.y + vec.y);
  }

  mult(value: number): Vec2 {
    return vec2(this.x * value, this.y * value);
  }

  sub(vec: Vec2): Vec2 {
    return vec2(this.x - vec.x, this.y - vec.y);
  }

  mag(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  dist(other: Vec2): number {
    return this.sub(other).mag();
  }

  angle(): number {
    return Math.atan2(this.y, this.x);
  }

  rotRad(angle: number): Vec2 {
    const newAngle = this.angle() + angle;
    const mag = this.mag();
    return new Vec2(Math.cos(newAngle) * mag, Math.sin(newAngle) * mag);
  }

  setRotRad(angle: number): Vec2 {
    const mag = this.mag();
    return new Vec2(Math.cos(angle) * mag, Math.sin(angle) * mag);
  }

  static zero() {
    return new Vec2(0, 0);
  }

  static right() {
    return new Vec2(1, 0);
  }
}

export const vec2 = (x: number, y: number) => new Vec2(x, y);
